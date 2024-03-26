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

export type LocationGeoRes = Res<LocationGeoData>
