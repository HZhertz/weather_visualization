import instance from '../instance'
// import type { SearchHotCitysRes } from '@/types/searchInfo'
// : Promise<SearchHotCitysRes>
export const getAqiScatter = (type: string) => {
  return instance({
    method: 'GET',
    url: `/data/scatter/aqi?type=${type}`,
  })
}
