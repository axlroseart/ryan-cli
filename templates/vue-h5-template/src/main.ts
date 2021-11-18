import { createApp } from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import { store } from './store';

const app = createApp(App);

app.config.globalProperties.$http = axios;

app.use(router).use(store).mount('#app');
