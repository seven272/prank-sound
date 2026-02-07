import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import axiosInstance from '../../utils/axios'

const fetchCreateVkUser = createAsyncThunk(
  'vkUser/fetchCreateVkUser',
  async (vk_id) => {
    console.log(vk_id)
    try {
      const res = await axiosInstance.post('/vk-users/create', {
        vk_id,
        isPaid: true,
      })
      console.log(res.dada)
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
    try {
      // const state = thunkAPI.getState()
      // const currentUserId = state.vk_id
      const res = await axiosInstance.get('/vk-users/one', {
        vk_id: userIdFromVK,
      })
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)

const fetchSubscribing = createAsyncThunk(
  'auth/fetchSubscribing',
  async (user) => {
    console.log(user)
    try {
      const res = await axiosInstance.patch(
        '/auth/subscription',
        user,
      )
      message.success('Подписка успешно оформлена')
      console.log(res.data)
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
    //cteate vk user
    builder
      .addCase(fetchCreateVkUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCreateVkUser.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(fetchCreateVkUser.rejected, (state) => {
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
      .addCase(fetchFindVkUser.fulfilled, (state) => {
        state.isLoading = false
        state.isPaid = true
      })
      .addCase(fetchFindVkUser.rejected, (state) => {
        state.isLoading = false
      })
      //subscribing
      .addCase(fetchSubscribing.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSubscribing.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = { ...action.payload }
      })
      .addCase(fetchSubscribing.rejected, (state) => {
        state.isLoading = false
      })
  },
})
const checkIsAuthVk = (state) => Boolean(state.vkUser.vk_id)
export const { setVkUser, deleteVkUser } = vkUserSlice.actions
export {
  fetchCreateVkUser,
  fetchGetAllVkUsers,
  fetchFindVkUser,
  fetchSubscribing,
  checkIsAuthVk,
}
export default vkUserSlice.reducer
