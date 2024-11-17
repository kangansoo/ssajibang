<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import VKakaoMap from "@/components/common/VKakaoMap.vue";

const route = useRoute();
const searchQuery = ref('');
const chargingStations = ref([]);
const selectStation = ref({});

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search;
    performSearch();
  }
});

watch(() => route.query.search, (newSearch) => {
  if (newSearch) {
    searchQuery.value = newSearch;
    performSearch();
  }
});

const performSearch = async () => {
  console.log("Searching for:", searchQuery.value);
  // 예: Kakao API를 호출하여 검색 결과 가져오기
  const ps = new kakao.maps.services.Places();
  ps.keywordSearch(searchQuery.value, (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      chargingStations.value = data.map(item => ({
        lat: parseFloat(item.y),
        lng: parseFloat(item.x),
        name: item.place_name,
      }));
    } else {
      chargingStations.value = []; // 검색 결과 없음
    }
  });
};
</script>

<template>
  <div class="container flex-grow flex text-center">
    <VKakaoMap 
      :stations="chargingStations" 
      :selectStation="selectStation" 
      :searchQuery="searchQuery" 
    />
  </div>
</template>
