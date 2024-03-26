import instance from './instance'
import type { Coord } from '@/types/http'
import type { LocationBaseElementRes, LocationGeoRes } from '@/types/geoInfo.d.ts'

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
