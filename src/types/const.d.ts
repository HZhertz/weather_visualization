export interface ColorScaleItem {
  name: string
  unit: string
  type: string
  code: string
  value: number[]
  text?: string[] | number[]
  color: string[]
}

export type ColorScale = {
  [key: string]: ColorScaleItem
}
