<script lang="ts" setup>
withDefaults(
  defineProps<{
    bordercolor: string
  }>(),
  {
    bordercolor: '#d7d7d7',
  }
)
</script>

<template>
  <div class="info-window" :style="`--color: ${bordercolor};`">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.info-window {
  display: flex;
  flex-direction: column;

  position: relative;
  top: -20px;
  background-color: #fff;
  border: 1px solid var(--color);
  border-radius: 4px;
  padding: 10px;
  &::before {
    content: '';
    position: absolute;
    bottom: -12px; /* 调整三角形的位置 */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 12px solid var(--color); /* 三角形的颜色 */
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -10px; /* 比 ::before 小一点，创建一个边框效果 */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 11px solid #fff; /* 与背景颜色相同 */
  }
}
</style>
