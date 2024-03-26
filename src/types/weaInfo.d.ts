import type { Res } from '@/types/http'

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

interface LocationLifeIndexData {
  returnCode: string
  DS: {
    unit: string
    validTime: number
    value: number
    fastEle: string
    level?: number
    feel?: string
  }[]
}

export type LocationBaseElementRes = Res<LocationBaseElementData>
export type LocationLifeIndexRes = Res<LocationLifeIndexData>
