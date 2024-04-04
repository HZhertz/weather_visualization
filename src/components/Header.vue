<template>
  <div class="header">
    <div class="logo-img">
      <img src="@/assets/img/logo.png" alt="" />
      全国气象实况可视化
    </div>
    <div class="search">
      <input
        class="search-input"
        placeholder="搜索国内城市"
        v-model="searchKey"
        @click="
          () => {
            isSuggestVisible = !isSuggestVisible
          }
        "
      />
      <div class="search-suggest" v-show="isSuggestVisible">
        <div class="hot-citys" v-if="!searchKey">
          <div class="title">热门城市</div>
          <div class="citys" @click="chooseCity">
            <span class="item" v-for="item in hotCitysList" :data-info="item">{{ item[2] }}</span>
          </div>
        </div>
        <div class="suggest-list" v-else>
          <MyScroll>
            <div class="list" @click="chooseAddress">
              <div class="item" v-for="item in suggestList" :data-location="item.location">
                <p class="name">{{ item.name }}</p>
                <p class="district">{{ item.district }}</p>
              </div>
            </div>
          </MyScroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type { Coord } from '@/types/http'
import type { SearchHotCitysData, SearchSuggestData } from '@/types/searchInfo'
import { getSearchHotCitys, getSearchSuggest } from '@/http'
import MyScroll from './components/MyScroll.vue'

// inject 注入
const location = inject<Ref<Coord>>('location')!
const mapCenter = inject<Ref<[number, number]>>('mapCenter')!

// 搜索关键字
const searchKey = ref('')
// 搜索联想(结果)框是否可见
const isSuggestVisible = ref(false)

// 获取热门城市信息
const hotCitysList = ref<SearchHotCitysData[]>([])
const getSearchHotCitysInfo = async () => {
  const res = await getSearchHotCitys()
  console.log(res)
  hotCitysList.value = res.data
}
// 选择热门城市 点击事件 获得位置信息并更新 location mapCenter
const chooseCity = (e: MouseEvent) => {
  console.log(e)
  let target = e.target as HTMLElement | null
  if (target && target.tagName.toLowerCase() === 'span') {
    let info = target.dataset.info?.split(',')
    console.log(info)
    if (info) {
      let lat = parseFloat(info[0])
      let lng = parseFloat(info[1])
      location.value = { lat, lng }
      mapCenter.value = [lng, lat]
    }
  }
  isSuggestVisible.value = false
}

// 获取搜索建议(结果)
const suggestList = ref<SearchSuggestData[]>([])
const getSearchSuggestInfo = async () => {
  const res = await getSearchSuggest(searchKey.value)
  console.log(res)
  suggestList.value = res.data
}
// 选择搜索地址 点击事件 获得位置信息并更新 location mapCenter
const chooseAddress = (e: MouseEvent) => {
  console.log(e)
  const target = (e.target as HTMLElement) || null
  const item = target.closest('.item')
  if (item) {
    const loca = item.getAttribute('data-location')
    if (loca) {
      const lArr = loca.split(',')
      console.log(lArr)
      let lat = parseFloat(lArr[1])
      let lng = parseFloat(lArr[0])
      location.value = { lat, lng }
      mapCenter.value = [lng, lat]
    }
  }
  isSuggestVisible.value = false
}

onMounted(() => {
  getSearchHotCitysInfo()
})
watchEffect(() => {
  if (searchKey.value) {
    console.log(searchKey.value)
    getSearchSuggestInfo()
  }
})
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #000;
  overflow: visible;

  .logo-img {
    font-size: 30px;
    font-weight: 700;
    color: $green-g;
    margin: auto 0;
    img {
      height: 40px;
      margin-left: 15px;
      margin-right: 15px;
    }
  }

  .search {
    position: relative;

    .search-input {
      width: 400px;
      height: 36px;
      margin: 7px 200px 7px 0;
      padding: 5px 10px;
      font-size: 16px;
      color: #444;
      background: #ebeaea;
      border-radius: 5px;
      border: 1px solid #dcdfe6;
      cursor: text;
      z-index: 0;
    }

    .search-suggest {
      position: absolute;
      top: 49px;
      width: 400px;
      height: 370px;
      border: 1px solid #e5e5e5;
      background-color: #ffffff;
      z-index: 5;
      .hot-citys {
        .title {
          text-align: left;
          font-size: 16px;
          height: 30px;
          line-height: 30px;
          margin-left: 16px;
          user-select: none;
        }
        .citys {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;

          margin: 0 10px;
          text-align: center;
          .item {
            cursor: pointer;
            height: 30px;
            line-height: 30px;
            width: 54px;
            margin: 4px;
            font-size: 14px;
            border-radius: 2px;
            border: none;
            background: #f7f7f7;
          }
        }
      }
      .suggest-list {
        .list {
          position: relative;
          top: 0;
          left: 0;
          margin: 0;
          padding: 0 20px;
          max-height: 400px;
          background: #fff;
          text-align: left;

          .item {
            padding: 10px 0;
            border-bottom: 1px solid #e5e5e5;
            cursor: pointer;
            .name {
              font-size: 15px;
            }
            .district {
              color: #666;
              font-size: 13px;
              padding-top: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
