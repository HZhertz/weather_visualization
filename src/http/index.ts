import instance from './instance'
import type { Coord } from '@/types/http'
import type { LocationGeoRes } from '@/types/geoInfo.d.ts'
import type { LocationBaseElementRes, LocationEleDetailRes, LocationLifeIndexRes } from '@/types/weaInfo.d.ts'
import type { LocationWarnRes } from '@/types/warnInfo'

export const getLocationGeo = ({ lat, lng }: Coord): Promise<LocationGeoRes> => {
  return instance({
    method: 'GET',
    url: `/location/geo?lat=${lat}&lon=${lng}`,
  })
}

export const getLocationBaseElement = ({ lat, lng }: Coord): Promise<LocationBaseElementRes> => {
  return instance({
    method: 'GET',
    url: `/location/basel?lat=${lat}&lon=${lng}`,
  })
}

export const getLocationLifeIndex = ({ lat, lng }: Coord): Promise<LocationLifeIndexRes> => {
  return instance({
    method: 'GET',
    url: `/location/lifeindex?lat=${lat}&lon=${lng}`,
  })
}

export const getLocationWarning = ({ lat, lng }: Coord): Promise<LocationWarnRes> => {
  return instance({
    method: 'GET',
    url: `/location/warninfo?lat=${lat}&lon=${lng}`,
  })
}
export const getLocationEleDetail = ({ lat, lng }: Coord): Promise<LocationEleDetailRes> => {
  return instance({
    method: 'GET',
    url: `/location/eledetail?lat=${lat}&lon=${lng}`,
  })
}
