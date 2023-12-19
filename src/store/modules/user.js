import { request } from "@/utils"
import { createSlice } from "@reduxjs/toolkit"
import { setToken as _setToken, getToken } from '@/utils'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      state.token = _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    }
  }
})

const { setToken, setUserInfo } = userStore.actions


// async methods
/**
 * 
 * @param {object} loginForm 
 * @returns dispatch update value of token
 */
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 1. send request
    const res = await request.post('/authorizations', loginForm)
    // 2. invoke sync method to set token
    dispatch(setToken(res.data.token))
  }
}

const fetchUserInfo = () => {
  return async (dispatch) => {
    // 1. send request 
    const res = await request.get('/user/profile')
    // 2. invoke sync method to set userInfo
    dispatch(setUserInfo(res.data))
  }
}

const userReducer = userStore.reducer

export { setToken, fetchLogin, fetchUserInfo }

export default userReducer