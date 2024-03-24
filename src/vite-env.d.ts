/// <reference types="vite/client" />
// 解决TypeScript 无法识别 .vue 文件
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
