<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const userInfo = ref(null);

onMounted(async () => {
  await userStore.initUserInfo();
  userInfo.value = userStore.userInfo;
  console.log(userInfo.value);
});
</script>

<template>
  <div class="flex flex-grow bg-[#f7f4f0] items-center justify-center px-4 py-8">
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-center font-bold text-3xl mb-8 text-gray-800">마이페이지</h1>
      <div v-if="userInfo" class="space-y-6">
        <div class="flex items-center border-b pb-4">
          <span class="w-24 font-semibold text-gray-700">이름</span>
          <span class="flex-grow text-gray-900">{{ userInfo.name }}</span>
        </div>
        <div class="flex items-center border-b pb-4">
          <span class="w-24 font-semibold text-gray-700">이메일</span>
          <span class="flex-grow text-gray-900">{{ userInfo.email }}</span>
        </div>
        <div class="flex items-center">
          <span class="w-24 font-semibold text-gray-700">가입일</span>
          <span class="flex-grow text-gray-900">{{ new Date(userInfo.iat * 1000).toLocaleDateString() }}</span>
        </div>
      </div>
      <div v-else class="text-center text-gray-600">
        사용자 정보를 불러오는 중...
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 추가적인 스타일이 필요한 경우 여기에 작성 */
</style>
