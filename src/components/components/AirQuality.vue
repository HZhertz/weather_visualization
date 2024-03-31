<template>
  <div class="air-quality">
    <MyCard title="空气质量">
      <div class="aqi-echart">
        <v-chart class="chart" :option="option" autoresize />
      </div>
      <div class="aqi-list-wrap">
        <div class="aqis">
          <div class="item" v-for="item in aqiList" key="item.name">
            <div class="value">{{ item.value }}</div>
            <div class="color" :style="{ backgroundColor: item.color }"></div>
            <div class="type">{{ item.name }}</div>
          </div>
        </div>
        <div class="upd-time">更新时间:{{ updTime }}</div>
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
import { Ref, computed, inject, onMounted, ref, toRaw, watch } from 'vue'
import { ProxyCoord } from '@/types/http'
import { getLocationAqiQuality } from '@/http'
import { AQI, BC } from '@/assets/ts'
import { getColor } from '@/utils'
import type { AqisData } from '@/types/aqiInfo'

use([CanvasRenderer, GaugeChart])

const location = inject<Ref<ProxyCoord>>('location')
if (!location) {
  throw new Error('Location maybe not provided')
}
const pointParams = computed(() => {
  return toRaw(location.value)
})

interface ListItem {
  name: string
  value: string
  color: string
}
const aqiList = ref<ListItem[]>([])
const aqiData = ref<AqisData>()
const updTime = ref('')
const getLocationAqiQualityInfo = async () => {
  const res = await getLocationAqiQuality(pointParams.value)
  console.log(res)
  aqiData.value = res.data.data
  if (aqiData.value) {
    AQI.map((item) => {
      const data = {
        name: item.name,
        value: parseFloat(aqiData.value![item.key]).toString(),
        color: getColor(parseFloat(aqiData.value![item.key])),
      }
      aqiList.value.push(data)
    })
  }

  updTime.value = res.data.data.D_DATETIME
}

onMounted(() => {
  getLocationAqiQualityInfo()
}),
  watch(
    location,
    () => {
      aqiList.value = []
      getLocationAqiQualityInfo()
    },
    { deep: true }
  )

const gaugeData = computed(() => {
  if (aqiData.value) {
    return [
      {
        value: parseFloat(aqiData.value.V_AQI),
        name: aqiData.value.V_QUAL,
      },
    ]
  } else {
    return [
      {
        value: 0,
        name: '———',
      },
    ]
  }
})

const axisLineColor = computed(() => {
  // 计算当前值相对于最大值的比例
  const ratio = gaugeData.value[0].value / 800
  console.log(ratio)
  const color = BC.find((item) => {
    return item[0] >= ratio
  })
  const arr = BC.filter((item) => {
    return item[0] < ratio
  })
  if (color) {
    return [...arr, [ratio, color[1]], [1, '#f3f5f7']]
  } else {
    return [...arr, [1, '#f3f5f7']]
  }
})

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
          color: axisLineColor,
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
      data: gaugeData,
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
.aqi-list-wrap {
  margin: 0 5px;
  text-align: center;
  .aqis {
    height: 50px;
    display: flex;
    justify-content: space-around;
    .item {
      .value {
        font-size: 14px;
        line-break: 30px;
        font-weight: 600;
        color: #585858;
      }
      .color {
        width: 10px;
        height: 10px;
        border-radius: 7.5px;
        margin: 0 auto;
      }
      .type {
        font-size: 12px;
        color: #b6b6b6;
        line-height: 27px;
      }
    }
  }
  .upd-time {
    margin: 10px 0;
    font-size: 12px;
    color: #585858;
    font-weight: 400;
    vertical-align: baseline;
  }
}
</style>
@/http/api
