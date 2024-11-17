<script setup>
import { ref, computed } from 'vue';
import { localAxios } from '@/util/http-commons';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const emailMessage = ref('');
const emailError = ref(false);
const isEmailChecked = ref(false);

const passwordMismatch = computed(() => {
  return password.value && confirmPassword.value && password.value !== confirmPassword.value;
});

const isFormValid = computed(() => {
  return name.value && email.value && password.value && 
         confirmPassword.value && !passwordMismatch.value && !emailError.value && 
         isEmailChecked.value;
});

const checkEmail = async () => {
  if (!email.value) {
    emailMessage.value = '이메일을 입력해주세요.';
    emailError.value = true;
    return;
  }

  try {
    const response = await localAxios().get('/members/check-email', {
      params: { email: email.value }
    });
    
    // 200 OK 응답을 받으면 이메일 사용 가능
    emailMessage.value = '사용 가능한 이메일입니다.';
    emailError.value = false;
    isEmailChecked.value = true;
    console.log('서버 응답 상태 코드:', response.status);
  } catch (error) {
    if (error.response) {
      console.log('서버 응답 상태 코드:', error.response.status);
      if (error.response.status === 401) {
        emailMessage.value = '이미 사용 중인 이메일입니다.';
        emailError.value = true;
        isEmailChecked.value = false;
      } else {
        emailMessage.value = '이메일 중복 확인 중 오류가 발생했습니다.';
        emailError.value = true;
        isEmailChecked.value = false;
      }
    } else {
      console.error('이메일 중복 확인 중 오류 발생:', error);
      emailMessage.value = '서버와 통신 중 오류가 발생했습니다.';
      emailError.value = true;
      isEmailChecked.value = false;
    }
  }
};

const handleSignUp = async () => {
  if (isFormValid.value) {
    try {
      const response = await localAxios().post('/members/signup', {
        email: email.value,
        password: password.value,
        name: name.value
      });
      
      console.log('회원가입 성공:', response.data);
      if (response.status === 200) {
        router.push('/login');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      // 오류 처리 (예: 사용자에게 오류 메시지 표시)
    }
  }
};

const handleEmailChange = () => {
  isEmailChecked.value = false;
  emailMessage.value = '';
};
</script>

<template>
  <div class="flex flex-grow min-h-screen bg-[#f7f4f0] items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">
      <h2 class="text-[#181411] text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form @submit.prevent="handleSignUp">
        <div class="mb-4">
          <label for="name" class="block text-[#8a7360] text-sm font-medium mb-2">Full Name</label>
          <input type="text" id="name" v-model="name" required
                 class="w-full px-3 py-2 border border-[#e6e0db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e46d0c]">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-[#8a7360] text-sm font-medium mb-2">Email</label>
          <div class="flex">
            <input type="email" id="email" v-model="email" required
                   @input="handleEmailChange"
                   class="flex-grow px-3 py-2 border border-[#e6e0db] rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#e46d0c]">
            <button @click.prevent="checkEmail" 
                    class="bg-[#e46d0c] text-white px-4 py-2 rounded-r-md hover:bg-[#c45a0a] transition duration-300">
              Check
            </button>
          </div>
          <p v-if="emailMessage" :class="{'text-green-500': !emailError, 'text-red-500': emailError}" class="mt-1 text-sm">
            {{ emailMessage }}
          </p>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-[#8a7360] text-sm font-medium mb-2">Password</label>
          <input type="password" id="password" v-model="password" required
                 class="w-full px-3 py-2 border border-[#e6e0db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e46d0c]">
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block text-[#8a7360] text-sm font-medium mb-2">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required
                 class="w-full px-3 py-2 border border-[#e6e0db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e46d0c]">
          <p v-if="passwordMismatch" class="mt-1 text-sm text-red-500">
            비밀번호가 일치하지 않습니다.
          </p>
        </div>
        <button type="submit" 
                class="w-full bg-[#e46d0c] text-white py-2 px-4 rounded-md hover:bg-[#c45a0a] transition duration-300"
                :disabled="!isFormValid"
                :class="{'opacity-50 cursor-not-allowed': !isFormValid}">
          회원가입
        </button>
      </form>
    </div>
  </div>
</template>