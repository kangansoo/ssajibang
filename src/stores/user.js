import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { localAxios } from '@/util/http-commons';

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false);
  const isLoginError = ref(false);
  const userInfo = ref(null);
  const isValidToken = ref(false);

  const setUserInfo = (info) => {
    userInfo.value = info;
    isLogin.value = true;
  };

  const setLoginState = (state) => {
    isLogin.value = state;
  };

  const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      try {
        const response = await localAxios().get(`/user/info/${decodedToken.userId}`);
        if (response.status === 200) {
          setUserInfo(response.data.userInfo);
          isValidToken.value = true;
        } else {
          useUserStore.logout();
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
        isValidToken.value = false;
        // 토큰 재발급 로직 추가 필요
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    userInfo.value = null;
    isLogin.value = false;
    isValidToken.value = false;
  };

  return {
    isLogin,
    isLoginError,
    userInfo,
    isValidToken,
    setUserInfo,
    setLoginState,
    setAccessToken,
    getUserInfo,
    logout
  };
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['isLogin', 'userInfo']
      }
    ]
  }
});
