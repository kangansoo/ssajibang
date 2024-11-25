<script setup>
import { ref } from 'vue';
import { localAxios } from '@/util/http-commons';
import { useRoute } from 'vue-router';
import { useMapStore } from '@/stores/map';  // mapStore 가져오기

const markers = ref([]);
const currentPage = ref(1);
const route = useRoute();
const mapStore = useMapStore();  // mapStore 인스턴스 사용

const getFeatured = async () => {
  try {
    const response = await localAxios().get('/home/ssafy', {
      params: {
        page: currentPage.value,
        bCode: route.query.bCode || '',
      },
    });

    console.log("응답데이터: ", response.data);
    console.log("이미지: ", response.data.homeList[0].imgList[0].url);

    // 응답 데이터에서 첫 4개의 항목만 가져와서 하나의 배열에 담기
    markers.value = response.data.homeList.slice(0, 4).map(item => ({
      id: item.id,
      image: item.imgList[0].url, // 첫 번째 이미지만 사용
      details: item.title, // title을 사용 (상세 정보는 필요한 필드로 변경 가능)
    }));
  } catch (error) {
    console.error('Failed to fetch marker data:', error);
  }
};

getFeatured(); // 초기 데이터 로드

// 더보기 버튼 클릭 시 map 페이지로 이동하고 tab을 'ssafy'로 설정
const handleMoreClick = () => {
  mapStore.setTab('ssafy');  // 'ssafy' 탭으로 설정
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center px-4 pb-3 pt-5">
      <h2 class="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em]">Featured Listings</h2>
      <RouterLink 
        to="/map" 
        @click="handleMoreClick"
        class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f5f2f0] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em]"
      >
        <span class="truncate">더보기</span>
      </RouterLink>
    </div>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
      <div v-for="listing in markers" :key="listing.id" class="flex flex-col gap-1 pb-3">
        <!-- 이미지를 listing.image로 수정 -->
        <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-l">
          <img :src="listing.image" alt="Property Image" class="w-full h-full"/>
        </div>
        <p class="text-[#181411] text-center text-base font-medium leading-normal">{{ listing.details }}</p>
      </div>
    </div>
  </div>
</template>
