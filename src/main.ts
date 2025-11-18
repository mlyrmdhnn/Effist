import './assets/main.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

app.use(router)
app.use(VueApexCharts)

app.mount('#app')
