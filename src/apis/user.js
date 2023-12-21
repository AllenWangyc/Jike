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

// 3. get all channels in publish page
export function getChannelAPI() {
  return request({
    url: 'channels',
    method: 'GET',
  })
}

// 4. pulish article
export function createArticleAPI(data) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}

// 5. get article list in Article page
export function getArticleListAPI(data) {
  return request({
    url: '/mp/articles',
    method: 'GET',
    data
  })
}

// 6. delete article item
export function delArticleAPI(id) {
  return request({
    url: `mp/articles/${id}`,
    method: 'DELETE'
  })
}

// 7. get article
export function getArticleById(id) {
  return request({
    url: `mp/articles/${id}`,
    method: 'GET'
  })
}