<!-- SearchFilter.vue -->
<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const priceRange = ref('');
const rentType = ref('');
const areaRange = ref('');

const rentTypes = ['월세', '전세'];
const priceRanges = ['0-5만원', '5-10만원', '10-15만원', '15-20만원', '20만원 이상'];
const areaRanges = ['0-10m²', '10-20m²', '20-30m²', '30-40m²', '40m² 이상'];
</script>

<template>
  <div class="flex items-center px-4 h-full gap-5">
    <!-- 검색 입력 -->
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="지역, 지하철역으로 검색"
        class="w-[300px] px-2 py-1 pr-10 border rounded"
      >
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

    <!-- m² 범위 선택 -->
    <select
      v-model="areaRange"
      class="px-2 py-1 border rounded"
    >
      <option value="" disabled selected>면적</option>
      <option v-for="range in areaRanges" :key="range" :value="range">
        {{ range }}
      </option>
    </select>
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
