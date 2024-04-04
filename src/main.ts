import { createApp } from 'vue'
import '@/styles/index.scss'
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap'
import VueAMapLoca from '@vuemap/vue-amap-loca'
import '@vuemap/vue-amap/dist/style.css'
initAMapApiLoader({
  key: '69836c4a9c3cbaaa6420135136f143d3', // 使用自己的key
  securityJsCode: '905038a9c4095309db7ef7369aec3eee', // 新版key需要配合安全密钥使用
  Loca: {
    version: '2.0.0',
  }, // 如果需要使用loca组件库，需要加载Loca
})

import App from './App.vue'

const app = createApp(App)
app.use(VueAMap)
app.use(VueAMapLoca)

app.mount('#app')
