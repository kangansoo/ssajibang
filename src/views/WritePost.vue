<script setup>
import Editor from 'primevue/editor';
import { VueDaumPostcode } from "vue-daum-postcode";
import { ref } from 'vue';
import { localAxios } from '@/util/http-commons'; // Axios import

const jibun = ref(null);
const roadName = ref(null);
const postOpen = ref(false);
const buildingName = ref('');
const sido = ref(null);
const sigungu = ref(null);
const dong = ref(null);
const rentType = ref('');
const houseType = ref('');
const area = ref('');
const deposit = ref('');
const monthlyRent = ref('');
const floor = ref('');
const contractDate = ref('');
const constructionYear = ref('');
const content = ref('');
const images = ref([]); // 이미지 배열

const houseTypes = ['빌라', '단독주택', '오피스텔', '원룸'];

// 주소 검색
const search = () => {
  postOpen.value = true;
};

// 주소 검색 완료 후
const oncomplete = (result) => {
  jibun.value = result.jibunAddress;
  roadName.value = result.jibunAddress;
  sido.value = result.sido;
  sigungu.value = result.sigungu;
  dong.value = result.bname;
  postOpen.value = false;
};

// 제출 버튼 클릭 시 API 요청
const submitPost = async () => {
  try {
    const homeReq = {
      address: jibun.value, // 주소
      rentType: rentType.value === '전세' ? 'YEARLY_RENT' : 'MONTHLY_RENT', // 전월세 구분
      deposit: deposit.value, // 보증금
      monthlyRent: monthlyRent.value, // 월세
      maintenanceCost: 0, // 유지비 (추후 추가 필드 필요)
      title: buildingName.value, // 건물 이름을 제목으로 사용
      content: content.value, // 상세 설명
      roomType: houseType.value, // 주택 유형
      exclusiveArea: area.value, // 전용 면적
      floor: floor.value, // 층수
      roomCnt: 0, // 방 개수 (필요한 경우 추가)
      bathroomCnt: 0, // 화장실 개수 (필요한 경우 추가)
      direction: '', // 방향 (필요한 경우 추가)
      expirationDate: contractDate.value, // 계약 만료일
      availableFrom: '', // 입주 가능일 (추후 추가 필드 필요)
      homeType: houseType.value, // 주택 유형
      approvalDate: new Date().toISOString(), // 승인 날짜
    };

    const requestData = {
      homeReq,
      images: images.value, // 이미지 데이터
    };

    // API 요청 보내기
    const response = await localAxios().post('/home/ssafy', requestData);
    console.log("Response: ", response.data);
    // 요청 성공 후 처리 (예: 알림, 페이지 이동 등)
  } catch (error) {
    console.error('게시물 제출 중 오류 발생:', error);
  }
};
</script>

<template>
  <div class="flex flex-grow bg-[#f7f4f0] items-center justify-center px-4 py-8 z-index:1">
    <div class="w-full max-w-6xl h-fit bg-white rounded-xl shadow-md px-8 py-12 flex flex-col relative">
      <!-- 주소 검색 팝업 -->
      <div v-if="postOpen" class="post-box absolute top-0 left-0 w-full h-full bg-white z-50">
        <VueDaumPostcode @complete="oncomplete" />
      </div>

      <!-- 입력 폼 -->
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <label class="block mb-2">주소</label>
          <div class="relative">
            <input type="text" v-model="address" readonly placeholder="클릭하여 주소 검색" @click="search"
              class="w-full p-2 border rounded cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors">
          </div>
        </div>

        <div>
          <label class="block mb-2">건물 이름</label>
          <input v-model="buildingName" type="text" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block mb-2">전월세 구분</label>
          <select v-model="rentType" class="w-full p-2 border rounded">
            <option value="전세">전세</option>
            <option value="월세">월세</option>
          </select>
        </div>

        <div>
          <label class="block mb-2">주택 유형</label>
          <select v-model="houseType" class="w-full p-2 border rounded">
            <option v-for="type in houseTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-2">전용 면적 (m²)</label>
          <input v-model="area" type="number" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block mb-2">보증금 (만원)</label>
          <input v-model="deposit" type="number" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block mb-2">월세 (만원)</label>
          <input v-model="monthlyRent" type="number" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block mb-2">층</label>
          <input v-model="floor" type="number" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block mb-2">계약년월</label>
          <input v-model="contractDate" type="month" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block mb-2">건축 년도</label>
          <input v-model="constructionYear" type="number" class="w-full p-2 border rounded">
        </div>
      </div>

      <div class="mt-6">
        <label class="block mb-2">상세 설명</label>
        <Editor v-model="content" editorStyle="height: 320px" />
      </div>

      <!-- 제출 버튼 -->
      <button @click="submitPost" class="mt-10 bg-[#f7f4f0] max-w-48 h-10 rounded">제출하기</button>
    </div>
  </div>
</template>

<style scoped></style>
