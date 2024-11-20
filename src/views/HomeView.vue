<script setup>
import SearchSection from '../components/SearchSection.vue'
import FeaturedList from '../components/FeaturedList.vue'
import NoticeList from '../components/notice/NoticeList.vue';


</script>

<template>
  <div class="px-40 flex flex-1 justify-center py-5">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      <SearchSection />
      <FeaturedList />
      <NoticeList />
    </div>
  </div>
</template>

<style scoped></style>
