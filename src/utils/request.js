import axios from "axios"
import { getToken, removeToken } from "./token"
import router from "@/router"

/**
 * axois encapsulation
 * 1. base url
 * 2. timeout
 * 3. request
 **/

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// add some parameters before send a request
request.interceptors.request.use((config) => {
  // inject token to request header
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// intercept response bofore return to client side, handle with response data
request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  console.dir(error)
  if (error.response.status === 401) {
    removeToken()
    router.navigate('/login')
    window.location.reload()
  }
  return Promise.reject(error)
})

export { request }