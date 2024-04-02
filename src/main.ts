import { createApp } from 'vue'
import '@/styles/index.scss'
// There are types at 'd:/Project/Vue/weather_visualization/node_modules/vue-baidu-map-3x/types/index.d.ts',
// but this result could not be resolved when respecting package.json "exports".
// The 'vue-baidu-map-3x' library may need to update its package.json or typings.ts(7016)
// 在 vue-baidu-map-3x 包的 package.json 的 "exports""." 中 加上  "types": "./types/index.d.ts"
// import BaiduMap from 'vue-baidu-map-3x'
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap'
import VueAMapLoca from '@vuemap/vue-amap-loca'
import '@vuemap/vue-amap/dist/style.css'
initAMapApiLoader({
  key: '69836c4a9c3cbaaa6420135136f143d3',
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
