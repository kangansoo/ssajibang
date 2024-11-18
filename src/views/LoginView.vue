<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { localAxios } from '@/util/http-commons';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const userStore = useUserStore();

// const handleLogin = async () => {
//   try {
//     const response = await localAxios().post('/members/login', {
//       email: email.value,
//       password: password.value
//     });

//     if (response.status === 200) {
//       console.log('로그인 성공');
//       // 로그인 성공 시 처리 (예: 토큰 저장)
//       // localStorage.setItem('token', response.data.token);
//       router.push('/'); // 홈 페이지로 리다이렉트
//     } else {
//       errorMessage.value = '로그인에 실패했습니다. 다시 시도해주세요.';
//     }
//   } catch (error) {
//     console.error('로그인 오류:', error);
//     if (error.response) {
//       // 서버가 응답을 반환한 경우
//       if (error.response.status === 401) {
//         errorMessage.value = '이메일 또는 비밀번호가 올바르지 않습니다.';
//       } else {
//         errorMessage.value = '로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.';
//       }
//     } else if (error.request) {
//       // 요청이 전송되었지만 응답을 받지 못한 경우
//       errorMessage.value = '서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.';
//     } else {
//       // 요청 설정 중 오류가 발생한 경우
//       errorMessage.value = '로그인 요청을 보내는 중 오류가 발생했습니다.';
//     }
//   }
// };

const handleLogin = async () => {
  try {
    const response = await localAxios().post('/members/login', {
      email: email.value,
      password: password.value
    });

    if (response.status === 200) {
      // accessToken을 세션 스토리지에 저장
      const accessToken = response.data.accessToken;
      sessionStorage.setItem('accessToken', accessToken);

      // axios 기본 헤더에 토큰 설정
      localAxios().defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // 유저 정보를 Pinia store에 저장
      userStore.setUserInfo({
        email: response.data.email,
        name: response.data.name,
        // 필요한 다른 유저 정보들...
      });

      router.push('/');
    }
  } catch (error) {
    console.error('로그인 오류:', error);
    if (error.response?.status === 401) {
      errorMessage.value = '이메일 또는 비밀번호가 올바르지 않습니다.';
    } else {
      errorMessage.value = '로그인 중 오류가 발생했습니다.';
    }
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
