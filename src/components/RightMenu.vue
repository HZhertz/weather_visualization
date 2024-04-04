<script lang="ts" setup>
import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import { getImageUrl } from '@/utils'
import { MT_tile, MT_scatter } from '@/assets/ts'
import MyScroll from './components/MyScroll.vue'

const tileCode = inject<Ref<string>>('tileCode')!
const scatterCode = inject<Ref<string>>('scatterCode')!

const selectedTileCode = ref('')
const selectedScatterCode = ref('')

const handleClick = (e: MouseEvent, type: string) => {
  console.log(e, type)
  const target = e.target as HTMLElement
  const menuItem = target.closest('.menu-item')
  console.log(menuItem)
  if (menuItem) {
    const code = menuItem.getAttribute('data-code')
    if (code) {
      if (type === 'tile') {
        selectedTileCode.value = selectedTileCode.value === code ? '' : code
        tileCode.value = code
      } else {
        selectedScatterCode.value = selectedScatterCode.value === code ? '' : code
        scatterCode.value = code
      }
    }
  }
}
</script>

<template>
  <div class="menu">
    <MyScroll>
      <div class="title">
        <div class="left-line"></div>
        <div class="text">基本要素</div>
        <div class="right-line"></div>
      </div>
      <div class="tile-box" @click="(e) => handleClick(e, 'tile')">
        <div
          class="menu-item"
          v-for="item in MT_tile"
          :key="item.code"
          :data-code="item.code"
          :class="{ selected: selectedTileCode === item.code }"
        >
          <div class="icon"><img :src="getImageUrl('menu_icon/' + item.icon + '.png')" alt="" /></div>
          <div class="text">{{ item.name }}</div>
        </div>
      </div>
      <div class="title">
        <div class="left-line"></div>
        <div class="text">空气质量</div>
        <div class="right-line"></div>
      </div>
      <div class="scatter-box" @click="(e) => handleClick(e, 'scatter')">
        <div
          class="menu-item"
          v-for="item in MT_scatter"
          :key="item.code"
          :data-code="item.code"
          :class="{ selected: selectedScatterCode === item.code }"
        >
          <div class="icon"><img :src="getImageUrl('menu_icon/' + item.icon + '.png')" alt="" /></div>
          <div class="text">{{ item.name }}</div>
        </div>
      </div>
    </MyScroll>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  width: 200px;
  background-color: #cbd4e28a;
  .title {
    display: flex;
    align-items: center;
    padding-top: 6px;
    height: 40px;
    background-color: #cbd4e28a;
    .left-line {
      height: 2px;
      width: 18px;
      background: #fff;
      flex: auto;
    }
    .text {
      padding: 0 26px;
      color: #000;
      font-size: 20px;
      font-weight: 1000;
    }
    .right-line {
      height: 2px;
      width: 18px;
      background: #fff;
      flex: none;
    }
  }
  .menu-item {
    display: flex;
    flex-direction: row-reverse;
    position: relative;
    height: 40px;
    padding: 0 10px;
    background-color: #cbd4e28a;
    cursor: pointer;
    .text {
      font-size: 20px;
      line-height: 40px;
      color: #000;
    }
    .icon {
      margin: auto 5px;
      img {
        height: 25px;
        border-radius: 50%;
      }
    }
  }
  .selected {
    .text {
      color: #efb245;
    }

    img {
      background-color: #efb245;
    }
  }
}
</style>
