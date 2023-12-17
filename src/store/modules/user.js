import { request } from "@/utils"
import { createSlice } from "@reduxjs/toolkit"

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    }
  }
})

const { setToken } = userStore.actions

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

const userReducer = userStore.reducer

export { setToken, fetchLogin }

export default userReducer