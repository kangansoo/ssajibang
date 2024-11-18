import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    isLoggedIn: false
  }),

  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      this.isLoggedIn = true;
    },

    clearUserInfo() {
      this.userInfo = null;
      this.isLoggedIn = false;
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        paths: ['userInfo', 'isLoggedIn'] // 세션 스토리지에 저장할 state 지정
      }
    ]
  }
});
