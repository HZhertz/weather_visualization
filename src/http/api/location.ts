import instance from '../instance'
import type { Coord } from '@/types/http'
import type { LocationGeoRes } from '@/types/geoInfo.d.ts'
import type { LocationBaseElementRes, LocationEleDetailRes, LocationLifeIndexRes } from '@/types/weaInfo.d.ts'
import type { LocationWarnRes } from '@/types/warnInfo'
import { LocationAqiRes } from '@/types/aqiInfo'

// 获取地理信息
export const getLocationGeo = ({ lat, lng }: Coord): Promise<LocationGeoRes> => {
  return instance({
    method: 'GET',
    url: `/location/geo?lat=${lat}&lon=${lng}`,
  })
}
// 获取天气信息
export const getLocationBaseElement = ({ lat, lng }: Coord): Promise<LocationBaseElementRes> => {
  return instance({
    method: 'GET',
    url: `/location/basel?lat=${lat}&lon=${lng}`,
  })
}
// 获取生活指数
export const getLocationLifeIndex = ({ lat, lng }: Coord): Promise<LocationLifeIndexRes> => {
  return instance({
    method: 'GET',
    url: `/location/lifeindex?lat=${lat}&lon=${lng}`,
  })
}
// 获取预警信息
export const getLocationWarning = ({ lat, lng }: Coord): Promise<LocationWarnRes> => {
  return instance({
    method: 'GET',
    url: `/location/warninfo?lat=${lat}&lon=${lng}`,
  })
}
// 获取要素详情(实况、预测)
export const getLocationEleDetail = ({ lat, lng }: Coord): Promise<LocationEleDetailRes> => {
  return instance({
    method: 'GET',
    url: `/location/eledetail?lat=${lat}&lon=${lng}`,
  })
}
// 获取空气指数
export const getLocationAqiQuality = ({ lat, lng }: Coord): Promise<LocationAqiRes> => {
  return instance({
    method: 'GET',
    url: `/location/aqiquality?lat=${lat}&lon=${lng}`,
  })
}
