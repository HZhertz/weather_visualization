import { createApp } from 'vue'
import '@/styles/index.scss'
// There are types at 'd:/Project/Vue/weather_visualization/node_modules/vue-baidu-map-3x/types/index.d.ts',
// but this result could not be resolved when respecting package.json "exports".
// The 'vue-baidu-map-3x' library may need to update its package.json or typings.ts(7016)
// 在 vue-baidu-map-3x 包的 package.json 的 "exports""." 中 加上  "types": "./types/index.d.ts"
// import BaiduMap from 'vue-baidu-map-3x'
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap'
import '@vuemap/vue-amap/dist/style.css'
initAMapApiLoader({
  key: '69836c4a9c3cbaaa6420135136f143d3',
  securityJsCode: '905038a9c4095309db7ef7369aec3eee', // 新版key需要配合安全密钥使用
})

import App from './App.vue'

const app = createApp(App)
app.use(VueAMap)
// app.use(BaiduMap, {
//   ak: '8o7llNfxxs3UgPU1ohQirdQta9kCEpjB', //使用自己的ak
// })

app.mount('#app')
