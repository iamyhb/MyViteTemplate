import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import '@/style/base/normalize/normalize.css'
import '@/style/index.scss'
import Mui from './components'

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(Mui).mount('#app')
