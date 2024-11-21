<script setup>
import { ref, onMounted } from 'vue';
import NoticeItem from '@/components/notice/NoticeItem.vue';
import { localAxios } from '@/util/http-commons';

// 데이터와 상태 정의
const notices = ref([]); // 공지사항 목록
const totalNotice = ref(0); // 전체 공지사항 개수
const pageSize = ref(10); // 한 페이지에 보여줄 항목 수
const currentPage = ref(1); // 현재 페이지

// 데이터 가져오기
const fetchNotices = async (page = 1) => {
  try {
    const response = await localAxios().get('/notices', {
      params: { page, size: pageSize.value }, // 서버로 현재 페이지와 페이지 크기 전달
    });

    // 서버에서 데이터 받아오기
    const data = response.data;
    console.log(data)
    totalNotice.value = response.data.totalNotice;

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

// 페이지 변경 시 데이터 로드
const changePage = async (page) => {
  const maxPage = Math.ceil(totalNotice.value / pageSize.value); // 최대 페이지 계산
  if (page >= 1 && page <= maxPage) {
    currentPage.value = page; // 현재 페이지 업데이트
    await fetchNotices(page); // 해당 페이지 데이터 로드
  }
};

// 공지사항 열기/닫기
const toggleNotice = async (id) => {
  const notice = notices.value.find(n => n.id === id);
  if (notice) {
    if (!notice.isOpen) {
      try {
        const response = await localAxios.get(`/notices/${id}`);
        notice.content = response.data.content; // 상세 내용
      } catch (error) {
        console.error('공지사항 상세 내용을 불러오는 데 실패했습니다:', error);
      }
    }
    notice.isOpen = !notice.isOpen; // 열기/닫기 토글
  }
};

// 컴포넌트 마운트 시 데이터 가져오기
onMounted(fetchNotices);
</script>


<template>
  <div class="flex flex-grow min-h-full bg-[#f7f4f0] items-center justify-center px-4 py-7">
    <div class="w-full max-w-6xl bg-white rounded-xl shadow-md p-8 flex flex-col min-h-[100%]">
      <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">공지사항</h1>

      <!-- 헤더 -->
      <div class="flex mt-5 py-3 text-xl font-bold text-gray-600 border-y-2 border-gray-300 bg-[#fafafa]">
        <div class="flex-grow w-10/12 text-center">제목</div>
        <div class="w-2/12 text-center">날짜</div>
      </div>

      <!-- 공지사항 목록 -->
      <div class="min-h-[490px]">
        <NoticeItem
          v-for="notice in notices"
          :key="notice.id"
          :notice="notice"
          @toggle="toggleNotice(notice.id)"
        />
      </div>

      <!-- 페이지네이션 -->
      <div class="mt-6 flex justify-center space-x-2">
        <button
          class="px-3 py-1 rounded border bg-gray-200"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          이전
        </button>
        <span class="px-3 py-1">
          {{ currentPage }} / {{ Math.ceil(totalNotice / pageSize) }}
        </span>
        <button
          class="px-3 py-1 rounded border bg-gray-200"
          :disabled="currentPage >= Math.ceil(totalNotice / pageSize)"
          @click="changePage(currentPage + 1)"
        >
          다음
        </button>
      </div>
    </div>
  </div>
</template>

