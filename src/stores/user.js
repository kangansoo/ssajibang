import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false);
  const userInfo = ref(null);
  const isValidToken = ref(false);

  const router = useRouter();  // useRouter 가져오기

  // setUserInfo 함수를 return 객체에 포함시켜야 합니다
  const setUserInfo = (info) => {
    userInfo.value = info;
    isLogin.value = true;
  };

  const initUserInfo = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken);
        isValidToken.value = true;
        isLogin.value = true;
      } catch (error) {
        console.error('토큰 디코딩 실패:', error);
        logout();
      }
    } else {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    userInfo.value = null;
    isLogin.value = false;
    isValidToken.value = false;

    // 로그아웃 후 '/login' 페이지로 리디렉션
    router.push('/login');
  };

  return {
    isLogin,
    userInfo,
    isValidToken,
    initUserInfo,
    setUserInfo,
    logout,
  };
}, {
  persist: {
    enabled: true,
    strategies: [{
      storage: localStorage,
      paths: ['isLogin'],
    }],
  },
});
