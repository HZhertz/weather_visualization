import type { Res } from '@/types/http'

interface landData {
  formatted_address: string
  location: {
    lon: number
    lat: number
  }
  addressComponent: {
    address: string
    city: string
    county_code: string
    nation: string
    poi_position: string
    county: string
    city_code: string
    address_position: string
    poi: string
    province_code: string
    province: string
    road?: string
    road_distance?: number
    poi_distance: number
    address_distance: number
    info?: string
  }
}
interface seaareaData {
  formatted_address: string
  addressComponent: {
    city: []
    province: string
    adcode: string
    district: []
    towncode: []
    streetNumber: {
      number: []
      direction: []
      distance: []
      street: []
    }
    country: string
    township: []
    seaArea: string
    businessAreas: [[]]
    building: {
      name: []
      type: []
    }
    neighborhood: {
      name: []
      type: []
    }
    citycode: []
  }
}
interface pointData {
  location: string
}

type LocationGeoData = landData | seaareaData | pointData

export type LocationGeoRes = Res<LocationGeoData>
