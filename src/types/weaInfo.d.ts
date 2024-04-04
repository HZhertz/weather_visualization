import type { Res } from '@/types/http'

interface LocationBaseElementData {
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

interface StationData {
  hover: string
  list: [string, number][][]
  value: string
}
interface LocationEleDetailData {
  sk: StationData
  yc: StationData
}

export type LocationBaseElementRes = Res<LocationBaseElementData>
export type LocationLifeIndexRes = Res<LocationLifeIndexData>
export type LocationEleDetailRes = Res<LocationEleDetailData>
