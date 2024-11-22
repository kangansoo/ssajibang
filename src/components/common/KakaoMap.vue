<script setup>
import { KakaoMap } from 'vue3-kakao-maps';
import { ref } from 'vue';

const mapWidth = ref('100%');
const mapHeight = ref('100%');
const lat = ref(35.20417749784532);
const lng = ref(126.81108903431071)
const map = ref();
const idx = ref(0);

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  const mapTypeControl = new kakao.maps.MapTypeControl();
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  // 지도 이동 이벤트 리스너 추가
  kakao.maps.event.addListener(map.value, 'idle', debounce(() => {
    const bounds = map.value.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    console.log(`${idx.value}: 남서쪽 좌표: ${sw.getLat()}, ${sw.getLng()}`);
    console.log(`${idx.value++}:북동쪽 좌표: ${ne.getLat()}, ${ne.getLng()}`);
  }, 300));
};

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
</script>

<template>
  <KakaoMap
    :lat="lat"
    :lng="lng"
    :width="mapWidth"
    :height="mapHeight"
    :level="4"
    @onLoadKakaoMap="onLoadKakaoMap" />
</template>
