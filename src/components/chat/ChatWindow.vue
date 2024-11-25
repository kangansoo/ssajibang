<script setup>
import { ref } from 'vue';
import { useChatStore } from '@/stores/chat';
import 'primeicons/primeicons.css';
import ChatList from './ChatList.vue';
import ChatRoom from './ChatRoom.vue';

const chatStore = useChatStore();  // Pinia 스토어 가져오기

const activeTab = ref('home');
const setActiveTab = (tab) => {
  activeTab.value = tab;
};

const selectChat = (chat) => {
  chatStore.selectChat(chat);
  activeTab.value = 'chat';
};

const sendMessage = (content) => {
  chatStore.sendMessage(content);
};
</script>

<template>
  <div
    class="flex flex-col absolute bottom-full right-1 mb-2 w-[400px] h-[600px] bg-white rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.25)]">
    <div class="flex flex-col flex-grow overflow-hidden p-5">
      <div class="flex-grow overflow-y-auto relative">
        <Transition name="fade" mode="out-in">
          <div :key="activeTab">
            <ChatList v-if="activeTab === 'home'" :chatList="chatStore.chatList" @selectChat="selectChat" />
            <ChatRoom v-if="activeTab === 'chat'" :currentChat="chatStore.currentChat" :messages="chatStore.messages" @sendMessage="sendMessage" />
            <div v-if="activeTab === 'chatbot'">
              <h2 class="text-xl font-semibold mb-2">챗봇</h2>
              <p>여기에 챗봇 컨텐츠를 넣으세요.</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="flex justify-around items-center h-16 bg-[#f7f4f0] rounded-b-3xl">
      <div @click="setActiveTab('home')" :class="[activeTab === 'home' ? 'text-[#e46d0c]' : 'text-[#6E6E6E]']"
        class="flex flex-col items-center cursor-pointer hover:text-[#e46d0c] transition duration-300 group">
        <i class="pi pi-home transition duration-300 group-hover:text-[#e46d0c]"
          :class="[activeTab === 'home' ? 'text-[#e46d0c]' : 'text-[#6E6E6E]']"></i>
        <span class="group-hover:text-[#e46d0c]">홈</span>
      </div>
      <div @click="setActiveTab('chat')" :class="[activeTab === 'chat' ? 'text-[#e46d0c]' : 'text-[#6E6E6E]']"
        class="flex flex-col items-center cursor-pointer hover:text-[#e46d0c] transition duration-300 group">
        <i class="pi pi-comment transition duration-300 group-hover:text-[#e46d0c]"
          :class="[activeTab === 'chat' ? 'text-[#e46d0c]' : 'text-[#6E6E6E]']"></i>
        <span class="group-hover:text-[#e46d0c]">채팅</span>
      </div>
      <div @click="setActiveTab('chatbot')" :class="[activeTab === 'chatbot' ? 'text-[#e46d0c]' : 'text-[#6E6E6E]']"
        class="flex flex-col items-center cursor-pointer hover:text-[#e46d0c] transition duration-300 group">
        <i class="pi pi-microchip-ai transition duration-300 group-hover:text-[#e46d0c]"
          :class="[activeTab === 'chatbot' ? 'text-[#e46d0c]' : 'text-[#6E6E6E]']"></i>
        <span class="group-hover:text-[#e46d0c]">챗봇</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
