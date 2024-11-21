<script setup>
import { ref, defineProps, defineEmits } from 'vue';

defineProps({
  currentChat: Object,
  messages: Array
});

const emit = defineEmits(['sendMessage']);

const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value.trim()) {
    emit('sendMessage', newMessage.value);
    newMessage.value = '';
  }
};
</script>

<template>
  <div class="h-full flex flex-col">
    <div v-if="currentChat" class="bg-gray-100 p-3 rounded-t-lg flex items-center">
      <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
        {{ currentChat.name[0] }}
      </div>
      <h2 class="text-lg font-semibold">{{ currentChat.name }}</h2>
    </div>
    <div class="flex-grow overflow-y-auto p-4 space-y-4">
      <div v-for="message in messages" :key="message.id"
        :class="['flex', message.sender === '나' ? 'justify-end' : 'justify-start']">
        <div :class="['max-w-[70%] p-3 rounded-lg',
          message.sender === '나' ? 'bg-blue-500 text-white' : 'bg-gray-200']">
          <p>{{ message.content }}</p>
          <span class="text-xs opacity-75">{{ message.time }}</span>
        </div>
      </div>
    </div>
    <div class="mt-4 flex">
      <input v-model="newMessage" @keyup.enter="sendMessage"
        class="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="메시지를 입력하세요...">
      <button @click="sendMessage"
        class="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition duration-300">
        전송
      </button>
    </div>
  </div>
</template>
