// src/stores/map.js
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    tab:'normal',
    currentPage: 1,
    totalPage: 0,
    totalCnt: 0,
    homeList: []
  }),
  actions: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    updateMapData(data) {
      this.totalPage = data.totalPage
      this.totalCnt = data.totalCnt
      this.homeList = data.homeList
    },
    setTab(tab){
      this.tab=tab;
    }
  }
})
