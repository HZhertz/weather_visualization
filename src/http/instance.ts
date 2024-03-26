import axios from 'axios'

const instance = axios.create({
  // baseURL: import.meta.env.BASE_URL,
  baseURL: 'http://127.0.0.1:3007/',
  timeout: 5000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.error(error)
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    // 在这里你可以根据后端的接口返回格式，对响应数据做一些处理
    const res = response.data
    return res
  },
  (error) => {
    // 对响应错误做点什么
    console.error('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default instance
