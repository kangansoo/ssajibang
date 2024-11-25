// src/stores/map.js
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    tab: 'normal',
    currentPage: 1,
    totalPage: 0,
    totalCnt: 0,
    homeList: [],
  }),
  actions: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    updateMapData(data) {
      this.totalPage = data.totalPage;
      this.totalCnt = data.totalCnt;
      this.homeList = data.homeList;
    },
    setTab(tab) {
      if (this.tab !== tab) {
        this.tab = tab;
        this.currentPage = 1; // 탭 변경 시 페이지 초기화
        this.homeList = []; // 기존 데이터 초기화
      }
    },
  },
});

