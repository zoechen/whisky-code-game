import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import store from './store'
import router from './router'

const app = createApp(App)
app.use(Antd)
app.use(store)
app.use(router)
app.mount('#app')
