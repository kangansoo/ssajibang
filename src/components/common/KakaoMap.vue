<script setup>
import { ref, onMounted } from 'vue';
import { KakaoMap, KakaoMapInfoWindow, KakaoMapMarker } from 'vue3-kakao-maps';
import { debounce } from 'lodash';
import { localAxios } from '@/util/http-commons';

// 첨부된 JSON 파일 import (경로는 실제 파일 위치에 맞게 조정해주세요)
import sido from '@/assets/polygon/sido.json';
import sig from '@/assets/polygon/sig.json';
import emd from '@/assets/polygon/emd.json';

const map = ref();
const infoLat = ref(35.20417749784532);
const infoLng = ref(126.81108903431071);
const content = ref('');
const infoVisible = ref(false);
const markers = ref([]);
const level = ref(6);
const poligonLevel= ref();

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  const mapTypeControl = new kakao.maps.MapTypeControl();
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  displayAreas();

  kakao.maps.event.addListener(map.value, 'idle', debounce(() => {
    fetchMarkers();
    const bounds = map.value.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    level.value = map.value.getLevel();
    console.log(`남서쪽 좌표: ${sw.getLat()}, ${sw.getLng()}`);
    console.log(`북동쪽 좌표: ${ne.getLat()}, ${ne.getLng()}`);
    console.log("level: ", level);
    console.log('현재 마커 목록:', markers.value);

  }, 300));
};

const displayAreas = () => {
  if(level.value>=10){
    poligonLevel.value = sido;
  } else if(level.value>=6){
    poligonLevel.value = sig;
  }
  poligonLevel.value.features.forEach(feature => {
    const coordinates = feature.geometry.coordinates[0];
    const path = coordinates.map(coord => new kakao.maps.LatLng(coord[1], coord[0]));

    const polygon = new kakao.maps.Polygon({
      path: path,
      strokeWeight: 2,
      strokeColor: '#004c80',
      strokeOpacity: 0.8,
      fillColor: '#fff',
      fillOpacity: 0.01
    });

    polygon.setMap(map.value);

    const area = Math.floor(polygon.getArea());
    const name = feature.properties.SIG_KOR_NM;

    kakao.maps.event.addListener(polygon, 'click', function(mouseEvent) {
      infoLat.value = mouseEvent.latLng.getLat();
      infoLng.value = mouseEvent.latLng.getLng();
      content.value = `${name}의 총 면적 : 약 ${area.toLocaleString()}m<sup>2</sup>`;
      infoVisible.value = true;
    });
  });
};

const fetchMarkers = async () => {
  console.log('fetchMarkers 호출됨');
  const bounds = map.value.getBounds();
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();

  try {
    const response = await localAxios().get('/home/dabang', {
      params: {
        neLat: ne.getLat(),
        neLng: ne.getLng(),
        swLat: sw.getLat(),
        swLng: sw.getLng(),
      }
    });
    console.log('마커 데이터:', response.data);
    // 기존 마커 제거
    markers.value.forEach(marker => marker.setMap(null));
    markers.value = [];

    // 새 마커 생성
    response.data.forEach(item => {
      markers.value.push({
        lat: item.lat,
        lng: item.lng
      });
    });
  } catch (error) {
    console.error('마커 데이터를 불러오는 데 실패했습니다:', error);
  }
};

onMounted(() => {
  if (map.value) {
    displayAreas();
  }
});
</script>

<template>
  <KakaoMap
    :lat="infoLat"
    :lng="infoLng"
    :level="6"
    @onLoadKakaoMap="onLoadKakaoMap"
    style="width:100%; height:100%"
  >
    <KakaoMapInfoWindow
      :lat="infoLat"
      :lng="infoLng"
      :visible="infoVisible"
      :content="content"
      :zIndex="5"
    />
    <KakaoMapMarker
      v-for="(marker, index) in markers"
      :key="index"
      :lat="marker.lat"
      :lng="marker.lng"
    />
  </KakaoMap>
</template>
