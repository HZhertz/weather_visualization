<template>
  <div class="container">
    <div class="header">
      <Header></Header>
    </div>
    <div class="body">
      <div class="main"><Main></Main></div>

      <div class="left"><LeftSide></LeftSide></div>
      <div class="right"><RightMenu></RightMenu></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import LeftSide from './components/LeftSide.vue'
import Main from './components/Main.vue'
import RightMenu from './components/RightMenu.vue'
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
