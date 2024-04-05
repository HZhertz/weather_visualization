<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const wvScroll = ref<HTMLElement | null>(null)
let isDown = false
let startY: number
let scrollTop: number

onMounted(() => {
  const $wvScroll = wvScroll.value
  if ($wvScroll) {
    $wvScroll.addEventListener('wheel', function (e) {
      e.preventDefault()
      $wvScroll.scrollTop += e.deltaY / 2
    })

    $wvScroll.addEventListener('mousedown', (e) => {
      isDown = true
      startY = e.pageY
      scrollTop = $wvScroll.scrollTop
    })

    $wvScroll.addEventListener('mouseup', () => {
      isDown = false
    })

    $wvScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return
      const y = e.pageY
      const walk = y - startY
      $wvScroll.scrollTop = scrollTop - walk
    })
  }
})
</script>

<template>
  <div class="wv-scroll" ref="wvScroll">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.wv-scroll {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  user-select: none;
  // .container {
  //   height: 1600px;
  //   background-color: #fff;
  // }
}
</style>
