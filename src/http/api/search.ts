import instance from '../instance'
import type { SearchHotCitysRes, SearchSuggestRes } from '@/types/searchInfo'

// 获取搜索栏热门城市
export const getSearchHotCitys = (): Promise<SearchHotCitysRes> => {
  return instance({
    method: 'GET',
    url: '/search/hot',
  })
}
// 获取搜索建议(结果)
export const getSearchSuggest = (keywords: string): Promise<SearchSuggestRes> => {
  return instance({
    method: 'GET',
    url: `/search/suggest?keywords=${keywords}`,
  })
}
