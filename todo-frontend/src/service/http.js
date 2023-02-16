/* 创建axios实例，配置请求头、拦截器 */

import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // baseURL: 'http://localhost:8080/api/',
  timeout: 10000
})

// service.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')

// 请求拦截器
service.interceptors.request.use((config) => {
  if (config.url === '/api/login' || config.url === '/api/register') {
    return config
  } else {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    return config
  }
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  if (response.data.status === -999) {
    localStorage.clear()
    location.href = 'http://localhost:8001/#/login'
    return
  }
  return response
}, (error) => {
  return Promise.reject(error)
})

// 导出axios实例
export default service
