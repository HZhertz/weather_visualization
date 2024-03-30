<template>
  <div class="main">
    <el-amap class="gm-view" :zoom="4.5" :zooms="[4, 18]" :center="[100, 40]" @click="handleClick">
      <el-amap-layer-tile
        tile-url="https://f.sat.owm.io/vane/2.0/weather/PA0/[z]/[x]/[y]?appid=9de243494c0b295cca9337e1e96b00e2&date=1711768876&palette=0.1:b5f7a6;0.2:6bc769;0.5:88c5f9;1:3a3bfa;10:f33efa;140:a4407a"
      />
    </el-amap>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// const mapStyle = ref({
//   styleId: 'f336be4c92fa3f2601f0298d5fa7aca8',
// })

const location = ref({ lng: 116.32803, lat: 39.94851 })
const handleClick = (e: any) => {
  console.log(e)
  location.value.lng = e.lnglat.lng
  location.value.lat = e.lnglat.lat
  console.log(location.value)
}

// const handleLocationSuccess = (point: any) => {
//   location.value = point.point
// }

defineExpose({
  location,
})
</script>
<style lang="scss" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: gray;

  .gm-view {
    width: 100%;
    height: 100%;
  }
}
</style>
