<script setup>
import { ref, watch, onMounted } from "vue";

const map = ref(null);
const positions = ref([]);
const markers = ref([]);

const props = defineProps({ 
  stations: Array, 
  selectStation: Object,
  searchQuery: String
});

watch(() => props.selectStation, (newStation) => {
  if (newStation && map.value) {
    const moveLatLon = new kakao.maps.LatLng(newStation.lat, newStation.lng);
    map.value.panTo(moveLatLon);
  }
}, { deep: true });

watch(() => props.searchQuery, (newQuery) => {
  if (newQuery && map.value) {
    searchLocation(newQuery);
  }
});

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

watch(() => props.stations, (newStations) => {
  if (newStations && newStations.length > 0) {
    positions.value = newStations.map(station => ({
      latlng: new kakao.maps.LatLng(station.lat, station.lng),
      title: station.name
    }));
    loadMarkers();
  }
}, { deep: true });

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표로 변경
    level: 3,
  };
  map.value = new kakao.maps.Map(container, options);
};

const loadMarkers = () => {
  deleteMarkers();
  markers.value = positions.value.map(position => {
    const marker = new kakao.maps.Marker({
      map: map.value,
      position: position.latlng,
      title: position.title,
      clickable: true,
    });

    // 마커 클릭 이벤트 추가
    kakao.maps.event.addListener(marker, 'click', () => {
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${position.title}</div>`
      });
      infowindow.open(map.value, marker);
    });

    return marker;
  });

  if (markers.value.length > 0) {
    const bounds = new kakao.maps.LatLngBounds();
    markers.value.forEach(marker => bounds.extend(marker.getPosition()));
    map.value.setBounds(bounds);
  }
};

const deleteMarkers = () => {
  markers.value.forEach(marker => marker.setMap(null));
  markers.value = [];
};

const searchLocation = (query) => {
  const ps = new kakao.maps.services.Places();
  ps.keywordSearch(query, (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const bounds = new kakao.maps.LatLngBounds();
      const newPositions = data.map(item => ({
        latlng: new kakao.maps.LatLng(item.y, item.x),
        title: item.place_name
      }));
      positions.value = newPositions;
      loadMarkers();
    }
  });
};
</script>

<template>
  <div id="map" class="flex flex-grow w-full h-full"></div>
</template>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>