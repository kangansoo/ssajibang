<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  // 여기에 로그인 로직을 구현하세요
  console.log('Login attempt', { email: email.value, password: password.value });
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
            class="w-full px-3 py-2 border border-[#e6e0db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e46d0c]"
            required
          >
        </div>
        <button
          type="submit"
          class="w-full bg-[#e46d0c] text-white py-2 px-4 rounded-md hover:bg-[#c45a0a] transition duration-300"
        >
          Log In
        </button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-sm text-[#8a7360] hover:underline">Forgot password?</a>
      </div>
      <div class="mt-6 text-center">
        <p class="text-sm text-[#8a7360]">
          Don't have an account?
          <a href="#" class="text-[#e46d0c] hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 추가적인 스타일이 필요하다면 여기에 작성하세요 */
</style>
