<script setup>
import { computed, ref, watch, defineExpose } from 'vue';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import { debounce } from 'lodash';
import { localAxios } from '@/util/http-commons';
import { useRoute } from 'vue-router';
import { useMapStore } from '@/stores/map';

const map = ref();
const markers = ref([]);
const mapStore = useMapStore();
const route = useRoute();

const currentPage = computed(() => mapStore.currentPage);
const currentTab = computed(() => mapStore.tab); // 현재 탭 확인

// 데이터 조회 함수
const fetchMarkers = async () => {
  console.log("fetchMarkers 실행", { currentPage: currentPage.value, currentTab: currentTab.value });
  const bounds = map.value.getBounds();
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();

  const endpoint = currentTab.value === 'normal' ? '/home/dabang' : '/home/ssafy'; // 탭에 따른 엔드포인트

  try {
    const response = await localAxios().get(endpoint, {
      params: {
        page: currentPage.value,
        neLat: ne.getLat(),
        neLng: ne.getLng(),
        swLat: sw.getLat(),
        swLng: sw.getLng(),
        bCode: route.query.bCode || '',
      },
    });

    console.log("응답데이터: ", response.data);
    mapStore.updateMapData(response.data);

    markers.value = response.data.homeList.map((item) => ({
      lat: item.lat,
      lng: item.lng,
      id: item.id,
    }));
  } catch (error) {
    console.error('Failed to fetch marker data:', error);
  }
};

watch(() => [currentPage.value, currentTab.value], fetchMarkers); // 탭 변경 시 데이터 새로 가져오기

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  const mapTypeControl = new kakao.maps.MapTypeControl();
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  fetchMarkers();

  kakao.maps.event.addListener(map.value, 'idle', debounce(fetchMarkers, 300));
};

defineExpose({
  moveToMarker: ({ lat, lng }) => {
    if (map.value) {
      const center = new kakao.maps.LatLng(lat, lng);
      map.value.setCenter(center);
    }
  },
});
</script>

<template>
  <KakaoMap
    :lat="35.20417749784532"
    :lng="126.81108903431071"
    :level="6"
    @onLoadKakaoMap="onLoadKakaoMap"
    style="width:100%; height:100%"
  >
    <KakaoMapMarker
      v-for="(marker, index) in markers"
      :key="index"
      :lat="marker.lat"
      :lng="marker.lng"
    />
  </KakaoMap>
</template>
