<script setup lang="ts">
import { provide, ref } from 'vue'
import Header from './components/Header.vue'
import LeftSide from './components/LeftSide.vue'
import MainMap from './components/MainMap.vue'
import RightMenu from './components/RightMenu.vue'

// 地图标点
const location = ref({ lng: 116.391512, lat: 39.905822 })
provide('location', location)
// 地图中心
const mapCenter = ref([104, 37])
provide('mapCenter', mapCenter)
// 选中菜单项
const menuCode = ref('')
provide('menuCode', menuCode)
</script>

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
