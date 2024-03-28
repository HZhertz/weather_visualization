<template>
  <div class="main">
    <baidu-map
      class="bm-view"
      :zoom="5"
      :min-zoom="5"
      :max-zoom="18"
      :map-click="true"
      :center="{ lng: 100, lat: 40 }"
      :scroll-wheel-zoom="true"
      :mapStyle="mapStyle"
      @click="handleClick"
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
        title="location"
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
import { getImageUrl } from '@/utils/index'

const mapStyle = ref({
  styleId: 'f336be4c92fa3f2601f0298d5fa7aca8',
})

const location = ref({ lng: 116.32803, lat: 39.94851 })
const handleClick = (type: any, target: any, point: any, pixel: any, overlay: any) => {
  console.log(type, target, point, pixel, overlay)
  console.log('click')
  location.value = type.point
  console.log(location.value)
}

const handleLocationSuccess = (point: any) => {
  location.value = point.point
}

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
  .bm-view {
    width: 100%;
    height: 100%;
  }
}
</style>
