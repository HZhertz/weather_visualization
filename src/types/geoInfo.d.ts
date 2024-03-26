import type { Res } from '@/types/http'

interface LocationGeoData {
  status: string
  regeocode: {
    addressComponent: {
      adcode: string
      building: {
        name: string[]
        type: string[]
      }
      businessAreas: {
        location: string
        name: string
        id: string
      }[]
      city: string[] | string
      citycode: string
      country: string
      district: string
      neighborhood: {
        name: string
        type: string
      }
      province: string
      streetNumber: {
        number: string
        location: string
        direction: string
        distance: string
        street: string
      }
      towncode: string
      township: string
    }
    formatted_address: string
  }
  info: string
  infocode: string
}

interface LocationBaseElementData {
  DS: {
    valueTem: string
    valueRhu: string
    winDir: string
    winSpeed: string
    valuePre: string
    stationName: string
    country: string
    stationId: string
    province: string
    city: string
    district: string
    areacode: string
  }
  uvi: {
    uvi: string
    level: string
    strength: string
    date: string
    hour: string
  }
  list: {
    unit: string
    validTime: string
    value: string
    fastEle: string
  }[]
}

export type LocationGeoRes = Res<LocationGeoData>
export type LocationBaseElementRes = Res<LocationBaseElementData>
