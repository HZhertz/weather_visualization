import type { Res } from '@/types/http'

interface LocationWarnData {
  expires: string
  procince: string
  leveltype: number
  signaltypecode: string
  lon: number
  zoom: number
  issuecontent: string
  warnDefine?: {
    id: number
    typeName: string
    typecode: string
    define: string
    suggest: string
  }
  signallevelcode: string
  reference: string
  areaId: string
  signallevel: string
  dataid: string
  sender: string
  codename: string
  name: string
  time: string
  msgtype: string
  lat: number
  procincecode: string
}

export type LocationWarnRes = Res<LocationWarnData[]>
