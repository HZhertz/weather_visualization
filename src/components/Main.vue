<template>
  <div class="main">
    <baidu-map
      class="bm-view"
      :zoom="5"
      :min-zoom="5"
      :map-click="true"
      :center="{ lng: 100, lat: 40 }"
      :scroll-wheel-zoom="true"
      :mapStyle="mapStyle"
      @click="handleClick"
      @zoomstart="handleZoomstart"
      @zoomend="handleZoomend"
    >
      <bm-marker
        :position="location"
        :icon="{
          url: getImageUrl('banglocation.png'),
          size: { width: 20, height: 46 },
          opts: {
            imageSize: { width: 20, height: 24 },
          },
        }"
        :title="location"
        :zIndex="13373461"
      ></bm-marker>

      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_LEFT"
        :offset="{ width: 300, height: 140 }"
        :showAddressBar="true"
        :autoLocation="true"
        @locationSuccess="handleLocationSuccess"
      ></bm-geolocation>
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT" :offset="{ width: 300, height: 40 }"></bm-scale>
      <bm-navigation
        anchor="BMAP_ANCHOR_BOTTOM_LEFT"
        :offset="{ width: 300, height: 80 }"
        type="BMAP_NAVIGATION_CONTROL_ZOOM"
      ></bm-navigation>
    </baidu-map>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const mapStyle = ref({
  styleId: 'f336be4c92fa3f2601f0298d5fa7aca8',
})

const handleZoomstart = (type: any, target: any) => {
  console.log(type, target)
  console.log('zoomstart')
}
const handleZoomend = (type: any, target: any) => {
  console.log(type, target)
  console.log('zoomend')
}

const getImageUrl = (path: String) => {
  console.log(new URL(`../assets/img/${path}`, import.meta.url).href)
  return new URL(`../assets/img/${path}`, import.meta.url).href
}

const location = ref({})
const handleClick = (type: any, target: any, point: any, pixel: any, overlay: any) => {
  console.log(type, target, point, pixel, overlay)
  console.log('click')
  location.value = type.point
  console.log(location.value)
}

const handleLocationSuccess = (point: any, AddressComponent: any, marker: any) => {
  console.log(point, AddressComponent, marker)
  location.value = point.point
}
// // import { BMap } from 'vue-baidu-map-3x'

// const mapContainer = ref(null)
// let mapInstance = null

// onMounted(() => {
//   // var map = new BMap.Map("map");
//   //   var point = new BMap.Point(116.404, 39.915);
//   //   map.centerAndZoom(point, 15);
//   mapInstance = new BMap.Map(mapContainer.value)
//   const point = new BMap.Point(116.404, 39.915)
//   mapInstance.centerAndZoom(point, 15)
// })
</script>
<style lang="scss" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: gray;
  .bm-view {
    width: 100%;
    height: 100%;
  }
}
</style>
