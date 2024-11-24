// src/stores/map.js
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    currentPage: 0,
    totalPage: 0,
    totalCnt: 0,
    homeList: []
  }),
  actions: {
    updateMapData(data) {
      this.currentPage = data.currentPage
      this.totalPage = data.totalPage
      this.totalCnt = data.totalCnt
      this.homeList = data.homeList
    }
  }
})