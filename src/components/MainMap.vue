<script lang="ts" setup>
import { computed, inject, ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type { Coord } from '@/types/http'
import { getAqiScatter } from '@/http'
import { getImageUrl, getColor, convertToGeoJSON, getScatterColor } from '@/utils'
import { MT, CS } from '@/assets/ts'
import MyInfoWindow from './components/MyInfoWindow.vue'

// inject 注入
const location = inject<Ref<Coord>>('location')!
const mapCenter = inject<Ref<[number, number]>>('mapCenter')!
const menuCode = inject<Ref<string>>('menuCode')!

// 地图样式
const mapStyle = computed(() => {
  if (['CL'].includes(menuCode.value)) {
    return 'amap://styles/grey'
  }
  return 'amap://styles/fresh'
})

// 信息窗口是否可见
const visible = ref(false)
// 信息窗口位置
const infoPoint = ref([120, 31])
// 信息窗口内容
const infoContent = ref<string[]>([])

// 地图点击事件 获得位置信息并更新 location
const handleClick = (e: any) => {
  console.log(e)
  location.value = {
    lat: e.lnglat.lat,
    lng: e.lnglat.lng,
  }
}
// 地图定位事件 获得位置信息并更新 location mapCenter
const handleLocationSuccess = (statue: any) => {
  console.log(statue)
  let lat = statue.position.lat
  let lng = statue.position.lng
  location.value = { lat, lng }
  mapCenter.value = [lng, lat]
}

const menuItem = computed(() => {
  return MT.find((item) => {
    return item.code === menuCode.value
  })
})
const layerType = ref('')
const tileUrl = ref('')
watchEffect(() => {
  if (menuItem.value) {
    layerType.value = menuItem.value.type
    if (layerType.value === 'tiles') {
      let palette = menuItem.value.palette ? `&palette=${menuItem.value.palette}` : ''
      tileUrl.value = `https://f.sat.owm.io/vane/2.0/weather/${menuCode.value}/[z]/[x]/[y]?appid=9de243494c0b295cca9337e1e96b00e2${palette}`
    }
    if (layerType.value === 'scatter') {
      getAqiScatterInfo()
    }
  }
})

const geoData = ref({})
const getAqiScatterInfo = async () => {
  const res = await getAqiScatter(menuCode.value)
  console.log(res)
  geoData.value = convertToGeoJSON(res.data)
}
const layerStyle = ref({
  radius: 5,
  borderWidth: 0,
  color: (_: any, f: any) => {
    return getScatterColor(f.properties.value, CS[menuCode.value].value, CS[menuCode.value].color)
  },
})
console.log(geoData)
const bordercolor = ref('')
const handleMousemove = (f: any, e: any) => {
  if (f) {
    // console.log(f, e)
    visible.value = true
    infoPoint.value = f.coordinates
    infoContent.value = [f.properties.name, f.properties.value]
    bordercolor.value = getColor(f.properties.value)
  }
}
</script>

<template>
  <div class="map">
    <el-amap
      class="gm-view"
      :zoom="4.8"
      :zooms="[3.5, 15]"
      :center="mapCenter"
      :resizeEnable="true"
      :mapStyle="mapStyle"
      @click="handleClick"
    >
      <el-amap-control-scale />
      <el-amap-control-tool-bar />
      <el-amap-control-geolocation
        @complete="handleLocationSuccess"
        :showCircle="false"
        :showMarker="false"
        :zoomToAccuracy="false"
      />
      <el-amap-marker :position="[location.lng, location.lat]" :icon="getImageUrl('banglocation.png')" />
      <el-amap-info-window
        v-model:visible="visible"
        :position="infoPoint"
        :closeWhenClickMap="true"
        :isCustom="true"
      >
        <MyInfoWindow :bordercolor="bordercolor">
          <div class="div" v-for="item in infoContent">{{ item }}</div>
        </MyInfoWindow>
      </el-amap-info-window>
      <el-amap-layer-tile v-if="layerType === 'tiles'" :tile-url="tileUrl" />

      <el-amap-loca>
        <el-amap-loca-point :source-data="geoData" :layer-style="layerStyle" @mousemove="handleMousemove" />
      </el-amap-loca>
    </el-amap>
  </div>
</template>

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
