<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { localAxios } from '@/util/http-commons';
import { useUserStore } from '@/stores/user';
import { jwtDecode } from 'jwt-decode';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const userStore = useUserStore();

const handleLogin = async () => {
  try {
    const response = await localAxios().post('/members/login', {
      email: email.value,
      password: password.value
    });

    if (response.status === 200) {
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      localAxios().defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // JWT 디코딩
      const decodedToken = jwtDecode(accessToken);
      console.log('decodedToken ', decodedToken);

      // 유저 정보를 Pinia store에 저장
      userStore.setUserInfo({
        email: decodedToken.email,
        name: decodedToken.name,
        // 기타 필요한 정보...
      });

      // 리다이렉션 처리
      const redirectPath = router.currentRoute.value.query.redirect || '/';
      router.push(redirectPath);
      // router.push('/');
    }
  } catch (error) {
    console.error('로그인 오류:', error);
    errorMessage.value = error.response?.status === 401
      ? '이메일 또는 비밀번호가 올바르지 않습니다.'
      : '로그인 중 오류가 발생했습니다.';
  }
};

const handleKeyUp = (event) => {
  if (event.key === 'Enter') {
    handleLogin();
  }
};
</script>

<template>
  <div class="bg-[#f7f4f0] flex flex-grow items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-[#181411]">Login to RealEstate.com</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-[#8a7360] mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            @keyup="handleKeyUp"
            class="w-full px-3 py-2 border border-[#e6e0db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e46d0c]"
            required
          >
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-[#8a7360] mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            @keyup="handleKeyUp"
            class="w-full px-3 py-2 border border-[#e6e0db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e46d0c]"
            required
          >
        </div>
        <button
          type="submit"
          class="w-full bg-[#e46d0c] text-white py-2 px-4 rounded-md hover:bg-[#c45a0a] transition duration-300"
        >
          로그인
        </button>
      </form>
      <p v-if="errorMessage" class="mt-4 text-red-500 text-sm text-center">{{ errorMessage }}</p>
      <div class="mt-4 text-center">
        <a href="#" class="text-sm text-[#8a7360] hover:underline">비밀번호 찾기</a>
      </div>
      <div class="mt-6 text-center">
        <p class="text-sm text-[#8a7360]">
          계정이 없으신가요?
          <RouterLink to="/signup" class="cursor-pointer text-[#e46d0c] hover:underline">
            회원가입하기
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
