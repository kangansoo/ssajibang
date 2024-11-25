<script setup>
import { ref, watch } from "vue";
import ResultMenu from "@/components/ResultMenu.vue";
import SearchFilter from "@/components/SearchFilter.vue";
import KakaoMap from "@/components/common/KakaoMap.vue";
import DetailView from "@/components/realestate/DetailView.vue";
import "primeicons/primeicons.css";

const selectedId = ref(null); // 선택된 마커의 id
const mapRef = ref(null); // KakaoMap 컴포넌트를 참조할 변수

const handleItemClick = ({ id, lat, lng }) => {
  selectedId.value = id;
  if (mapRef.value) {
    mapRef.value.moveToMarker({ lat, lng }); // KakaoMap 중심 이동 호출
  }
};

const closeDetail = () => {
  selectedId.value = null;
};

watch(()=>{selectedId, handleItemClick});
</script>

<template>
  <div class="flex flex-col flex-grow">
    <!-- 50px 높이의 공백 추가 -->
    <div class="h-[50px] border-b border-solid border-[#f5f2f0]">
      <SearchFilter />
    </div>
    <!-- 콘텐츠 영역 -->
    <div class="flex flex-grow max-h-[calc(100vh-115px)] relative">
      <!-- ResultMenu 영역 -->
      <div
        class="w-[400px] flex-shrink-0 border-r border-solid border-[#f5f2f0] h-full z-20"
      >
        <ResultMenu @item-click="handleItemClick" />
      </div>

      <!-- DetailView 슬라이드 영역 -->
      <div
        class="absolute top-0 left-[400px] h-full w-[400px] z-10 bg-white border-r border-solid border-[#f5f2f0] transition-transform duration-300"
        :class="{ 'translate-x-0': selectedId, '-translate-x-full': !selectedId }"
        v-if="selectedId"
      >
        <DetailView :selectedId="selectedId" class="h-full w-full" />
        <div
          class="absolute top-1/2 right-[-32px] transform -translate-y-1/2 z-10"
        >
          <div
            class="bg-white p-2 rounded-r-md cursor-pointer shadow-lg border-white"
            @click="closeDetail"
            v-show="selectedId"
          >
            <i class="pi pi-angle-double-left text-black"></i>
          </div>
        </div>
      </div>

      <!-- KakaoMap 영역 -->
      <div class="flex-grow flex justify-end h-full">
        <KakaoMap ref="mapRef" />
      </div>
    </div>
  </div>
</template>
