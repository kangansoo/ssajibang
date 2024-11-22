<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import VKakaoMap from "@/components/common/VKakaoMap.vue";
import ResultMenu from '@/components/ResultMenu.vue';
import SearchFilter from '@/components/SearchFilter.vue';
import KakaoMap from '@/components/common/KakaoMap.vue';

const route = useRoute();
const searchQuery = ref('');
const chargingStations = ref([]);
const selectStation = ref({});

// onMounted(() => {
//   if (route.query.search) {
//     searchQuery.value = route.query.search;
//     performSearch();
//   }
// });

// watch(() => route.query.search, (newSearch) => {
//   if (newSearch) {
//     searchQuery.value = newSearch;
//     performSearch();
//   }
// });

// const performSearch = async () => {
//   console.log("Searching for:", searchQuery.value);
//   // 예: Kakao API를 호출하여 검색 결과 가져오기
//   const ps = new kakao.maps.services.Places();
//   ps.keywordSearch(searchQuery.value, (data, status) => {
//     if (status === kakao.maps.services.Status.OK) {
//       chargingStations.value = data.map(item => ({
//         lat: parseFloat(item.y),
//         lng: parseFloat(item.x),
//         name: item.place_name,
//       }));
//     } else {
//       chargingStations.value = []; // 검색 결과 없음
//     }
//   });
// };
</script>

<template>
  <div class="flex flex-col flex-grow">
    <!-- 50px 높이의 공백 추가 -->
    <div class="h-[50px] border-b border-solid border-[#f5f2f0]">
      <SearchFilter />
    </div>
    <!-- 기존 콘텐츠 -->
    <div class="flex flex-grow">
      <div class="w-[400px] flex-shrink-0 border-r border-solid border-[#f5f2f0]">
        <ResultMenu/>
      </div>
      <div class="flex-grow flex justify-end">
        <KakaoMap />
      </div>
    </div>
  </div>
</template>
