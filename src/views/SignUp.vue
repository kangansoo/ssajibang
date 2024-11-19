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
const emailVeified = ref(false);
const verificationCode = ref('');
const isVerificationSent = ref(false);
const remainingTime = ref(180); // 3분 = 180초
const isTimerRunning = ref(false);
let timerInterval;

const passwordMismatch = computed(() => {
  return password.value && confirmPassword.value && password.value !== confirmPassword.value;
});

const isFormValid = computed(() => {
  return name.value && email.value && password.value &&
         confirmPassword.value && !passwordMismatch.value && !emailError.value &&
         isEmailChecked.value && emailVeified.value;
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

    emailMessage.value = '사용 가능한 이메일입니다.';
    emailError.value = false;
    isEmailChecked.value = true;
    console.log('서버 응답 상태 코드:', response.status);
  } catch (error) {
    if (error.response) {
      console.log('서버 응답 상태 코드:', error.response.status);
      if (error.response.status === 400) {
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
    }
  }
};

const handleEmailChange = () => {
  isEmailChecked.value = false;
  emailMessage.value = '';
};

const verifyEmail = async () => {
  if (isEmailChecked.value) {
    try {
      const response = await localAxios().post('/members/send-verification', {
        email: email.value
      });
      console.log("response: ", response);
      alert(`'${email.value}'으로 인증 번호를 발송하였습니다.\n 3분 이내에 인증 번호를 입력해주세요.`);
      isVerificationSent.value = true;
      startTimer();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.status);
      } else if(error.response && error.response.status === 500){
        console.log(error.response.status);
      }
    }
  }
};

const startTimer = () => {
  isTimerRunning.value = true;
  timerInterval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      clearInterval(timerInterval);
      isTimerRunning.value = false;
    }
  }, 1000);
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const submitVerificationCode = async () => {
  try {
    const response = await localAxios().post('/members/verify-code', {
      email: email.value,
      code: verificationCode.value
    });
    if (response.status === 200) {
      alert('이메일 인증이 완료되었습니다.');
      emailVeified.value = true;
      clearInterval(timerInterval);
      isTimerRunning.value = false;
    }
  } catch (error) {
    console.error('인증 코드 확인 중 오류 발생:', error);
    alert('인증 코드가 올바르지 않습니다. 다시 시도해주세요.');
  }
};
</script>

<template>
  <div class="flex flex-grow min-h-screen bg-[#f7f4f0] items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">
      <h2 class="text-[#181411] text-2xl font-bold mb-6 text-center">회원가입</h2>
      <form @submit.prevent="handleSignUp">
        <div class="mb-4">
          <label for="name" class="block text-[#8a7360] text-sm font-medium mb-2">Name</label>
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
                    class="bg-[#e46d0c] text-white px-4 py-2 rounded-r-md hover:bg-[#c45a0a] transition duration-300"
                    v-if="!isEmailChecked">
              Check
            </button>
            <button v-else-if="!isVerificationSent"
                    class="bg-[#e46d0c] text-white px-4 py-2 rounded-r-md hover:bg-[#c45a0a] transition duration-300"
                    @click.prevent="verifyEmail">
              이메일 인증하기
            </button>
            <button v-else
                    class="bg-gray-400 text-white px-4 py-2 rounded-r-md cursor-not-allowed"
                    disabled>
              인증번호 전송됨
            </button>
          </div>
          <p v-if="emailMessage" :class="{'text-green-500': !emailError, 'text-red-500': emailError}" class="mt-1 text-sm">
            {{ emailMessage }}
          </p>
        </div>

        <!-- 이메일 인증 코드 입력 섹션 -->
        <div v-if="isVerificationSent" class="mb-4">
          <label for="verificationCode" class="block text-[#8a7360] text-sm font-medium mb-2">
            인증 코드 입력
            <span v-if="isTimerRunning" class="text-red-500 ml-2">{{ formatTime(remainingTime) }}</span>
          </label>
          <div class="flex">
            <input type="text" id="verificationCode" v-model="verificationCode"
                   :disabled="!isTimerRunning"
                   class="flex-grow px-3 py-2 border border-[#e6e0db] rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#e46d0c]">
            <button @click.prevent="submitVerificationCode"
                    :disabled="!isTimerRunning || !verificationCode"
                    class="bg-[#e46d0c] text-white px-4 py-2 rounded-r-md hover:bg-[#c45a0a] transition duration-300"
                    :class="{'opacity-50 cursor-not-allowed': !isTimerRunning || !verificationCode}">
              확인
            </button>
          </div>
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
