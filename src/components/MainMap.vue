<template>
  <div class="map">
    <el-amap
      class="gm-view"
      :zoom="4.5"
      :zooms="[2, 18]"
      :center="[100, 40]"
      :mapStyle="mapStyle"
      @click="handleClick"
    >
      <el-amap-layer-tile v-if="tileType" :tile-url="tileUrl" />

      <el-amap-control-scale />
      <el-amap-control-tool-bar />
      <el-amap-control-geolocation @complete="handleLocationSuccess" />
      <el-amap-marker :position="[location.lng, location.lat]" :icon="getImageUrl('banglocation.png')" />
    </el-amap>
  </div>
</template>

<script lang="ts" setup>
import { ProxyCoord } from '@/types/http'
import { ref, inject, Ref, computed } from 'vue'
import { getImageUrl } from '@/utils'
import { MT } from '@/assets/ts'

const mapStyle = ref('amap://styles/c7e9e9eef04db01b01a5df75f6225483')

const location = inject<Ref<ProxyCoord>>('location')!
const handleClick = (e: any) => {
  console.log(e)
  location.value.lng = e.lnglat.lng
  location.value.lat = e.lnglat.lat
}
const handleLocationSuccess = (statue: any) => {
  console.log(statue)
  location.value.lat = statue.position.lat
  location.value.lng = statue.position.lng
}

const tileType = inject<Ref<string>>('tileType')!
const tileUrl = computed(() => {
  const result = MT.find((item) => {
    return item.code === tileType.value
  })
  console.log(result)
  let palette = result?.palette ? `&palette=${result?.palette}` : ''
  return `https://f.sat.owm.io/vane/2.0/weather/${tileType.value}/[z]/[x]/[y]?appid=9de243494c0b295cca9337e1e96b00e2${palette}`
})
</script>
<style lang="scss" scoped>
.map {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: gray;
  z-index: 0;
  .gm-view {
    width: 100%;
    height: 100%;
  }
}
</style>
