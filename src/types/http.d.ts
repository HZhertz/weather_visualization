export interface Coord {
  lat: number
  lng: number
}
export type ProxyCoord = {
  [P in keyof Coord]: Coord[P]
}

export type Res<Data> = {
  status: number
  type: string
  message: string
  data: Data
  count?: string
}
