import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import VueDaumPostcode from 'vue-daum-postcode'
import { useKakao } from 'vue3-kakao-maps/@utils';
import _ from 'lodash'
import { Quasar, Notify, Dialog } from 'quasar';
import { VueSpinnersPlugin } from 'vue3-spinners';

const kakaoKey = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;

const app = createApp(App)

app.config.globalProperties.$_ = _
useKakao(kakaoKey);
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
      preset: Aura
  }
});
app.use(VueDaumPostcode)
app.use(Quasar, {
  plugins: {
    Notify,
    Dialog,
  }
})
app.use(VueSpinnersPlugin)
app.mount('#app')
