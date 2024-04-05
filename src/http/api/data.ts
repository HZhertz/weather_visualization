import instance from '../instance'

// 获取空气指数散点数据
export const getAqiScatter = (type: string) => {
  return instance({
    method: 'GET',
    url: `/data/scatter/aqi?type=${type}`,
  })
}
