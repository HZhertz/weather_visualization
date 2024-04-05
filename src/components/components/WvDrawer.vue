<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    direction: string
    width: string
  }>(),
  {
    direction: 'left',
    width: '20.8vw',
  }
)

const isHidden = ref(false)
const toggle = () => {
  isHidden.value = !isHidden.value
}

const wvDrawerSty = computed(() => {
  const sty: { [key: string]: string } = {
    width: props.width,
  }
  if (props.direction === 'left') {
    sty.left = isHidden.value ? '-' + sty.width : '0'
  } else if (props.direction === 'right') {
    sty.right = isHidden.value ? '-' + sty.width : '0'
  }
  return sty
})

const showHideSty = computed(() => {
  return props.direction === 'left' ? { left: '100%' } : { right: '100%' }
})

const arrowDirection = computed(() => {
  return props.direction === 'left' ? 0 : 180
})
const deg = computed(() => {
  return isHidden.value ? 180 : 0
})
const arrowSty = computed(() => {
  return {
    transform: `rotate(${arrowDirection.value + deg.value}deg)`,
  }
})
</script>

<template>
  <div class="wv-drawer" :style="wvDrawerSty">
    <slot></slot>
    <div class="show-hide" :style="showHideSty" @click="toggle">
      <div class="arrow" :style="arrowSty"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wv-drawer {
  position: absolute;
  bottom: 0;
  top: 0;
  background-color: #fff;
  transition: left 0.5s ease, right 0.5s ease;
  .show-hide {
    position: absolute;
    top: 0;
    width: 20px;
    height: 50px;
    background-color: $green-l;
    cursor: pointer;
    .arrow {
      position: relative;
      top: 16px;
      right: 6px;
      border-left: 10px solid #ffffff00;
      border-right: 10px solid #ffffff;
      border-top: 10px solid #ffffff00;
      border-bottom: 10px solid #ffffff00;
      transform-origin: 16px 9px;
    }
  }
}
</style>
