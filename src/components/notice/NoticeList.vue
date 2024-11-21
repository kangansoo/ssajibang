<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { localAxios } from '@/util/http-commons';

// 데이터와 상태 정의
const notices = ref([]); // 공지사항 목록
const pageSize = ref(5); // 한 페이지에 보여줄 항목 수

// 데이터 가져오기
const fetchNotices = async (page = 1) => {
  try {
    const response = await localAxios().get('/notices', {
      params: { page, size: pageSize.value }, // 서버로 현재 페이지와 페이지 크기 전달
    });

    // 서버에서 데이터 받아오기
    const data = response.data;

    // 공지사항 데이터 초기화
    notices.value = data.noticeList.map(notice => ({
      ...notice,
      isOpen: false,
      date: new Date(notice.createdAt).toLocaleDateString(), // 날짜 포맷팅
    }));
  } catch (error) {
    console.error('공지사항 데이터를 불러오는 데 실패했습니다:', error);
  }
};


onMounted(fetchNotices);
</script>

<template>
  <div>
    <div class="flex items-center justify-between px-4 pb-3 pt-5">
      <h2 class="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em]">공지사항</h2>
      <RouterLink to="/notice">
        <button class="flex min-w-[40px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-7 px-4 bg-[#f5f2f0] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em]">
          <span class="truncate">더보기</span>
        </button>
      </RouterLink>
    </div>
    <div v-for="notice in notices" :key="notice.id" class="flex items-center justify-between gap-4 bg-white px-4 min-h-[72px] py-2">
      <RouterLink to="/notice">
        <div class="flex flex-col justify-center">
          <p class="text-[#181411] text-base font-medium leading-normal line-clamp-1">[공지] {{ notice.title }}</p>
          <p class="text-[#8a7360] text-sm font-normal leading-normal">on {{ notice.createdAt.substring(0, 10).replace(/-/g, '/') }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
