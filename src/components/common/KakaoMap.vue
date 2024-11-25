<script setup>
import { ref, onMounted } from 'vue';
import { KakaoMap, KakaoMapInfoWindow, KakaoMapMarker } from 'vue3-kakao-maps';
import { debounce } from 'lodash';
import { localAxios } from '@/util/http-commons';
import { useRoute } from 'vue-router';
import { useMapStore } from '@/stores/map';

const map = ref();
const infoLat = ref(35.20417749784532);
const infoLng = ref(126.81108903431071);
const content = ref('');
const infoVisible = ref(false);
const markers = ref([]);
const level = ref(6);

const mapStore = useMapStore();
const route = useRoute();

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  const mapTypeControl = new kakao.maps.MapTypeControl();
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  fetchMarkers(); // 초기 마커 로드

  kakao.maps.event.addListener(map.value, 'idle', debounce(() => {
    fetchMarkers(); // 지도 이동 시 마커 갱신
  }, 300));
};

const fetchMarkers = async () => {
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
        bCode: route.query.bCode || '', // bCode를 쿼리에서 가져옴
      },
    });

    mapStore.updateMapData(response.data);
    markers.value = response.data.homeList.map(item => ({
      lat: item.lat,
      lng: item.lng,
    }));
  } catch (error) {
    console.error('마커 데이터를 불러오는 데 실패했습니다:', error);
  }
};
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
