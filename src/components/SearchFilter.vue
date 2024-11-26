<script setup>
import { computed, ref, watch } from 'vue';
import { useMapStore } from '@/stores/map.js';
import axios from 'axios';

// 필터링 관련 상태 변수
const searchQuery = ref('');
const rentType = ref('');
const priceRange = ref('');
const depositRange = ref('');
const maintenanceCostRange = ref('');
const areaRange = ref('');
const roomType = ref('');

// Vuex 상태 관리
const mapStore = useMapStore();
const currentTab = computed(() => mapStore.tab);

// 탭 변경 함수
const selectTab = (tab) => {
  mapStore.setTab(tab);
};

// 필터 값 파싱
const parseFilterValue = (value) => {
  if (!value) return { min: null, max: null };

  const [min, max] = value.split('-').map((v) => {
    const num = parseFloat(v.replace(/[^0-9]/g, ''));
    return isNaN(num) ? null : num;
  });

  return { min, max };
};

// 데이터 요청 및 상태 업데이트
const handleSearch = async () => {
  const price = parseFilterValue(priceRange.value);
  const deposit = parseFilterValue(depositRange.value);
  const maintenanceCost = parseFilterValue(maintenanceCostRange.value);
  const area = parseFilterValue(areaRange.value);

  const params = {
    query: searchQuery.value || '',
    rentType: rentType.value || '',
    roomType: roomType.value || '',
    monthlyRentRangeMin: price.min,
    monthlyRentRangeMax: price.max,
    depositRangeMin: deposit.min,
    depositRangeMax: deposit.max,
    maintenanceCostRangeMin: maintenanceCost.min,
    maintenanceCostRangeMax: maintenanceCost.max,
    exclusiveAreaRangeMin: area.min,
    exclusiveAreaRangeMax: area.max,
    page: mapStore.currentPage,
  };

  const endpoint = currentTab.value === 'normal' ? '/home/dabang' : '/home/ssafy';

  try {
    const response = await axios.get(endpoint, { params });
    const { totalPage, totalCnt, homeList } = response.data;

    mapStore.updateMapData({ totalPage, totalCnt, homeList });
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

// 필터 상태 변경 감지
watch(
  [searchQuery, rentType, priceRange, depositRange, maintenanceCostRange, areaRange, roomType],
  () => {
    handleSearch();
  },
  { immediate: true }
);

// 필터 옵션
const rentTypes = ['월세', '전세'];
const priceRanges = ['0-30', '30-50', '50-70', '70-100', '100-'];
const deposits = ['0-100', '100-200', '200-300', '300-500', '500-1000', '1000-'];
const maintenanceCosts = ['0-5', '5-10', '10-'];
const areaRanges = ['0-20', '20-30', '30-40', '40-50', '50-'];
const roomTypes = ['원룸', '투룸', '투룸 이상'];
</script>

<template>
  <div class="flex items-center px-4 h-full gap-5">

    <!-- 탭 버튼 -->
    <div
      class="w-[100px] cursor-pointer py-2 text-center rounded-lg hover:bg-[#e46d0c] hover:text-white"
      :class="{
        'bg-[#e46d0c] text-white': currentTab === 'normal',
        'bg-white text-black': currentTab !== 'normal',
      }"
      @click="selectTab('normal')"
    >
      일반 매물
    </div>
    <div
      class="w-[100px] cursor-pointer py-2 text-center rounded-lg hover:bg-[#e46d0c] hover:text-white"
      :class="{
        'bg-[#e46d0c] text-white': currentTab === 'ssafy',
        'bg-white text-black': currentTab !== 'ssafy',
      }"
      @click="selectTab('ssafy')"
    >
      싸피 매물
    </div>

    <!-- 검색 및 필터 -->
    <input v-model="searchQuery" type="text" placeholder="지역, 지하철역으로 검색" class="w-[300px] px-2 py-1 border rounded" />

    <select v-model="rentType">
      <option value="">임대 유형</option>
      <option v-for="type in rentTypes" :key="type" :value="type">{{ type }}</option>
    </select>

    <select v-model="priceRange">
      <option value="">가격대</option>
      <option v-for="range in priceRanges" :key="range" :value="range">{{ range }}만원</option>
    </select>

    <select v-model="depositRange">
      <option value="">보증금</option>
      <option v-for="range in deposits" :key="range" :value="range">{{ range }}만원</option>
    </select>

    <select v-model="maintenanceCostRange">
      <option value="">관리비</option>
      <option v-for="range in maintenanceCosts" :key="range" :value="range">{{ range }}만원</option>
    </select>

    <select v-model="areaRange">
      <option value="">면적</option>
      <option v-for="range in areaRanges" :key="range" :value="range">{{ range }}</option>
    </select>

    <select v-model="roomType">
      <option value="">방 종류</option>
      <option v-for="type in roomTypes" :key="type" :value="type">{{ type }}</option>
    </select>
  </div>
</template>
