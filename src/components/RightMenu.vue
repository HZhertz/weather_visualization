<template>
  <div class="menu">
    <MyScroll>
      <div class="menu-item" v-for="item in MT" :key="item.code">{{ item.name }}</div>
    </MyScroll>
  </div>
</template>

<script lang="ts" setup>
import MyScroll from './components/MyScroll.vue'
import { MT } from '@/assets/ts'
</script>
<style lang="scss" scoped>
.menu {
  position: absolute;
  right: 0;
  height: 100%;
  width: 180px;
  background-color: #ddd29580;
}
</style>
