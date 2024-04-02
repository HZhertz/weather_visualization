<template>
  <div class="side">
    <div class="local-info">
      <div class="weather-icon">
        <img :src="getImageUrl('weather_icon/' + weatherType + '.png')" alt="" />
      </div>
      <div class="city-name" :title="formatAddress">{{ address }}</div>
    </div>
    <div class="inner-padding">
      <MyScroll>
        <div class="content">
          <div class="basic-element">
            <div class="top-info">
              <div class="temperature">{{ weaEle.tem }}</div>
              <div class="two-line">
                <div class="body-temperature-location">
                  <div class="degree-c">℃</div>
                </div>
                <div class="secondeline">
                  <div class="wind-direction">{{ weaEle.wind_text }}:{{ weaEle.wins_text }}</div>
                  <div class="relative-humidity">湿度:{{ weaEle.rhu }}%</div>
                </div>
              </div>
            </div>
            <div class="icon-info">
              <div class="item tcdc" v-if="weaEle.tcdc">
                <div class="icon"></div>
                <div class="top-text">总云量</div>
                <div class="bottom-text">{{ weaEle.tcdc }}%</div>
              </div>
              <div class="item vis" v-if="weaEle.vis">
                <div class="icon"></div>
                <div class="top-text">能见度</div>
                <div class="bottom-text">{{ formatVis(weaEle.vis) }}km</div>
              </div>
              <div class="item aqi">
                <div class="icon"></div>
                <div class="top-text">空气质量</div>
                <div class="bottom-text">轻度污染</div>
              </div>
              <div class="item uvi" v-if="weaEle.uvi">
                <div class="icon"></div>
                <div class="top-text">紫外线指数</div>
                <div class="bottom-text">{{ weaEle.uvi }} {{ weaEle.uvi_strength }}</div>
              </div>
            </div>
            <div class="rain-info">
              <div class="left-container">
                <div class="item">
                  <div class="icon"></div>
                  <div class="top-text">近1h降水</div>
                  <div class="bottom-text">{{ formatPre(weaEle.pre_1h) || 0.0 }}mm</div>
                </div>
                <div class="item">
                  <div class="icon"></div>
                  <div class="top-text">近3h降水</div>
                  <div class="bottom-text">{{ formatPre(weaEle.pre_3h) || 0.0 }}mm</div>
                </div>
              </div>
              <div class="right-container">
                <div class="item">
                  <div class="icon"></div>
                  <div class="top-text">近12h降水</div>
                  <div class="bottom-text">{{ formatPre(weaEle.pre_12h) || 0.0 }}mm</div>
                </div>
                <div class="item">
                  <div class="icon"></div>
                  <div class="top-text">近24h降水</div>
                  <div class="bottom-text">{{ formatPre(weaEle.pre_24h) || 0.0 }}mm</div>
                </div>
              </div>
            </div>
          </div>
          <div class="life-live">
            <MyCard title="生活指数">
              <div class="box">
                <div class="item">
                  <img src="@/assets/img/bodytem.png" alt="体感温度" />
                  <div class="text">
                    <p>体感温度</p>
                    <p>{{ bodytem }}℃</p>
                  </div>
                </div>
                <div class="item">
                  <img src="@/assets/img/comfort.png" alt="舒适度" />
                  <div class="text">
                    <p>舒适度</p>
                    <p>{{ comfort }}</p>
                  </div>
                </div>
              </div>
            </MyCard>
          </div>
          <div class="warn-info">
            <MyCard title="预警信息">
              <template v-if="warnInfoList.length === 0">
                <div class="non-warn">当前没有预警</div>
              </template>
              <template v-else>
                <div class="warn-item" v-for="item in warnInfoList" key="item.dataid">
                  <div class="warn-title">{{ item.codename }}{{ item.signallevel }}预警</div>
                  <div class="warn-sender">
                    <span>{{ item.sender }} {{ item.time }}</span>
                  </div>
                  <div class="warn-content">
                    {{ item.issuecontent }}
                  </div>
                </div>
              </template>
            </MyCard>
          </div>
          <ElementDetail />
          <AirQuality />
        </div>
      </MyScroll>
    </div>

    <div class="left-show-hide"></div>
  </div>
</template>

<script lang="ts" setup>
import { toRaw, inject, Ref, ref, computed, watch, onMounted } from 'vue'
import type { ProxyCoord } from '@/types/http'
import type { LocationWarnData } from '@/types/warnInfo'
import { getLocationBaseElement, getLocationGeo, getLocationLifeIndex, getLocationWarning } from '@/http'
import { getImageUrl, formatVis, formatPre } from '@/utils'
import MyScroll from './components/MyScroll.vue'
import MyCard from './components/MyCard.vue'
import ElementDetail from './components/ElementDetail.vue'
import AirQuality from './components/AirQuality.vue'

const location = inject<Ref<ProxyCoord>>('location')!

watch(
  location,
  (nv, ov) => {
    console.log(nv, ov)
  },
  { deep: true }
)
const pointParams = computed(() => {
  return toRaw(location.value)
})

// 获取地理信息与天气
const weatherType = ref('0')
const address = ref('')
const formatAddress = ref('')
const getLocationGeoInfo = async () => {
  const res = await getLocationGeo(pointParams.value)
  if (res.status !== 200) {
    return
  }

  weatherType.value = res.data.status

  const province = res.data.regeocode.addressComponent.province
  const city = res.data.regeocode.addressComponent.city
  const district = res.data.regeocode.addressComponent.district
  // const township = res.data.regeocode.addressComponent.township
  const nonEmptyComponents = [province, city, district].filter((component) => component.length !== 0)
  address.value = nonEmptyComponents.join('—')

  formatAddress.value = res.data.regeocode.formatted_address
}
// 获取天气要素
const weaEle = ref({
  // 温度
  tem: '0',
  // 湿度
  rhu: '0',
  // 风速
  wins: '0',
  wins_text: '',
  // 风向
  wind: '0',
  wind_text: '',
  // 云量
  tcdc: '',
  // 能见度
  vis: '',
  // 紫外线
  uvi: '',
  uvi_text: '',
  uvi_strength: '',
  // 降水
  pre_1h: '',
  pre_3h: '',
  pre_6h: '',
  pre_12h: '',
  pre_24h: '',
})
const getLocationBaseEleInfo = async () => {
  const res = await getLocationBaseElement(pointParams.value)
  console.log(res)
  if (res.status !== 200) {
    return
  }
  weaEle.value.tem = res.data.list[0].value
  weaEle.value.rhu = res.data.list[1].value
  weaEle.value.wins = res.data.list[2].value
  weaEle.value.wins_text = res.data.DS.winSpeed
  weaEle.value.wind = res.data.list[3].value
  weaEle.value.wind_text = res.data.DS.winDir
  weaEle.value.tcdc = res.data.list[6].value
  weaEle.value.vis = res.data.list[5].value
  weaEle.value.uvi = res.data.uvi.uvi
  weaEle.value.uvi_text = res.data.uvi.level
  weaEle.value.uvi_strength = res.data.uvi.strength
  weaEle.value.pre_1h = res.data.list[8].value
  weaEle.value.pre_3h = res.data.list[9].value
  weaEle.value.pre_6h = res.data.list[10].value
  weaEle.value.pre_12h = res.data.list[11].value
  weaEle.value.pre_24h = res.data.list[12].value
}
// 获取生活指数
const bodytem = ref(0)
const comfort = ref('')
const getLocationLifeIndexInfo = async () => {
  const res = await getLocationLifeIndex(pointParams.value)
  console.log(res)
  if (res.status !== 200) {
    return
  }
  bodytem.value = res.data.DS[0].value
  comfort.value = res.data.DS[1].feel!
}
// 获取预警信息
const warnInfoList = ref<LocationWarnData>([])
const getLocationWarningInfo = async () => {
  const res = await getLocationWarning(pointParams.value)
  console.log(res)
  warnInfoList.value = res.data
}

onMounted(() => {
  getInfo()
}),
  watch(
    location.value,
    () => {
      getInfo()
    },
    { deep: true }
  )
const getInfo = () => {
  getLocationGeoInfo()
  getLocationBaseEleInfo()
  getLocationLifeIndexInfo()
  getLocationWarningInfo()
}
</script>
<style lang="scss" scoped>
.side {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  width: 400px;
  background-color: #fff;
}

.local-info {
  display: flex;
  position: relative;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: $green-d;
  background: #fff;

  .weather-icon {
    position: absolute;
    left: 15px;
    top: 6px;
    width: 36px;
    height: 36px;

    img {
      width: 100%;
    }
  }

  .city-name {
    display: inline-block;
    width: 400px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-left: 70px;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    font-weight: 1000;
  }
}

.inner-padding {
  border: 1px solid #e0e0e0;
  overflow: hidden;
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;

  .content {
    height: auto;

    .basic-element {
      margin-top: 30px;

      .top-info {
        display: flex;
        position: relative;
        height: 52px;
        padding: 0 20px;
        overflow: hidden;

        .temperature {
          height: 40px;
          line-height: 40px;
          font-size: 50px;
          font-weight: 600;
          color: $green-l;
          padding-right: 5px;
        }

        .two-line {
          .body-temperature-location {
            color: $green-d;
            overflow: hidden;
            white-space: nowrap;
            padding: 2px 0 2px 0;

            .degree-c {
              color: $green-d;
              font-size: 16px;
              line-height: 16px;
              font-weight: 600;
              margin-right: 4px;
            }
          }

          .secondeline {
            display: flex;
            margin-top: 6px;
            padding-bottom: 1px;
            white-space: nowrap;
            overflow: hidden;

            .wind-direction,
            .relative-humidity {
              font-size: 13px;
              font-weight: 600;
              color: $green-d;
              line-height: 14px;
              margin-right: 7px;
            }
          }
        }
      }

      .icon-info {
        display: flex;
        margin-top: 4px;
        justify-content: space-around;
        align-items: center;
        padding: 8px 0;
        border-radius: 6px;
        margin-left: 1px;
        margin-right: 1px;
        flex-wrap: wrap;
        align-content: flex-start;

        .item {
          text-align: center;

          .top-text {
            font-size: 14px;
            display: block;
            line-height: 25px;
            font-weight: 800;
            color: $green-d;
          }

          .bottom-text {
            display: block;
            font-size: 12px;
            line-height: 20px;
            font-weight: 600;

            height: 20px;
            color: $green-g;
          }

          & > .icon {
            width: 30px;
            height: 30px;
            margin: 0 auto;
            background-size: contain;
          }

          &:nth-child(1) > .icon {
            background-image: url('@/assets/img/cloud.png');
          }

          &:nth-child(2) > .icon {
            background-image: url('@/assets/img/cloud.png');
          }

          &:nth-child(3) > .icon {
            background-image: url('@/assets/img/cloud.png');
          }

          &:nth-child(4) > .icon {
            background-image: url('@/assets/img/cloud.png');
          }
        }
      }

      .rain-info {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 0;
        margin-bottom: 10px;
        margin-left: 1px;
        margin-right: 1px;
        padding: 8px 0;
        border-radius: 6px;
        flex-wrap: wrap;
        align-content: flex-start;

        .left-container,
        .right-container {
          width: 40%;
          flex: auto;
          margin: 0 6px;
          background: $bg-green;
          padding-left: 8px;
          border-radius: 4px;

          .item {
            padding-left: 5px;
            white-space: nowrap;

            .icon {
              display: inline-block;
              width: 4px;
              height: 4px;
              background: $green-d;
              border-radius: 2px;
              margin-right: 4px;
              vertical-align: middle;
            }

            .top-text {
              display: inline-block;
              font-size: 12px;
              line-height: 20px;
              color: $green-d;
              text-align: left;
              width: 6.5em;
            }

            .bottom-text {
              font-size: 12px;
              display: inline-block;
              line-height: 25px;
              font-weight: 800;
              color: $green-g;
              text-align: left;
              height: 20px;
            }
          }
        }
      }
    }

    .life-live {
      .box {
        display: flex;
        flex-wrap: wrap;
        padding: 0 15px;

        .item {
          display: flex;
          width: 33.3%;

          img {
            display: block;
            width: 30px;
            height: 30px;
            align-self: center;
          }

          .text {
            padding-left: 10px;
            color: #2c3e50;
            font-size: 13px;
            align-self: center;
            line-height: 1.3;
          }
        }
      }
    }

    .warn-info {
      .non-warn,
      .warn-content {
        margin-top: 4px;
        font-size: 12px;
        line-height: 22px;
        text-align: left;
        text-indent: 10px;
        margin-bottom: 10px;
      }

      .warn-item {
        padding: 0 10px;

        .warn-title {
          font-size: 14px;
          line-height: 30px;
          font-weight: 600;
          text-align: left;
          padding-left: 14px;
          position: relative;

          &:before {
            position: absolute;
            content: '';
            width: 5px;
            height: 14px;
            border-radius: 2.5px;
            left: 5px;
            background: #000;
            top: 50%;
            transform: translateY(-50%);
          }
        }

        .warn-sender {
          color: #959ca6;
          text-align: left;
          padding-left: 10px;
          border-bottom: 0.5px solid #e8e8ea;
        }
      }
    }
  }
}
</style>
@/http/api
