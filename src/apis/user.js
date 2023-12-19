// for all requests about user

import { request } from '@/utils'

// 1. login request
export function loginAPI(formData) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: formData
  })
}

// 2. fetch user information
export function getProfileAPI() {
  return request({
    url: '/user/profile',
    method: 'GET'
  })
}