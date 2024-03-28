import axios from 'axios'

const instance = axios.create({
  // baseURL: import.meta.env.BASE_URL,
  baseURL: 'http://127.0.0.1:3007/',
  // timeout: 10000,
})

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
    const res = response.data
    return res
  },
  (error) => {
    console.error('err' + error) 
    return Promise.reject(error)
  }
)

export default instance
