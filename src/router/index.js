import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import LoginView from '@/views/LoginView.vue';
import SignUp from '@/views/SignUp.vue';
import WritePost from '@/views/WritePost.vue';
import MyPage from '@/views/MyPage.vue';
import ChattingView from '@/views/ChattingView.vue';
import NoticeView from '@/views/NoticeView.vue';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/map',
      name: 'Map',
      component: MapView
    },
    {
      path:'/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/write',
      name: 'write',
      component: WritePost
    },
    {
      path: '/mypage',
      name: 'mypage',
      // beforeEnter: onlyAuthUser,
      component: MyPage
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChattingView
    },
    {
      path: '/notice',
      name: 'notice',
      component: NoticeView
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const requiresAuth = ['write', 'mypage', 'chat']; // 인증이 필요한 라우트 이름 목록

  if (requiresAuth.includes(to.name) && !userStore.isLogin) {
    next({ path: '/login', query: { redirect: to.fullPath } }); // 로그인 페이지로 리디렉션
  } else {
    next(); // 인증이 필요하지 않거나 로그인 상태일 경우 이동 허용
  }
});

export default router
