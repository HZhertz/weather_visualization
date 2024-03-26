<template>
  <div class="my-scroll" ref="myScroll">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const myScroll = ref<HTMLElement | null>(null)
let isDown = false
let startY: number
let scrollTop: number

onMounted(() => {
  const $myScroll = myScroll.value
  if ($myScroll) {
    $myScroll.addEventListener('wheel', function (e) {
      e.preventDefault()
      $myScroll.scrollTop += e.deltaY / 2
    })

    $myScroll.addEventListener('mousedown', (e) => {
      isDown = true
      startY = e.pageY
      scrollTop = $myScroll.scrollTop
    })

    $myScroll.addEventListener('mouseup', () => {
      isDown = false
    })

    $myScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return
      const y = e.pageY
      const walk = y - startY
      $myScroll.scrollTop = scrollTop - walk
    })
  }
})
</script>

<style lang="scss" scoped>
.my-scroll {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  background-color: #fff;
  user-select: none;
  // .container {
  //   height: 1600px;
  //   background-color: #fff;
  // }
}
</style>
