<script setup>
import { ref, onMounted } from 'vue';
import NoticeItem from '@/components/notice/NoticeItem.vue';
import { localAxios } from '@/util/http-commons';

const notices = ref([]);
const currentPage = ref(0);
const totalPage = ref(0);
const totalNotice = ref(0);

const fetchNotices = async () => {
  try {
    const response = await localAxios().get('/notices');
    const data = response.data;
    notices.value = data.noticeList.map(notice => ({
      ...notice,
      isOpen: false,
      date: new Date(notice.createdAt).toLocaleDateString()
    }));
    console.log("response: ", response);
    currentPage.value = data.currentPage;
    totalPage.value = data.totalPage;
    totalNotice.value = data.totalNotice;
  } catch (error) {
    console.error('공지사항을 불러오는 데 실패했습니다:', error);
  }
};

const toggleNotice = async (id) => {
  const notice = notices.value.find(n => n.id === id);
  if (notice) {
    if (!notice.isOpen) {
      try {
        const response = await localAxios.get(`/notices/${id}`);
        const detailData = response.data;
        notice.content = detailData.content;
      } catch (error) {
        console.error('공지사항 상세 내용을 불러오는 데 실패했습니다:', error);
      }
    }
    notice.isOpen = !notice.isOpen;
  }
};

onMounted(fetchNotices);
</script>

<template>
  <div class="flex flex-grow min-h-full bg-[#f7f4f0] items-center justify-center px-4">
    <div class="w-full max-w-6xl bg-white rounded-xl shadow-md p-8 flex flex-col h-[90%]">
      <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">공지사항</h1>
      <div class="flex mt-5 py-3 text-xl font-bold text-gray-600 border-y-2 border-gray-300 bg-[#fafafa]">
        <div class="flex-grow w-10/12 text-center">제목</div>
        <div class="w-2/12 text-center">날짜</div>
      </div>
      <div class="overflow-y-auto">
        <notice-item
          v-for="notice in notices"
          :key="notice.id"
          :notice="notice"
          @toggle="toggleNotice(notice.id)"
        />
      </div>
    </div>
  </div>
</template>
