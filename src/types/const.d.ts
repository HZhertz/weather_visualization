export type ColorScale = {
  [key: string]: {
    name: string
    unit: string
    type: string
    value: number[]
    text?: string[] | number[]
    color: string[]
  }
}
