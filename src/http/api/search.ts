import instance from '../instance'
import type { SearchHotCitysRes } from '@/types/searchInfo'

export const getSearchHotCitys = (): Promise<SearchHotCitysRes> => {
  return instance({
    method: 'GET',
    url: '/search/hot',
  })
}
