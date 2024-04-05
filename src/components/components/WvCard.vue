<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string
  }>(),
  {
    title: '默认标题',
  }
)
</script>

<template>
  <div class="wv-card">
    <div class="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.wv-card {
  position: relative;
  margin: 10px 4px;
  padding-bottom: 12px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 5px rgba(112, 145, 180, 0.3);

  .title {
    font-size: 16px;
    color: $green-d;
    line-height: 50px;
    text-align: left;
    padding-left: 14px;
    font-weight: 800;
  }
}
</style>
