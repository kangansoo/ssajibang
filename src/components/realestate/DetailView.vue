<script setup>
import { computed } from 'vue';
import { useMapStore } from '@/stores/map';

const props = defineProps({
  selectedId: {
    type: Number,
    default: null
  }
});

const mapStore = useMapStore();

const selectedItem = computed(() => {
  return mapStore.homeList.find(item => item.id === props.selectedId);
});

const formatPrice = (price) => {
  return price.toLocaleString('ko-KR');
};
</script>

<template>
  <div v-if="selectedItem" class="w-full h-full p-4 border-r overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
    <div class="w-[200px]">
        <img :src="selectedItem.img" :alt="selectedItem.title" class="w-full h-64 object-cover mb-4 rounded">
    </div>
    <h2 class="text-2xl font-bold mb-2">{{ selectedItem.title }}</h2>
    <p class="text-lg mb-2">
      {{ selectedItem.rentType === 'YEARLY_RENT' ? '전세' : '월세' }}:
      <span v-if="selectedItem.rentType === 'YEARLY_RENT'">
        {{ formatPrice(selectedItem.deposit) }}만원
      </span>
      <span v-else>
        {{ formatPrice(selectedItem.deposit) }}/{{ formatPrice(selectedItem.monthlyRent) }}만원
      </span>
    </p>
    <p class="mb-2">{{ selectedItem.roomType }} | {{ selectedItem.exclusiveArea }}㎡ | {{ selectedItem.floor }}층</p>
    <p class="mb-2">관리비: {{ formatPrice(selectedItem.maintenanceCost) }}만원</p>
    <p class="mb-2">주소: {{ selectedItem.address }}</p>
    <p class="mb-2">방 개수: {{ selectedItem.roomCnt }}</p>
    <p class="mb-2">화장실 개수: {{ selectedItem.bathroomCnt }}</p>
    <p class="mb-2">방향: {{ selectedItem.direction }}</p>
    <p class="mb-2">입주 가능일: {{ selectedItem.availableFrom }}</p>
    <p class="mb-2">건물 유형: {{ selectedItem.homeType }}</p>
  </div>
  <div v-else class="flex items-center justify-center h-full">
    <p class="text-xl text-gray-500">매물을 선택해주세요</p>
  </div>
</template>