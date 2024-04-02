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
        @focus="showSuggest"
        @blur="delayHideSuggest"
      />
      <div class="search-suggest" v-show="isSuggestVisible">
        <div class="hot-citys">
          <div class="title">热门城市</div>
          <div class="citys" @click="chooseCity">
            <span class="item" v-for="item in hotCitysList" :data-info="item">{{ item[2] }}</span>
          </div>
        </div>
        <div class="res-list"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, inject, onMounted, ref } from 'vue'
import { getSearchHotCitys } from '@/http'
import { SearchHotCitysData } from '@/types/searchInfo'
import { ProxyCoord } from '@/types/http'

const searchKey = ref('')

const isSuggestVisible = ref(false)
const showSuggest = () => {
  isSuggestVisible.value = true
}
let hideSuggestTimeout: NodeJS.Timeout
const delayHideSuggest = () => {
  hideSuggestTimeout = setTimeout(() => {
    isSuggestVisible.value = false
  }, 300)
}

const hotCitysList = ref<SearchHotCitysData>([])
const getSearchHotCitysInfo = async () => {
  const res = await getSearchHotCitys()
  console.log(res)
  hotCitysList.value = res.data
}

const location = inject<Ref<ProxyCoord>>('location')!
const chooseCity = (e: MouseEvent) => {
  console.log(e)
  let target = e.target as HTMLElement | null
  if (target && target.tagName.toLowerCase() === 'span') {
    let info = target.dataset.info?.split(',')
    if (info) {
      location.value.lat = parseInt(info[0])
      location.value.lng = parseInt(info[1])
    }
  }
  if (hideSuggestTimeout) {
    clearTimeout(hideSuggestTimeout)
  }
  isSuggestVisible.value = false
}

onMounted(() => {
  getSearchHotCitysInfo()
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
      margin: 7px 180px 7px 0;
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
      height: 360px;
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
    }
  }
}
</style>
