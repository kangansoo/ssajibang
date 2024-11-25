<script setup>
import { computed } from "vue";
import { useMapStore } from "@/stores/map";

const mapStore = useMapStore();

const currentPage = computed(() => mapStore.currentPage);
const totalPages = computed(() => mapStore.totalPage);

const homeList = computed(() => mapStore.homeList);



// 페이지 이동 (다음 페이지)
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    mapStore.setCurrentPage(currentPage.value + 1);  // 현재 페이지 + 1
  }
};

// 페이지 이동 (이전 페이지)
const prevPage = () => {
  if (currentPage.value > 1) {
    mapStore.setCurrentPage(currentPage.value - 1);  // 현재 페이지 - 1
  }
};

// 가격을 포맷하는 함수
const formatPrice = (price) => {
  return price.toLocaleString("ko-KR");
};
</script>

<template>
  <div class="flex flex-col h-full bg-white">
    <!-- 리스트 및 페이지네이션 -->
    <div class="flex-grow overflow-y-auto scroll relative" v-if="homeList">
      <div
        v-for="item in homeList"
        :key="item.id"
        class="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
        @click="$emit('item-click', { id: item.id, lat: item.lat, lng: item.lng })"
      >
        <div class="flex">
          <div class="w-[150px] h-[150px]">
            <img
              :src="item.img"
              :alt="item.title"
              class="w-full h-full object-cover mb-2 rounded"
            />
          </div>
          <div class='flex flex-col ml-3 max-w-[200px]'>
            <p class="font-semibold text-lg">
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
              {{ item.roomType }} | {{ item.exclusiveArea }}㎡ | {{ item.floor }}
            </p>
            <p class="text-sm text-gray-600">
              관리비: {{ formatPrice(item.maintenanceCost) }}만원
            </p>
            <p class="text-sm text-gray-600 truncate">{{ item.title }}</p>
          </div>
        </div>
      </div>
      <div v-if="!homeList">
        근처에 매물이 없습니다.
        다시 검색해주세요
      </div>
      <!-- 페이지네이션 -->
      <div class="bottom-0 left-0 right-0 p-4 flex justify-between items-center mt-5" v-if="homeList">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-[#e46d0c] text-white rounded hover:bg-[#e4830c] disabled:bg-gray-300 disabled"
        >
          이전
        </button>
        <span class="text-sm font-medium">
          {{ currentPage }} / {{ totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-[#e46d0c] text-white rounded hover:bg-[#e4830c] disabled:bg-gray-300 disabled"
        >
          다음
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.scroll::-webkit-scrollbar {
    width: 5px;  /* 스크롤바의 너비 */
}

.scroll::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #d4d4d4; /* 스크롤바의 색상 */
    border-radius: 10px;
}

.scroll::-webkit-scrollbar-track {
    background: none;  /* 스크롤바 뒷 배경 색상 */
}

.scroll {
  cursor: pointer;
}
</style>
