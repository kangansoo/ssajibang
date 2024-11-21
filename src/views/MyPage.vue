<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';

const userStore = useUserStore();

onMounted(async () => {
  // 새로고침 시 로그인 상태 복원
  await userStore.initUserInfo();
  console.log(userStore.userInfo)
});
</script>

<template>
  <div class="flex flex-grow bg-[#f7f4f0] items-center justify-center px-4">
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8 flex flex-col">
      <div class="text-center font-bold text-3xl">마이페이지</div>
    </div>
  </div>
</template>

<style scoped>

</style>
