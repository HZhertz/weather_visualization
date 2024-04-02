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
      <el-amap-control-scale />
      <el-amap-control-tool-bar />
      <el-amap-control-geolocation @complete="handleLocationSuccess" />
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

<script lang="ts" setup>
import { ref, inject, Ref, computed, watchEffect } from 'vue'
import { ProxyCoord } from '@/types/http'
import { getImageUrl, getColor, convertToGeoJSON } from '@/utils'
import { MT } from '@/assets/ts'
import MyInfoWindow from './components/MyInfoWindow.vue'

const mapStyle = ref('amap://styles/c7e9e9eef04db01b01a5df75f6225483')

const visible = ref(false)
const infoPoint = ref([120, 31])
const infoContent = ref<string[]>([])

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

const menuCode = inject<Ref<string>>('menuCode')!
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
    }
  }
})

const data = ref([
  {
    unit: '-',
    code: '110000',
    province: '999998',
    city: '北京市',
    name: '万寿西宫',
    lon: 116.3621,
    id: '1001A',
    value: 93,
    lat: 39.8784,
  },
  {
    unit: '-',
    code: '110000',
    province: '999998',
    city: '北京市',
    name: '东四',
    lon: 116.4174,
    id: '1003A',
    value: 101,
    lat: 39.9289,
  },
  {
    unit: '-',
    code: '110000',
    province: '999998',
    city: '北京市',
    name: '天坛',
    lon: 116.4072,
    id: '1004A',
    value: 85,
    lat: 39.8863,
  },
])
const geoData = convertToGeoJSON(data.value)
const layerStyle = ref({
  radius: 6,
  borderWidth: 0,
  color: (_: any, f: any) => {
    return getColor(f.properties.value)
  },
})
console.log(geoData)
const bordercolor = ref('')
const handleMousemove = (f: any, e: any) => {
  if (f) {
    // console.log(f, e)
    visible.value = true
    infoPoint.value = f.coordinates
    infoContent.value = [f.properties.name, f.properties.value] as string[]
    bordercolor.value = getColor(f.properties.value)
  }
}
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
