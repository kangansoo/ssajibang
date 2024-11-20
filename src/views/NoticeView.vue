<script setup>
import { ref } from 'vue';
import NoticeItem from '@/components/notice/NoticeItem.vue';

const notices = ref([
  {
    id: 1,
    title: "공지사항 제목 1",
    date: "2024-11-20",
    content: "공지사항 내용 1...",
    isOpen: false
  },
  {
    id: 2,
    title: "공지사항 제목 2",
    date: "2024-11-21",
    content: "공지사항 내용 2...",
    isOpen: false
  },
  {
    id: 3,
    title: "공지사항 제목 3",
    date: "2024-11-21",
    content: "공지사항 내용 3...",
    isOpen: false
  },
]);

const toggleNotice = (id) => {
  const notice = notices.value.find(n => n.id === id);
  if (notice) {
    notice.isOpen = !notice.isOpen;
  }
};
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
