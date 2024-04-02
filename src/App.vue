<template>
  <div class="container">
    <div class="header">
      <Header></Header>
    </div>
    <div class="body">
      <MainMap></MainMap>
      <LeftSide></LeftSide>
      <RightMenu></RightMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import Header from './components/Header.vue'
import LeftSide from './components/LeftSide.vue'
import MainMap from './components/MainMap.vue'
import RightMenu from './components/RightMenu.vue'

const location = ref({ lng: 116.32803, lat: 39.94851 })
provide('location', location)
// watch(
//   location,
//   (newValue) => {
//     console.log(newValue)
//   },
//   { deep: true }
// )
const menuCode = ref('')
provide('menuCode', menuCode)
// watch(menuCode, (newValue) => {
//   console.log(newValue)
// })
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
