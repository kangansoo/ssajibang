<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useChatStore } from '@/stores/chat';  // Pinia store import

const chatStore = useChatStore();  // Pinia store 인스턴스 생성
const newMessage = ref('');

// 메시지 목록을 항상 하단으로 스크롤
const messageContainer = ref(null);

// 메시지 전송 함수
const sendMessage = () => {
  if (newMessage.value.trim()) {
    chatStore.sendMessage(newMessage.value);  // Pinia store에 메시지 전송
    newMessage.value = '';
    
    // 메시지 전송 후 스크롤을 항상 하단으로 이동
    nextTick(() => {
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
      }
    });
  }
};

// 페이지가 로드될 때도 초기 스크롤을 하단으로 이동
onMounted(() => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
});
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- 현재 채팅 정보 -->
    <div class="bg-gray-100 p-3 flex items-center sticky top-0 z-10">
      <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
        {{ chatStore.currentChat ? chatStore.currentChat.name[0] : '' }}
      </div>
      <h2 class="text-lg font-semibold">{{ chatStore.currentChat ? chatStore.currentChat.name : '' }}</h2>
    </div>

    <!-- 메시지 목록 -->
    <div class="h-[360px] overflow-y-auto scroll" ref="messageContainer">
      <div class="flex-grow p-4 space-y-4 bg-white">
        <div v-for="message in chatStore.messages" :key="message.id"
          :class="['flex', message.sender === '나' ? 'justify-end' : 'justify-start']">
          <div :class="['max-w-[70%] p-3 rounded-lg',
            message.sender === '나' ? 'bg-blue-500 text-white' : 'bg-gray-200']">
            <p>{{ message.content }}</p>
            <span class="text-xs opacity-75">{{ message.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 입력창 -->
    <div class="p-2 border-t border-gray-300 bg-white sticky bottom-0 z-10">
      <div class="flex">
        <input v-model="newMessage" @keyup.enter="sendMessage"
          class="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="메시지를 입력하세요...">
        <button @click="sendMessage"
          class="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition duration-300">
          전송
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
    background: none;  /*스크롤바 뒷 배경 색상*/
}
</style>
