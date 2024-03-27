<template>
  <div class="element-detail">
    <MyCard title="要素详情">
      <div class="type-box" @click="handleClick">
        <span
          v-for="(item, index) in items"
          :key="index"
          :data-index="index"
          :class="{ selected: selectedIndex === index }"
        >
          {{ item }}
        </span>
      </div>
      <div class="history-echart">
        <v-chart class="chart" :option="option" autoresize />
      </div>
    </MyCard>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import MyCard from './MyCard.vue'

use([CanvasRenderer, LineChart, TooltipComponent, GridComponent, LegendComponent])

let items = ['气温', '气压', '相对湿度', '极大风', '降水']
let selectedIndex = ref(0)

const handleClick = (e: any) => {
  let target = e.target
  if (target.tagName.toLowerCase() === 'span') {
    selectedIndex.value = parseInt(target.dataset.index)
  }
  console.log(e)
}

var data1 = [
  ['26日11时', 9.9],
  ['26日12时', 10.3],
  ['26日13时', 10.2],
  ['26日14时', 10.5],
  ['26日15时', 11.3],
  ['26日16时', 12.7],
  ['26日17时', 12.0],
  ['26日18时', 10.5],
  ['26日19时', 10.0],
  ['26日20时', 10.0],
  ['26日21时', 9.5],
  ['26日22时', 9.3],
  ['26日23时', 9.4],
  ['27日00时', 9.3],
  ['27日01时', 8.6],
  ['27日02时', 7.8],
  ['27日03时', 7.5],
  ['27日04时', 7.8],
  ['27日05时', 8.4],
  ['27日06时', 9.1],
  ['27日07时', 9.4],
  ['27日08时', 9.8],
  ['27日09时', 10.3],
  ['27日10时', 10.5],
  ['27日11时', 10.7],
  ['27日12时', 10.7],
  ['27日13时', 11.2],
]
var data2 = [
  ['27日13时', 11.2],
  ['27日14时', 20.0],
  ['27日17时', 18.0],
  ['27日20时', 17.0],
  ['27日23时', 13.0],
  ['28日02时', 10.0],
  ['28日05时', 8.0],
  ['28日08时', 11.0],
  ['28日11时', 14.0],
  ['28日14时', 18.0],
  ['28日17时', 18.0],
  ['28日20时', 14.0],
  ['28日23时', 7.0],
  ['29日02时', 6.0],
  ['29日05时', 4.0],
  ['29日08时', 7.0],
  ['29日14时', 21.0],
  ['29日20时', 16.0],
  ['30日02时', 5.0],
  ['30日08时', 8.0],
]

const option = ref({
  grid: {
    left: '30',
    right: '5',
    top: '30',
    bottom: '25',
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
    name: '温度(℃)',
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
      var time = data[0] // x轴的数据
      var name = params[0].seriesName // 当前系列的名称
      var value = data[1] // y轴的数据
      return time + '<br />' + name + ' 温度: ' + value + '℃'
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
      data: data1,
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
      data: data2,
    },
  ],
})
</script>
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
    .charts {
      height: 100%;
    }
  }
}
</style>
