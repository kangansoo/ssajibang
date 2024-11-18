<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
</script>

<template>
  <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f5f2f0] px-10 py-3">
    <div class="flex items-center gap-4 text-[#181411]">
      <div class="size-4">
        <!-- SVG logo here -->
      </div>
      <RouterLink to="/" class="cursor-pointer">
        <h2 class="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em]">RealEstate.com</h2>
      </RouterLink>
    </div>
    <div class="flex flex-1 justify-end gap-8">
      <div class="flex items-center gap-4">
        <!-- 로그인한 경우 -->
        <template v-if="userInfo">
          <RouterLink
            to="/write"
            class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e46d0c] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span class="truncate">게시글 작성</span>
          </RouterLink>
          <span class="text-[#181411] text-sm">{{ userInfo.name }}님 안녕하세요.</span>
        </template>
        <!-- 로그인하지 않은 경우 -->
        <template v-else>
          <RouterLink
            to="/login"
            class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e46d0c] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span class="truncate">로그인/회원가입</span>
          </RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
</style>
