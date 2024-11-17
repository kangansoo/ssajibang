<script setup>
import NavigationBar from './components/NavigationBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white overflow-x-hidden font-sans">
    <NavigationBar />
    <main class="flex flex-grow">
      <RouterView />
    </main>
    <FooterBar />
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
