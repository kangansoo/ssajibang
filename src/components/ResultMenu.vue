<script setup>
import { ref, computed } from "vue";
import { useMapStore } from "@/stores/map";

const mapStore = useMapStore();

const itemsPerPage = 10;
const currentPage = ref(1);

const paginatedHomeList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return mapStore.homeList.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(mapStore.homeList.length / itemsPerPage)
);

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const formatPrice = (price) => {
  return price.toLocaleString("ko-KR");
};
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- 리스트 -->
    <div
      class="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
    >
      <div
        v-for="item in paginatedHomeList"
        :key="item.id"
        class="p-4 border-b border-gray-200"
      >
        <img
          :src="item.img"
          :alt="item.title"
          class="w-full h-40 object-cover mb-2 rounded"
        />
        <h3 class="font-bold text-lg mb-1">{{ item.title }}</h3>
        <p class="text-sm text-gray-600">
          {{ item.rentType === "YEARLY_RENT" ? "전세" : "월세" }}
        </p>
        <p class="font-semibold text-lg">
          <span v-if="item.rentType === 'YEARLY_RENT'">
            {{ formatPrice(item.deposit) }}만원
          </span>
          <span v-else>
            {{ formatPrice(item.deposit) }}/{{
              formatPrice(item.monthlyRent)
            }}만원
          </span>
        </p>
        <p class="text-sm text-gray-600">
          {{ item.roomType }} | {{ item.exclusiveArea }}㎡ | {{ item.floor }}층
        </p>
        <p class="text-sm text-gray-600">
          관리비: {{ formatPrice(item.maintenanceCost) }}만원
        </p>
      </div>
    </div>
    <!-- 페이지네이션 -->
    <div class="flex justify-between items-center p-4 bg-gray-100">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        이전
      </button>
      <span class="text-sm font-medium">
        {{ currentPage }} / {{ totalPages }} (총 {{ mapStore.totalCnt }}개)
      </span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        다음
      </button>
    </div>
  </div>
</template>
