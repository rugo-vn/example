import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import RugoVue from '@rugo-vn/vue';
import router from './router';

import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(RugoVue);
app.use(router);

app.mount('#app');
