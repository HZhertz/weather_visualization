<template>
  <div class="menu">
    <MyScroll>
      <div class="menu-box" @click="handleClick">
        <div
          class="menu-item"
          v-for="item in MT"
          :key="item.code"
          :data-code="item.code"
          :class="{ selected: selectedCode === item.code }"
        >
          <div class="icon"><img :src="getImageUrl('menu_icon/' + item.icon + '.png')" alt="" /></div>
          <div class="text">{{ item.name }}</div>
        </div>
      </div>
    </MyScroll>
  </div>
</template>

<script lang="ts" setup>
import MyScroll from './components/MyScroll.vue'
import { getImageUrl } from '@/utils'
import { MT } from '@/assets/ts'
import { ref } from 'vue'

const selectedCode = ref('')
const handleClick = (e: MouseEvent) => {
  console.log(e)
  const target = e.target as HTMLElement
  const menuItem = target.closest('.menu-item')
  if (menuItem) {
    const code = menuItem.getAttribute('data-code')
    if (code) {
      selectedCode.value = code
    }
  }
}
</script>
<style lang="scss" scoped>
.menu {
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  width: 180px;
  background-color: #cbd4e28a;
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
