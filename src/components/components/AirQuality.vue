<template>
  <div class="air-quality">
    <MyCard title="空气质量">
      <div class="aqi-echart">
        <v-chart class="chart" :option="option" autoresize />
      </div>
      <div class="aqi-list-wrap">
        <div class="aqis">
          <div class="item">
            <div class="value"></div>
            <div class="color"></div>
            <div class="type"></div>
          </div>
        </div>
        <div class="upd-time"></div>
      </div>
    </MyCard>
  </div>
</template>

<script lang="ts" setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import VChart from 'vue-echarts'
import MyCard from './MyCard.vue'
import { Ref, computed, inject, ref, toRaw, watch } from 'vue'
import { ProxyCoord } from '@/types/http'
import { getLocationAqiQuality } from '@/http'
import { AQI } from '@/assets/ts'

use([CanvasRenderer, GaugeChart])

const location = inject<Ref<ProxyCoord>>('location')
if (!location) {
  throw new Error('Location maybe not provided')
}
const pointParams = computed(() => {
  return toRaw(location.value)
})

interface AqiData {
  [key: string]: string
}
const aqiList = ref<AqiData>({})
const getLocationAqiQualityInfo = async () => {
  const res = await getLocationAqiQuality(pointParams.value)
  console.log(res)
  const aqiData: AqiData = res.data.data
  AQI.map((item) => {
    aqiList.value[item.name] = parseFloat(aqiData[item.key]).toString()
  })
}

watch(location, () => {
  getLocationAqiQualityInfo()
})

const aqiData = [
  {
    value: 367,
    name: '严重污染',
  },
]

// 基准数组
const baseColor: [number, string][] = [
  [0.1, '#08e508'],
  [0.2, '#ffff08'],
  [0.3, '#ff8208'],
  [0.4, '#ff0808'],
  [0.5, '#9c0852'],
  [1, '#8b2c47'],
]

const axisLineColor = () => {
  // 计算当前值相对于最大值的比例
  const ratio = aqiData[0].value / 800
  const color = baseColor.find((item) => {
    return item[0] >= ratio
  })
  const arr = baseColor.filter((item) => {
    return item[0] < ratio
  })
  if (color) {
    return [...arr, [ratio, color[1]], [1, '#f3f5f7']]
  } else {
    return [...arr, [1, '#f3f5f7']]
  }
}

const option = ref({
  series: [
    {
      type: 'gauge',
      startAngle: 160,
      endAngle: 20,
      radius: '220%',
      min: 0,
      max: 800,
      center: ['50%', '110%'],
      splitNumber: 20,
      axisLine: {
        lineStyle: {
          width: 0,
          color: axisLineColor(),
        },
      },
      splitLine: {
        length: '12%',
        lineStyle: {
          color: 'auto',
          width: 7,
        },
      },
      pointer: {
        show: false,
      },
      axisTick: {
        show: false,
      },

      axisLabel: {
        show: false,
      },
      title: {
        offsetCenter: [0, '-20%'],
        fontSize: 11,
      },
      detail: {
        fontSize: 30,
        offsetCenter: [0, '-45%'],
        valueAnimation: true,
        color: '#47555d',
      },
      data: aqiData,
    },
  ],
})
</script>
<style lang="scss" scoped>
.aqi-echart {
  height: 160px;
  margin: 0 10px;
  .charts {
    height: 100%;
  }
}
</style>
