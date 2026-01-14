import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index' // ← index.js 자동 인식

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')