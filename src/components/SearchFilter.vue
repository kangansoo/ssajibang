<script setup>
import { ref, watch } from 'vue';
import { useMapStore } from '@/stores/map.js';

const searchQuery = ref('');  // 지역 또는 지하철역 검색
const priceRange = ref('');   // 가격대
const rentType = ref('');     // 임대 유형 (월세/전세)
const areaRange = ref('');    // 면적 범위
const selectedTab = ref('normal');  // 탭 선택 (일반 매물 / 싸피 매물)
const roomType = ref('');  // 방 종류

const mapStore = useMapStore();

// 필터링 탭 변경
const selectTab = (tab) => {
  selectedTab.value = tab;
  mapStore.setTab(tab);  // mapStore에 탭 정보 업데이트
};

// 필터 옵션 목록
const rentTypes = ['월세', '전세'];
const priceRanges = ['0-30만원', '30-50만원', '50-70만원', '70-100만원', '100만원 이상'];
const areaRanges = ['0-20m²', '20-30m²', '30-40m²', '40-50m²', '50m² 이상'];
const roomTypes = ['원룸', '투룸', '투룸 이상'];

// 폼 제출 시 필터링 수행
const handleSearch = () => {
  mapStore.filterData({
    searchQuery: searchQuery.value,
    priceRange: priceRange.value,
    rentType: rentType.value,
    areaRange: areaRange.value,
    roomType: roomType.value,
  });
};

// 필터링된 homeList가 변경되면 화면에 반영되도록
watch(() => mapStore.homeList, (newHomeList) => {
  console.log('필터링된 매물 리스트:', newHomeList);
});
</script>

<template>
  <div class="flex items-center px-4 h-full gap-5">
    <!-- 탭 버튼 -->
    <div
      class="w-[100px] cursor-pointer py-2 text-center rounded-lg hover:bg-[#e46d0c] hover:text-white"
      :class="{
        'bg-[#e46d0c] text-white': selectedTab === 'normal',
        'bg-white text-black': selectedTab !== 'normal'
      }"
      @click="selectTab('normal')"
    >
      일반 매물
    </div>
    <div
      class="w-[100px] cursor-pointer py-2 text-center rounded-lg hover:bg-[#e46d0c] hover:text-white"
      :class="{
        'bg-[#e46d0c] text-white': selectedTab === 'ssafy',
        'bg-white text-black': selectedTab !== 'ssafy'
      }"
      @click="selectTab('ssafy')"
    >
      싸피 매물
    </div>

    <!-- 지역 검색 -->
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="지역, 지하철역으로 검색"
        class="w-[300px] px-2 py-1 pr-10 border rounded"
      />
      <img
        src="@/assets/search-icon.png"
        alt="검색"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
        @click="handleSearch"
      />
    </div>

    <!-- 월세/전세 선택 -->
    <select
      v-model="rentType"
      class="px-2 py-1 border rounded"
    >
      <option value="" disabled selected>임대 유형</option>
      <option v-for="type in rentTypes" :key="type" :value="type">
        {{ type }}
      </option>
    </select>

    <!-- 가격대 선택 -->
    <select
      v-model="priceRange"
      class="px-2 py-1 border rounded"
    >
      <option value="" disabled selected>가격대</option>
      <option v-for="range in priceRanges" :key="range" :value="range">
        {{ range }}
      </option>
    </select>

    <!-- 면적 범위 선택 -->
    <select
      v-model="areaRange"
      class="px-2 py-1 border rounded"
    >
      <option value="" disabled selected>면적</option>
      <option v-for="range in areaRanges" :key="range" :value="range">
        {{ range }}
      </option>
    </select>

    <!-- 방 종류 선택 -->
    <select
      v-model="roomType"
      class="px-2 py-1 border rounded"
    >
      <option value="" disabled selected>방 종류</option>
      <option v-for="type in roomTypes" :key="type" :value="type">
        {{ type }}
      </option>
    </select>

    <!-- 검색 버튼 -->
    <button @click="handleSearch" class="bg-[#e46d0c] text-white py-1 px-4 rounded">
      검색
    </button>

    <!-- 필터링된 매물 목록 -->
    <div v-if="mapStore.homeList.length">
      <div v-for="(item, index) in mapStore.homeList" :key="index">
        <div>{{ item.location }} | {{ item.price }} | {{ item.area }}m²</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>
