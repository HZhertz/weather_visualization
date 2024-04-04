<script lang="ts" setup>
import { computed, inject, onMounted, ref, watch } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import type { Ref } from 'vue'
import type { Coord } from '@/types/http'
import type { LocationEleDetailData } from '@/types/weaInfo'
import { getLocationEleDetail } from '@/http'
import { formatLineChartTime } from '@/utils'
import { ED } from '@/assets/ts'
import MyCard from './MyCard.vue'

use([CanvasRenderer, LineChart, TooltipComponent, GridComponent, LegendComponent])

const location = inject<Ref<Coord>>('location')!

const selectedIndex = ref(0)
const handleClick = (e: MouseEvent) => {
  let target = e.target as HTMLElement | null
  if (target && target.tagName.toLowerCase() === 'span') {
    let index = target.dataset.index
    if (index) {
      selectedIndex.value = parseInt(index)
    }
  }
}
const eType = computed(() => {
  return ED[selectedIndex.value]
})

const lineChartData = ref<LocationEleDetailData>()
const isShow = ref(false)
const getLocationEleDetailInfo = async () => {
  const res = await getLocationEleDetail(location.value)
  console.log(res)
  if (res.status !== 200) {
    return
  }
  lineChartData.value = res.data
  isShow.value = lineChartData.value.sk.list.some((item) => {
    return item.length !== 0
  })
}

onMounted(() => {
  getLocationEleDetailInfo()
}),
  watch(
    location,
    () => {
      isShow.value = false
      getLocationEleDetailInfo()
    },
    { deep: true }
  )

const yName = computed(() => {
  return eType.value.name + '(' + eType.value.unit + ')'
})
const yMin = (value: any) => {
  return eType.value.name === '气压' ? Math.floor(value.min * 2 - value.max) : null
}
const skData = computed(() => {
  if (lineChartData.value) {
    return formatLineChartTime(lineChartData.value.sk.list[eType.value.index])
  }
})
const ycData = computed(() => {
  if (lineChartData.value) {
    if (isShow.value) {
      const theLastSkData = lineChartData.value.sk.list[eType.value.index].at(-1)!
      return formatLineChartTime([theLastSkData, ...lineChartData.value.yc.list[eType.value.index]])
    }
  }
})

const option = ref({
  grid: {
    left: '15%',
    right: '8%',
    top: '20%',
    bottom: '15%',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#e9e9e9',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: { color: '#898989', fontSize: 10 },
  },

  yAxis: {
    type: 'value',
    name: yName,
    min: yMin,
    boundaryGap: [0, '20%'],
    splitLine: {
      lineStyle: {
        color: '#e9e9e944',
      },
    },
    axisLabel: { fontSize: 10 },
  },
  legend: {
    data: ['实况', '预测'],
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params: any) {
      var data = params[0].data
      var time = data[0]
      var name = params[0].seriesName
      var value = data[1]
      return time + '<br />' + name + ` ${eType.value.name}: ` + value + eType.value.unit
    },
  },

  series: [
    {
      name: '实况',
      type: 'line',
      symbol: 'circle',
      lineStyle: {
        color: '#489ffc',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(72, 159, 252,1)',
            },
            {
              offset: 1,
              color: 'rgba(72, 159, 252,0)',
            },
          ],
        },
      },
      data: skData,
    },
    {
      name: '预测',
      type: 'line',
      symbol: 'circle',
      lineStyle: {
        color: '#77cb3c',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(119, 203, 60,1)',
            },
            {
              offset: 1,
              color: 'rgba(119, 203, 60,0)',
            },
          ],
        },
      },
      data: ycData,
    },
  ],
})
</script>

<template>
  <div class="element-detail" v-if="isShow">
    <MyCard title="要素详情">
      <div class="type-box" @click="handleClick">
        <span
          v-for="item in ED"
          :key="item.id"
          :data-index="item.id"
          :class="{ selected: selectedIndex === item.id }"
        >
          {{ item.type }}
        </span>
      </div>
      <div class="history-echart">
        <v-chart class="chart" :option="option" autoresize />
      </div>
    </MyCard>
  </div>
</template>

<style lang="scss" scoped>
.element-detail {
  .type-box {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
    span {
      display: inline-block;
      padding: 6px 14px;
      border: 1px solid #edeeee;
      border-radius: 4px;
      background-color: #f2f6f9;
      &:hover {
        cursor: pointer;
      }
    }
    .selected {
      color: $green-d;
      border: 1px solid $green-l;
    }
  }
  .history-echart {
    height: 200px;
    margin: 10px 10px;
    .chart {
      height: 100%;
    }
  }
}
</style>
