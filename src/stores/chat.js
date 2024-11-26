import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
  state: () => ({
    chatList: [
      { id: 1, name: '김철수', lastMessage: '안녕하세요!', time: '10:30' },
      { id: 2, name: '이영희', lastMessage: '오늘 회의 몇 시에요?', time: '09:15' },
      { id: 3, name: '박지성', lastMessage: '프로젝트 진행상황 어떤가요?', time: '어제' },
    ],
    currentChat: null,
    messages: [],
    isOpen: false,  // 채팅창 상태
    activeTab: 'home',  // 기본 탭은 'home'
  }),

  actions: {
    // 채팅방 선택
    selectChat(chat) {
      this.currentChat = chat;
      this.messages = []; // 채팅 내용 초기화
    },

    // 메시지 전송
    sendMessage(content) {
      const newMessage = {
        id: this.messages.length + 1,
        sender: '나',
        content: content,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      this.messages.push(newMessage);

      // 마지막 메시지로 채팅 목록 업데이트
      const updatedChatList = this.chatList.map(chat => {
        if (chat.id === this.currentChat.id) {
          return { ...chat, lastMessage: newMessage.content, time: newMessage.time };
        }
        return chat;
      });
      this.chatList = updatedChatList;
    },

    // 채팅 창 열기 / 닫기
    toggleChat(status) {
      this.isOpen = status;
    },
  },
});
