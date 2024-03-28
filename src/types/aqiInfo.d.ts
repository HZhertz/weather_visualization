import type { Res } from '@/types/http'

interface LocationAqiData {
  returnCode: number
  elementNames: string

  elements: string
  units: string
  message: string
  data: {
    PM2p5_Densty: string
    V15471_IAQI: string
    V_PPOLLU: string
    V15826_08: string
    V15810: string
    V15826_01_IAQI: string
    V_PROV: string
    V_AQI: string
    V15471: string
    V15826_08_IAQI: string
    V15823_IAQI: string
    D_DATETIME: string
    V15817: string
    Lon: string
    V15472_IAQI: string
    V_CITY: string
    Station_SiteName: string
    V15823: string
    V15817_IAQI: string
    V15810_IAQI: string
    V15826_01: string
    V_QUAL: string
    PM10_Densty_Fore: string
    STATION_Id_C: string
    Lat: string
  }
}

export type LocationAqiRes = Res<LocationAqiData>
