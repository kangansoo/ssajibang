<script setup>
import { ref } from 'vue';
import 'primeicons/primeicons.css'
import ChatWindow from './ChatWindow.vue';

const isOpen = ref(false);
const isClicked = ref(false);

const open = () => {
  isOpen.value = !isOpen.value;
  isClicked.value = true;
  setTimeout(() => {
    isClicked.value = false;
  }, 300); // 애니메이션 지속 시간과 일치
}
</script>

<template>
  <div>
    <div @click="open"
         :class="[
           'w-16 h-16 border rounded-full flex items-center justify-center cursor-pointer bg-[#e46d0c] transition-all duration-300 ease-in-out',
           {'hover:scale-110': !isClicked, 'scale-90': isClicked}
         ]">
      <Transition name="zoom-fade" mode="out-in">
        <i v-if="!isOpen" key="comments" class="pi pi-comments" style="font-size:30px; color:white"></i>
        <i v-else key="times" class="pi pi-times" style="font-size:30px; color:white"></i>
      </Transition>
    </div>
    <Transition name="dropdown">
      <ChatWindow v-if="isOpen"/>
    </Transition>
  </div>
</template>

<style scoped>
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: all 0.3s ease;
}

.zoom-fade-enter-from,
.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.zoom-fade-enter-to,
.zoom-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
