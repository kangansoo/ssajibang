<script setup>
import { useRouter } from 'vue-router';
import { useAutocomplete } from '@/components/composables/useAutocomplete.js';
import { ref } from 'vue';
import { localAxios } from '@/util/http-commons';

const router = useRouter();
const backgroundImage = "https://cdn.usegalileo.ai/sdxl10/6f50d5fa-a305-4a75-a19f-ca514dd6cfc0.png";

const { searchQuery, suggestions } = useAutocomplete();
const bCode = ref(''); // 선택된 동의 bCode를 저장

// 자동완성 항목 클릭 시 처리 로직
const selectSuggestion = async (suggestion) => {
  // 마지막 공백 뒤 문자열 추출
  const location = suggestion.trim().split(' ').pop();
  console.log("location:", location);
  searchQuery.value = suggestion; // UI 업데이트 (선택된 전체 문자열 표시)
  suggestions.value = []; // 자동완성 목록 숨기기

  try {
    // 동 이름(location)으로 bCode 요청
    const response = await localAxios().get('/home/search', {
      params: { location },
    });

    console.log('response: ', response.data[0])

    if (response.data[0] && response.data[0].bcode) {
      bCode.value = response.data.bCode; // bCode 업데이트
      // 이후 로직 처리 (예: 지도로 이동)
      router.push({ name: 'Map', query: { bCode: bCode.value } });
    } else {
      alert('해당 지역의 데이터를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('Error fetching bCode:', error);
    alert('bCode를 가져오는 데 실패했습니다.');
  }
};

// 강조된 검색어 표시
const highlightMatch = (suggestion) => {
  const query = searchQuery.value.trim();
  if (!query) return suggestion; // 검색어가 없으면 강조하지 않음

  // 검색어를 강조(주황색)하여 반환
  const regex = new RegExp(`(${query})`, 'gi');
  return suggestion.replace(regex, '<span class="text-orange-500">$1</span>');
};
</script>

<template>
  <div class="@container">
    <div class="@[480px]:p-4">
      <div
        class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
        :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('${backgroundImage}')` }">
        <h1
          class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] text-center">
          Find your SSAFY dream home
        </h1>
        <label class="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
          <div class="flex w-full flex-1 items-stretch rounded-xl h-full relative">
            <div
              class="text-[#8a7360] flex border border-[#e6e0db] bg-white items-center justify-center pl-[15px] rounded-l-xl border-r-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor"
                viewBox="0 0 256 256">
                <path
                  d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
                </path>
              </svg>
            </div>
            <input v-model="searchQuery" placeholder="시, 구, 동을 검색해보세요"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181411] focus:outline-0 focus:ring-0 border border-[#e6e0db] bg-white focus:border-[#e6e0db] h-full placeholder:text-[#8a7360] px-[15px] border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal" />
            <!-- 자동 완성 제안 목록 -->
            <ul v-if="suggestions.length > 0"
              class="absolute z-10 mt-[64px] w-full bg-white border border-gray-300 rounded-md shadow-lg">
              <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <span v-html="highlightMatch(suggestion)"></span>
              </li>
            </ul>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
