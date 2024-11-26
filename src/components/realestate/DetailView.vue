<script setup>
import { computed } from 'vue';
import { useMapStore } from '@/stores/map';
import { useChatStore } from '@/stores/chat';

const props = defineProps({
  selectedId: {
    type: Number,
    default: null
  }
});

const mapStore = useMapStore();
const chatStore = useChatStore();

const currentTab = computed(() => mapStore.tab); // 현재 탭 확인

const selectedItem = computed(() => {
  return mapStore.homeList.find(item => item.id === props.selectedId);
});

const formatPrice = (price) => {
  return price.toLocaleString('ko-KR');
};

const handleContactAuthor = () => {
  if (selectedItem.value) {
    const { name } = selectedItem.value.member; // 작성자 이름
    const existingChat = chatStore.chatList.find(chat => chat.name === name);

    // 이미 채팅방이 있으면 해당 채팅방을 열기
    if (existingChat) {
      chatStore.selectChat(existingChat);
    } else {
      // 새로운 채팅방 추가
      const newChat = {
        id: Date.now(), // 고유한 ID 생성
        name,
        lastMessage: '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      chatStore.chatList.push(newChat);
      chatStore.selectChat(newChat); // 새 채팅방 선택
    }
    // 채팅 창 열기
    chatStore.toggleChat(true); // ChatWindow 열기 상태 전달
  }
};

</script>

<template>
  <div v-if="selectedItem" class="flex flex-col w-full h-[full-80px] p-4 pb-0 border-r overflow-y-auto scroll relative align-center relative">
    <div class="w-[300px] h-[300px]">
      <!-- 이미지 -->
      <img
        :src="currentTab === 'normal' ? selectedItem.img : selectedItem.imgList[0]?.url"
        alt="매물 이미지"
        class="w-full h-64 object-cover mb-4 rounded"
      />
    </div>
    <p class="text-xs">{{ selectedItem.address }}</p>
    <h2 class="text-2xl font-bold mb-1">
      {{ selectedItem.rentType === 'YEARLY_RENT' ? '전세' : '월세' }}:
      <span v-if="selectedItem.rentType === 'YEARLY_RENT'">
        {{ formatPrice(selectedItem.deposit) }}만원
      </span>
      <span v-else>
        {{ formatPrice(selectedItem.deposit) }}/{{ formatPrice(selectedItem.monthlyRent) }}만원
      </span>
    </h2>
    <p class="mb-2 text-sm">관리비: {{ formatPrice(selectedItem.maintenanceCost) }}만원</p>
    <p v-if="currentTab === 'ssafy'" class="text-sm text-gray-600 mb-2">작성자: {{ selectedItem.member.name }}</p>

    <hr>
    <p class="text-sm mt-2 mb-2">{{ selectedItem.title }}</p>
    <p class="mb-2 text-sm">{{ selectedItem.roomType }} | {{ selectedItem.exclusiveArea }}㎡ | {{ selectedItem.floor }}층</p>
    <p class="mb-2 text-sm">방 개수: {{ selectedItem.roomCnt }}</p>
    <p class="mb-2 text-sm">화장실 개수: {{ selectedItem.bathroomCnt }}</p>
    <p class="mb-2 text-sm">방향: {{ selectedItem.direction }}</p>
    <p class="mb-2 text-sm">입주 가능일: {{ selectedItem.availableFrom }}</p>
    <p class="mb-2 text-sm">건물 유형: {{ selectedItem.homeType }}</p>
    <p v-if="currentTab === 'ssafy'" class="text-wrap">{{ selectedItem.content }}</p>
    <div class="sticky h-[70px] mt-2 bottom-0 left-0 right-0 p-4 bg-white border-t"
        v-if="currentTab === 'ssafy'">
      <button @click="handleContactAuthor" class="w-full py-2 bg-[#e46d0c] text-white rounded hover:bg-[#e4830c] transition duration-300">작성자에게 문의하기</button>
    </div>
  </div>
  <div v-else class="flex items-center justify-center h-full">
    <p class="text-xl text-gray-500">매물을 선택해주세요</p>
  </div>
</template>


<style scoped>
.scroll::-webkit-scrollbar {
    width: 5px;  /* 스크롤바의 너비 */
}

.scroll::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #d4d4d4; /* 스크롤바의 색상 */
    border-radius: 10px;
}

.scroll::-webkit-scrollbar-track {
    background: none;  /*스크롤바 뒷 배경 색상*/
}
</style>
