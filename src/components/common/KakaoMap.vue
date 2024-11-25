<script setup>
import { computed, ref, watch, defineExpose } from 'vue';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import { debounce } from 'lodash';
import { localAxios } from '@/util/http-commons';
import { useRoute } from 'vue-router';
import { useMapStore } from '@/stores/map';

const map = ref();
const infoLat = ref(35.20417749784532);
const infoLng = ref(126.81108903431071);
const markers = ref([]);
const selectedId = ref(null);  // 선택된 마커의 id

const mapStore = useMapStore();
const currentPage = computed(() => mapStore.currentPage);
const route = useRoute();

const fetchMarkers = async () => {
  const bounds = map.value.getBounds();
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();

  try {
    const response = await localAxios().get('/home/dabang', {
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
    markers.value = response.data.homeList.map(item => ({
      lat: item.lat,
      lng: item.lng,
      id: item.id,
    }));
  } catch (error) {
    console.error('Failed to fetch marker data:', error);
  }
};

watch(() => currentPage.value, fetchMarkers);

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  const mapTypeControl = new kakao.maps.MapTypeControl();
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  fetchMarkers();

  kakao.maps.event.addListener(map.value, 'idle', debounce(() => {
    mapStore.setCurrentPage(1);
    fetchMarkers();
  }, 300));

  kakao.maps.event.addListener(map.value, 'dragend', () => {
    mapStore.setCurrentPage(1);
    fetchMarkers();
  });
};

// 중심 이동 메서드 추가
const moveToMarker = ({ lat, lng }) => {
  if (map.value) {
    const center = new kakao.maps.LatLng(lat, lng);
    map.value.setCenter(center);
  }
};

// 마커 클릭 시 상세 정보 페이지로 이동하는 메서드
const handleMarkerClick = (id) => {
  selectedId.value = id;
  // 마커 클릭 시 해당 id로 이동하는 로직 추가
  moveToMarker({ lat: markers.value.find(marker => marker.id === id).lat, lng: markers.value.find(marker => marker.id === id).lng });
};

defineExpose({
  moveToMarker,
  handleMarkerClick, // 클릭 핸들러 외부 노출
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
    <KakaoMapMarker
      v-for="(marker, index) in markers"
      :key="index"
      :lat="marker.lat"
      :lng="marker.lng"
      @click="handleMarkerClick(marker.id)"
    />
  </KakaoMap>
</template>
