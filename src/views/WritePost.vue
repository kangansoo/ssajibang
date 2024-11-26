<script setup>
// import Editor from 'primevue/editor';
import { VueDaumPostcode } from "vue-daum-postcode";
import { ref } from 'vue';
import { localAxios } from '@/util/http-commons';
import { VueSpinner } from 'vue3-spinners';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const isLoading = ref(false);

const jibun = ref(null);
const roadName = ref(null);
const postOpen = ref(false);
const sido = ref(null);
const sigungu = ref(null);
const dong = ref(null);
const rentType = ref('');
const houseType = ref('');
const deposit = ref('');
const monthlyRent = ref('');
const maintenanceCost = ref('');
const title = ref('');
const content = ref('');
const roomType = ref('');
const exclusiveArea = ref('');
const floor = ref('');
const roomCnt = ref('');
const bathroomCnt = ref('');
const direction = ref('');
const expirationDate = ref('');
const availableFrom = ref('');
const constructionYear = ref('');
const images = ref([]);
const aiContent = ref('');

const directionOptions = ['동', '서', '남', '북', '남동', '남서', '북동', '북서'];
const homeTypeOptions = ['빌라', '단독주택', '오피스텔', '연립다세대'];
const roomTypeOptions = ['원룸', '원룸(분리형)', '원룸(복층)', '투룸', '투룸(복층)', '오피스텔', '오피스텔(분리형)', '오피스텔(복층)', '아파트'];

const search = () => {
  postOpen.value = true;
};

const oncomplete = (result) => {
  roadName.value = result.roadAddress;
  jibun.value = result.jibunAddress;
  sido.value = result.sido;
  sigungu.value = result.sigungu;
  dong.value = result.bname;
  postOpen.value = false;
  console.log(result);
};

const generateContent = async () => {
  isLoading.value=true;
  try{
    const homeReq = {
      address: jibun.value,
      rentType: rentType.value === '전세' ? 'YEARLY_RENT' : 'MONTHLY_RENT',
      deposit: Number(deposit.value),
      monthlyRent: Number(monthlyRent.value),
      maintenanceCost: Number(maintenanceCost.value),
      title: title.value,
      content: content.value,
      roomType: roomType.value,
      exclusiveArea: Number(exclusiveArea.value),
      floor: Number(floor.value),
      roomCnt: Number(roomCnt.value),
      bathroomCnt: Number(bathroomCnt.value),
      direction: direction.value,
      expirationDate: expirationDate.value,
      availableFrom: availableFrom.value,
      homeType: houseType.value,
      constructionYear: Number(constructionYear.value)
    };

    const response = await localAxios().post('/home/ssafy/content-ai-generation', homeReq);
    aiContent.value = response.data; // AI 응답 데이터 처리
    content.value = aiContent.value; // textarea에 값 할당
    $q.notify({ type: 'positive', message: 'AI로 작성된 내용을 추가했습니다.' });
  } catch (error) {
    console.error('AI 작성 오류:', error);
    $q.notify({ type: 'negative', message: 'AI로 설명 작성 중 오류가 발생했습니다.' });
  } finally {
    isLoading.value = false;
    // spinner.hide();
  }
}

const submitPost = async () => {
  if(!isLoading.value){
    try {
      const homeReq = {
        address: jibun.value,
        rentType: rentType.value === '전세' ? 'YEARLY_RENT' : 'MONTHLY_RENT',
        deposit: Number(deposit.value),
        monthlyRent: Number(monthlyRent.value),
        maintenanceCost: Number(maintenanceCost.value),
        title: title.value,
        content: content.value,
        roomType: roomType.value,
        exclusiveArea: Number(exclusiveArea.value),
        floor: Number(floor.value),
        roomCnt: Number(roomCnt.value),
        bathroomCnt: Number(bathroomCnt.value),
        direction: direction.value,
        expirationDate: expirationDate.value,
        availableFrom: availableFrom.value,
        homeType: houseType.value,
        constructionYear: Number(constructionYear.value)
      };

      const formData = new FormData();
      formData.append('homeReq', JSON.stringify(homeReq));

      images.value.forEach((image, index) => {
        formData.append('images', dataURLtoFile(image, `image${index}.jpg`));
      });

      const response = await localAxios().post('/home/ssafy', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

      console.log("Response: ", response.data);
      $q.dialog({
        title: '매물 작성 완료',
        message: '매물이 성공적으로 등록되었습니다!',
        ok: '확인',
      }).onOk(() => {
        router.push('/');
      });
    } catch (error) {
      console.error('게시물 제출 중 오류 발생:', error);
      $q.notify({
        type: 'negative',
        message: '매물 등록 중 오류가 발생했습니다.'
      });
    }
  }
};

const onFileChange = (e) => {
  const files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (e) => {
      images.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

// Data URL을 File 객체로 변환하는 함수
const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
};
</script>

<template>
  <div class="flex flex-grow bg-[#f7f4f0] items-center justify-center px-4 py-8 z-index:1">
    <div class="w-full max-w-6xl h-fit bg-white rounded-xl shadow-md px-8 py-12 flex flex-col relative">
      <div v-if="postOpen" class="post-box absolute top-0 left-0 w-full h-full bg-white z-50">
        <VueDaumPostcode @complete="oncomplete" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <label class="block mb-2">주소</label>
          <div class="relative">
            <input type="text" v-model="roadName" readonly placeholder="클릭하여 주소 검색" @click="search"
              class="w-full p-2 border rounded cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors">
          </div>
        </div>

        <div>
          <label class="block mb-2">제목</label>
          <input v-model="title" type="text" class="w-full p-2 border rounded">
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
            <option v-for="type in homeTypeOptions" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-2">방 유형</label>
          <select v-model="roomType" class="w-full p-2 border rounded">
            <option v-for="type in roomTypeOptions" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-2">전용 면적 (m²)</label>
          <input v-model="exclusiveArea" type="number" class="w-full p-2 border rounded">
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
          <label class="block mb-2">관리비 (만원)</label>
          <input v-model="maintenanceCost" type="number" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block mb-2">층</label>
          <input v-model="floor" type="number" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block mb-2">방 개수</label>
          <input v-model="roomCnt" type="number" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block mb-2">화장실 개수</label>
          <input v-model="bathroomCnt" type="number" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block mb-2">방향</label>
          <select v-model="direction" class="w-full p-2 border rounded">
            <option v-for="dir in directionOptions" :key="dir" :value="dir">{{ dir }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-2">계약 만료일</label>
          <input v-model="expirationDate" type="date" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block mb-2">입주 가능일</label>
          <input v-model="availableFrom" type="date" class="w-full p-2 border rounded">
        </div>
      </div>

      <div class="mt-6">
        <label class="block mb-2">상세 설명</label>
        <textarea
          v-model="content"
          placeholder="AI의 도움을 받아 매물 작성을 완료해보세요!"
          class="w-full h-[300px] p-2 border rounded resize-none scroll"
          rows="6"
        ></textarea>
      </div>

      <div class="mt-6">
        <label class="block mb-2">이미지 첨부</label>
        <input type="file" @change="onFileChange" multiple accept="image/*" class="w-full p-2 border rounded">
      </div>

      <div v-if="images.length > 0" class="mt-4 grid grid-cols-3 gap-4">
        <div v-for="(image, index) in images" :key="index" class="relative">
          <img :src="image" alt="Uploaded image" class="w-full h-32 object-cover rounded">
          <button @click="images.splice(index, 1)" class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs">X</button>
        </div>
      </div>

      <div class="mt-10 flex justify-center gap-4">
        <button
          @click="generateContent"
          class="bg-[#e46d0c] w-[220px] flex justify-center text-white px-4 py-2 rounded shadow hover:bg-[#ff9e4f] transition-colors">
          <template v-if="!isLoading">
            AI로 추가 설명 작성하기
          </template>
          <VueSpinner v-else size="20" color="white"/>
        </button>

        <button
          @click="submitPost"
          class="bg-[#e46d0c] w-[220px] flex justify-center text-white px-4 py-2 rounded shadow hover:bg-[#ff9e4f] transition-colors"
          :disabled="isLoading">
          작성 완료
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll::-webkit-scrollbar {
  width: 5px; /* 스크롤바의 너비 */
}

.scroll::-webkit-scrollbar-thumb {
  height: 30%; /* 스크롤바의 길이 */
  background: #d4d4d4; /* 스크롤바의 색상 */
  border-radius: 10px;
}

.scroll::-webkit-scrollbar-track {
  background: none; /* 스크롤바 뒷 배경 색상 */
}

.scroll {
  cursor: pointer;
}
</style>
