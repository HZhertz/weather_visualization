import { createApp } from 'vue'
import '@/styles/index.scss'
import BaiduMap from 'vue-baidu-map-3x'
import App from './App.vue'

const app = createApp(App)

app.use(BaiduMap, {
  ak: '8o7llNfxxs3UgPU1ohQirdQta9kCEpjB', //使用自己的ak
})

app.mount('#app')
