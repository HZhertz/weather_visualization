import { DR, BC } from '@/assets/ts'
import { LocationGeoRes } from '@/types/geoInfo'
import { LocationWarnData } from '@/types/warnInfo'

// 获取图片路径
export const getImageUrl = (path: String) => {
  // console.log(new URL(`../assets/img/${path}`, import.meta.url).href)
  return new URL(`../assets/img/${path}`, import.meta.url).href
}

// 格式化地理信息
export const formatAddress = (res: LocationGeoRes) => {
  if (res.infoType === 'domestic' && 'addressComponent' in res.data && 'poi' in res.data.addressComponent) {
    const province = res.data.addressComponent.province
    const city = res.data.addressComponent.city
    const county = res.data.addressComponent.county
    const poi = res.data.addressComponent.poi
    const nonEmptyComponents = [province, city, county, poi].filter((component) => component.length !== 0)
    return nonEmptyComponents.slice(-3).join('—')
  } else if (
    res.infoType === 'abroad' &&
    'addressComponent' in res.data &&
    'nation' in res.data.addressComponent
  ) {
    const nation = res.data.addressComponent.nation
    const poi = res.data.addressComponent.poi
    return [nation, poi].join('—')
  } else if (
    res.infoType === 'seaArea' &&
    'addressComponent' in res.data &&
    'seaArea' in res.data.addressComponent
  ) {
    const province = res.data.addressComponent.province
    const seaArea = res.data.addressComponent.seaArea
    return [province, seaArea].join('—')
  } else if (res.infoType === 'point' && 'location' in res.data && typeof res.data.location === 'string') {
    let str = res.data.location
    let [longitude, latitude] = str.split(',').map(parseFloat)
    console.log('longitude, latitude', longitude, latitude)
    let absLongitude = Math.abs(longitude)
    let formattedLongitude = absLongitude.toFixed(2) + '°' + (longitude >= 0 ? 'E' : 'W')
    let absLatitude = Math.abs(latitude)
    let formattedLatitude = absLatitude.toFixed(2) + '°' + (latitude >= 0 ? 'N' : 'S')

    return `(${formattedLongitude},${formattedLatitude})`
  }
}
// 格式化风向信息
export const formatWind = (degree: number) => {
  for (var i = 0; i < DR.length; i++) {
    if (degree >= DR[i][0] && degree < DR[i][1]) {
      return DR[i][2]
    }
  }

  return '无效的风向值'
}
// 格式化风速信息
export const formatWins = (windSpeed: number) => {
  var speeds = [0.5, 1.6, 3.4, 5.5, 8, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7]
  for (var i = 0; i < speeds.length; i++) {
    if (windSpeed < speeds[i]) {
      return i + '级'
    }
  }
  return 12 + '级'
}
// 格式化能见度信息
export const formatVis = (visString: string) => {
  return (Number(visString) / 1000).toFixed(1)
}
// 格式化降水信息
export const formatPre = (preString: string) => {
  return Number(preString) < 0 ? 0.0 : Number(preString).toFixed(1)
}
// 处理重复预警信息
export const deduplicateWarn = (warninfoList: LocationWarnData[]) => {
  return Object.values(
    warninfoList.reduce((acc: { [key: string]: LocationWarnData }, cur: LocationWarnData) => {
      let key = cur.signaltypecode + cur.sender
      if (!acc[key] || new Date(acc[key].time) < new Date(cur.time)) {
        acc[key] = cur
      }
      return acc
    }, {})
  )
}

// 格式化折线图时间
export const formatLineChartTime = (arr: [string, number][]) => {
  return arr.map(([time, value]) => {
    const newTime = `${time.slice(6, 8)}日${time.slice(8, 10)}时`
    return [newTime, value]
  })
}

// 获得仪表盘各项颜色
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

// 将获取的散点数据转为 GeoJSON 格式
export const convertToGeoJSON = (data: any) => {
  return {
    type: 'FeatureCollection',
    features: data.map((item: any) => ({
      type: 'Feature',
      properties: {
        unit: item.unit,
        code: item.code,
        province: item.province,
        city: item.city,
        name: item.name,
        id: item.id,
        value: item.value,
      },
      geometry: {
        type: 'Point',
        coordinates: [item.lon, item.lat],
      },
    })),
  }
}

// 获得散点颜色
export const getScatterColor = (val: number, valArr: number[], colorArr: string[]) => {
  const index = valArr.findIndex((item) => {
    return item >= val
  })
  if (index === -1) {
    return colorArr.at(-1)
  }
  return colorArr[index]
}
