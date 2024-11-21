<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  chatList: Array
});

const emit = defineEmits(['selectChat']);

const selectChat = (chat) => {
  emit('selectChat', chat);
};
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold mb-4">채팅 목록</h2>
    <div v-for="chat in chatList" :key="chat.id" @click="selectChat(chat)"
      class="flex items-center p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
      <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
        {{ chat.name[0] }}
      </div>
      <div class="flex-grow">
        <h3 class="font-semibold">{{ chat.name }}</h3>
        <p class="text-sm text-gray-600">{{ chat.lastMessage }}</p>
      </div>
      <span class="text-xs text-gray-500">{{ chat.time }}</span>
    </div>
  </div>
</template>
