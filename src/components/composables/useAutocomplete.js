import { ref, watch } from 'vue';
import { debounce } from 'lodash';
import { localAxios } from '@/util/http-commons'; // 경로 조정 필요

export function useAutocomplete(minChars = 1, debounceMs = 300) {
  const searchQuery = ref('');
  const suggestions = ref([]);
  const isLoading = ref(false);

  // 비동기 요청 함수
  const fetchSuggestions = async (query) => {
    if (!query.trim() || query.length < minChars) {
      suggestions.value = [];
      return;
    }

    isLoading.value = true;
    try {
      const response = await localAxios().get('/home/search', {
        params: { location: query.trim() },
      });

      // location 값만 추출
      suggestions.value = response.data.map(item => item.location);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      suggestions.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  // 디바운스된 함수 생성
  const debouncedFetchSuggestions = debounce(fetchSuggestions, debounceMs);

  // searchQuery를 감시
  watch(searchQuery, (newQuery) => {
    debouncedFetchSuggestions(newQuery); // 최신 입력값 전달
  });

  return {
    searchQuery,
    suggestions,
    isLoading,
  };
}
