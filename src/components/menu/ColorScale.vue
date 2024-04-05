<script lang="ts" setup>
import type { ColorScaleItem } from '@/types/const'

defineProps<{
  item: ColorScaleItem
}>()
</script>

<template>
  <div class="color-scale">
    <div class="band">
      <div class="unit">{{ item.unit }}</div>
      <div class="color-value">
        <div class="color-box">
          <div
            class="color-item"
            :style="{ backgroundColor: colorItem }"
            v-for="colorItem in item.color"
          ></div>
        </div>
        <div class="value-box">
          <div class="value-item" v-for="valueItem in item.value">{{ valueItem }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.color-scale {
  flex: 1;

  .band {
    display: flex;
    align-items: center;
    width: 320px;
    height: 20px;
    padding: 5px;
    background-color: #fff;
    .unit {
      width: 28px;
      margin-right: 5px;
      font-size: 10px;
      text-align: right;
    }
    .color-value {
      position: relative;
      height: 10px;
      .color-box {
        display: flex;
        position: absolute;
        width: 280px;
        .color-item {
          flex: 1;
          height: 14px;
        }
      }
      .value-box {
        display: flex;
        position: absolute;
        width: 280px;
        text-align: right;
        .value-item {
          flex: 1;
          font-size: 10px;
        }
      }
    }
  }
}
</style>
