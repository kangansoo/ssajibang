<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import { useRoute } from "vue-router";
import { computed } from 'vue';
import StickyButton from '@/components/chat/StickyButton.vue';

const route = useRoute()
const isHomePage = computed(() => route.name === 'Home')
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white overflow-x-hidden font-sans">
    <NavigationBar class="z-5"/>
    <main class="flex flex-grow z-1">
      <RouterView />
      <StickyButton class="fixed bottom-5 right-5 z-50 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8"/>
    </main>
    <FooterBar v-if="isHomePage"/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700;900&family=Public+Sans:wght@400;500;700;900&display=swap');

.font-sans {
  font-family: "Public Sans", "Noto Sans", sans-serif;
}

html, body {
  height: 100%;
}
</style>
