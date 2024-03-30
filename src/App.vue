<template>
  <div class="container">
    <div class="header">
      <Header></Header>
    </div>
    <div class="body">
      <Main></Main>
      <LeftSide></LeftSide>
      <RightMenu></RightMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import Header from './components/Header.vue'
import LeftSide from './components/LeftSide.vue'
import Main from './components/Main.vue'
import RightMenu from './components/RightMenu.vue'

const location = ref({ lng: 116.32803, lat: 39.94851 })
provide('location', location)

// 检测 location 的变化需要深度监听
// watch(
//   location.value,
//   (nv, ov) => {
//     console.log(nv, ov)
//   },
//   { deep: true }
// )
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .body {
    position: relative;
    flex: 1;
  }
}
</style>
