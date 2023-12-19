import axios from "axios"
import { getToken } from "./token"

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
  return Promise.reject(error)
})

export { request }