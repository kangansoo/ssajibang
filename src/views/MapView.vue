<script setup>
import { ref } from "vue"

import VKakaoMap from "@/components/common/VKakaoMap.vue"


const chargingStations = ref([])
const selectStation = ref({})


</script>

<template>
  <div class="flex-grow flex">
    <VKakaoMap
      :stations="chargingStations"
      :selectStation="selectStation"
    />
  </div>
</template>

<style>
mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}
</style>
