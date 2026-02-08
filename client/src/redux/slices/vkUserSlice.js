import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import axiosInstance from '../../utils/axios'

const fetchPurchase = createAsyncThunk(
  'vkUser/fetchPurchase',
  async () => {
    
    try {
      const res = await axiosInstance.post('/vk-users/pay')
      console.log(res.data)
      return res.data
    } catch (error) {
      message.error('Ошибка при оплате подписки через Вконтакте')
      console.log(error)
    }
  },
)

const fetchSubscribe = createAsyncThunk(
  'vkUser/fetchSubscribe',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState()
    const currentUserId = state.vkUser.vk_id
    console.log(currentUserId)
    try {
      const res = await axiosInstance.post('/vk-users/create', {
        vk_id: currentUserId,
        isPaid: true,
      })
      console.log(res.data)
      message.success('Подписка успешно оформлена')
      return res.data
    } catch (error) {
      message.error('Ошибка при добавлении данных об подписке в БД')
      console.log(error)
    }
  },
)

const fetchGetAllVkUsers = createAsyncThunk(
  'vkUser/fetchGetAllVkUsers',
  async () => {
    try {
      const res = await axiosInstance.get('/vk-users/all')
      console.log(res.data)
      return res.data
    } catch (error) {
      message.error('Ошибка при загрузке списка пользователей ВК')
      console.log(error)
    }
  },
)

const fetchFindVkUser = createAsyncThunk(
  'vkUser/fetchFindVkUser',
  async (userIdFromVK) => {
    const vkId = String(userIdFromVK)
    try {
      const res = await axiosInstance.get(`/vk-users/${vkId}`)

      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)

const initialState = {
  isLoading: true,
  vk_id: '',
  vk_name: '',
  vk_avatar: '',
  isPaid: false,
  vk_users: [],
}

const vkUserSlice = createSlice({
  name: 'vkUser',
  initialState,
  reducers: {
    setVkUser: (state, action) => {
      state.vk_id = String(action.payload.id)
      state.vk_name = action.payload.first_name
      state.vk_avatar = action.payload.photo_100
    },
    deleteVkUser: (state) => {
      state.vk_id = ''
      state.vk_name = ''
      state.vk_avatar = ''
      state.isPaid = false
    },
  },
  extraReducers: (builder) => {
    //cteate subscribe vk user
    builder
      .addCase(fetchSubscribe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSubscribe.fulfilled, (state, action) => {
        const objUser = action.payload
        state.isLoading = false
        if(Object.keys(objUser).length > 0) {
            state.isPaid = true
        }
      })
      .addCase(fetchSubscribe.rejected, (state) => {
        state.isLoading = false
      })
      //get all vk users
      .addCase(fetchGetAllVkUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetAllVkUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.vk_users = [...action.payload]
      })
      .addCase(fetchGetAllVkUsers.rejected, (state) => {
        state.isLoading = false
        state.vk_users = []
      })
      //get one vk user
      .addCase(fetchFindVkUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchFindVkUser.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.vk_id === state.vk_id) {
          state.isPaid = true
        }
      })
      .addCase(fetchFindVkUser.rejected, (state) => {
        state.isLoading = false
      })
  },
})
const checkIsAuthVk = (state) => Boolean(state.vkUser.vk_id)
export const { setVkUser, deleteVkUser } = vkUserSlice.actions
export {
  fetchSubscribe,
  fetchGetAllVkUsers,
  fetchFindVkUser,
  fetchPurchase,
  checkIsAuthVk,
}
export default vkUserSlice.reducer
