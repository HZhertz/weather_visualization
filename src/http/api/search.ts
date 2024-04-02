import instance from '../instance'
import type { SearchHotCitysRes, SearchSuggestRes } from '@/types/searchInfo'

export const getSearchHotCitys = (): Promise<SearchHotCitysRes> => {
  return instance({
    method: 'GET',
    url: '/search/hot',
  })
}
export const getSearchSuggest = (keywords: string): Promise<SearchSuggestRes> => {
  return instance({
    method: 'GET',
    url: `/search/suggest?keywords=${keywords}`,
  })
}
