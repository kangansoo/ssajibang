import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import LoginView from '@/views/LoginView.vue';
import SignUp from '@/views/SignUp.vue';

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
  ],
});

export default router
