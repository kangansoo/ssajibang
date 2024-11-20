import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import LoginView from '@/views/LoginView.vue';
import SignUp from '@/views/SignUp.vue';
import WriteArticle from '@/views/WriteArticle.vue';
import MyPage from '@/views/MyPage.vue';
import ChattingView from '@/views/ChattingView.vue';
import NoticeView from '@/views/NoticeView.vue';

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
      component: WriteArticle
    },
    {
      path: '/user/:userId',
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

export default router
