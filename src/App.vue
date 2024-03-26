<template>
  <div class="container">
    <div class="header">
      <Header></Header>
    </div>
    <div class="body">
      <Main ref="mainRef"></Main>
      <LeftSide></LeftSide>
      <RightMenu></RightMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watchEffect } from 'vue'
import Header from './components/Header.vue'
import LeftSide from './components/LeftSide.vue'
import Main from './components/Main.vue'
import RightMenu from './components/RightMenu.vue'
import type { MianInstance } from '@/types/component.d.ts'

const mainRef = ref<MianInstance>()
const location = ref({})

watchEffect(() => {
  const $mianRef = mainRef.value
  if ($mianRef) {
    location.value = $mianRef.location
  }
})

provide('location', location)
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .body {
    position: relative;
    flex: 1;
  }
}
</style>
