<script setup lang="ts">
import { provide, ref } from 'vue'
import Header from '@/components/Header.vue'
import LeftSide from '@/components/LeftSide.vue'
import MainMap from '@/components/MainMap.vue'
import RightMenu from '@/components/RightMenu.vue'
import WvDrawer from '@/components/components/WvDrawer.vue'

// 地图标点
const location = ref({ lng: 116.391512, lat: 39.905822 })
provide('location', location)
// 地图中心
const mapCenter = ref([104, 37])
provide('mapCenter', mapCenter)
// 选中菜单项
const tileCode = ref('')
provide('tileCode', tileCode)
const scatterCode = ref('')
provide('scatterCode', scatterCode)
</script>

<template>
  <div class="container">
    <div class="header">
      <Header></Header>
    </div>
    <div class="body">
      <MainMap></MainMap>
      <WvDrawer width="20.8vw" direction="left">
        <LeftSide></LeftSide>
      </WvDrawer>
      <WvDrawer width="10.4vw" direction="right">
        <RightMenu></RightMenu>
      </WvDrawer>
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
		overflow: hidden;
  }
}
</style>
