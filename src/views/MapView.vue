<script setup>
import { ref, computed, watch } from "vue";
import ResultMenu from "@/components/ResultMenu.vue";
import SearchFilter from "@/components/SearchFilter.vue";
import KakaoMap from "@/components/common/KakaoMap.vue";
import DetailView from "@/components/realestate/DetailView.vue";
import { useMapStore } from "@/stores/map";
import "primeicons/primeicons.css";

const selectedId = ref(null); // 선택된 마커의 id
const mapStore = useMapStore();

const currentTab = computed(() => mapStore.tab); // 현재 탭 확인

// 매물 선택
const handleItemClick = ({ id }) => {
  selectedId.value = id; // 새로운 매물을 선택
};

// 상세뷰 닫기
const closeDetail = () => {
  selectedId.value = null; // 선택 초기화
};

// 탭 변경 시 매물 초기화
watch(currentTab, () => {
  selectedId.value = null; // 탭 변경 시 초기화
});
</script>

<template>
  <div class="flex flex-col flex-grow">
    <!-- 검색 필터 -->
    <div class="h-[50px] border-b border-solid border-[#f5f2f0]">
      <SearchFilter />
    </div>

    <!-- 콘텐츠 영역 -->
    <div class="flex flex-grow max-h-[calc(100vh-115px)] relative">
      <!-- ResultMenu 영역 -->
      <div class="w-[400px] flex-shrink-0 border-r border-solid border-[#f5f2f0] h-full z-20">
        <ResultMenu @item-click="handleItemClick" />
      </div>

      <!-- DetailView 슬라이드 영역 -->
      <div
        v-if="selectedId !== null"
        class="absolute top-0 left-[400px] h-full w-[400px] z-10 bg-white border-r border-solid border-[#f5f2f0] transition-transform duration-300"
      >
        <DetailView :selectedId="selectedId" class="h-full w-full" />
        <!-- 닫기 버튼 -->
        <div
          class="absolute top-1/2 right-[-32px] transform -translate-y-1/2 z-10"
          @click="closeDetail"
        >
          <div class="bg-white p-2 rounded-r-md cursor-pointer shadow-lg border-white">
            <i class="pi pi-angle-double-left text-black"></i>
          </div>
        </div>
      </div>

      <!-- KakaoMap 영역 -->
      <div class="flex-grow flex justify-end h-full">
        <KakaoMap />
      </div>
    </div>
  </div>
</template>
