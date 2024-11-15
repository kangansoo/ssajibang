<script setup>
import { RouterLink } from 'vue-router';

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
      <div class="flex gap-2">
        <RouterLink to="/login" class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e46d0c] text-white text-sm font-bold leading-normal tracking-[0.015em]">
          <span class="truncate">로그인/회원가입</span>
        </RouterLink>
        <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f5f2f0] text-[#181411] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
          <!-- Heart icon -->
        </button>
        <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f5f2f0] text-[#181411] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
          <!-- Notification icon -->
        </button>
      </div>
      <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style="background-image: url('https://cdn.usegalileo.ai/stability/5ae466dd-d169-4bf9-8aa5-8a7b93faf52b.png');"></div>
    </div>
  </header>
</template>

<style scoped>

</style>
