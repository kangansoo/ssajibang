<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleLogout = async () => {
  try {
    await userStore.logout(); // userStore의 logout 메서드 호출
    isOpen.value = false;
    router.push("/");
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    // 여기에 사용자에게 오류 메시지를 표시하는 로직을 추가할 수 있습니다.
  }
};

const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>

<template>
  <div class="relative z-10" ref="dropdownRef">
    <button id="memberName" @click.stop="toggleMenu" class="text-sm text-[#181411] cursor-pointer font-semibold hover:underline">
      {{ userStore.userInfo.name }}님 안녕하세요
    </button>
    <div v-if="isOpen" class="absolute right-0 mt-2 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg">
      <div class="py-2 h-[150px] flex flex-col justify-between">
        <RouterLink to="/chat" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          내 채팅
        </RouterLink>
        <RouterLink to="/mypage" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          마이페이지
        </RouterLink>
        <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
          로그아웃
        </button>
      </div>
    </div>
  </div>
</template>
