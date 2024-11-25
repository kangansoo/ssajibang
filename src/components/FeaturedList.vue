<script setup>
import { ref } from 'vue';
import { localAxios } from '@/util/http-commons';
import { useRoute } from 'vue-router';

const markers = ref([]);
const currentPage = ref(1);
const route = useRoute();

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
</script>

<template>
  <div>
    <h2 class="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Featured Listings</h2>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
      <div v-for="listing in markers" :key="listing.id" class="flex flex-col gap-1 pb-3">
        <!-- 이미지를 listing.image로 수정 -->
        <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-l">
          <img :src='listing.image' alt="Property Image" class="w-full h-full"/>
        </div>
        <p class="text-[#181411] text-center text-base font-medium leading-normal">{{ listing.details }}</p>
      </div>
    </div>
    <div class="flex px-4 py-3 justify-end">
      <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f5f2f0] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em]">
        <span class="truncate">View all listings</span>
      </button>
    </div>
  </div>
</template>
