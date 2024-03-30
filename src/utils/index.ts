import { BC } from '@/assets/ts'

export const getImageUrl = (path: String) => {
  console.log(new URL(`../assets/img/${path}`, import.meta.url).href)
  return new URL(`../assets/img/${path}`, import.meta.url).href
}
export const formatVis = (visString: string) => {
  return (Number(visString) / 1000).toFixed(1)
}
export const formatPre = (preString: string) => {
  return Number(preString) < 0 ? 0 : Number(preString).toFixed(1)
}

export const formatLineChartTime = (arr: [string, number][]) => {
  return arr.map(([time, value]) => {
    const newTime = `${time.slice(6, 8)}日${time.slice(8, 10)}时`
    return [newTime, value]
  })
}

export const getColor = (value: number) => {
  if (value < 50) {
    return BC[0][1]
  } else if (value < 100) {
    return BC[1][1]
  } else if (value < 150) {
    return BC[2][1]
  } else if (value < 200) {
    return BC[3][1]
  } else if (value < 300) {
    return BC[4][1]
  } else {
    return BC[5][1]
  }
}
