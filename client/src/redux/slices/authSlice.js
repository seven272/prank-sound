import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import axiosInstance from '../../utils/axios'

const fetchRegisterUser = createAsyncThunk(
  'auth/fetchRegisterUser',
  async ({ username, password }) => {
    try {
      const res = await axiosInstance.post('/auth/register', {
        username,
        password,
        isAdmin: false,
      })

      message.success('Вы успешно зарегистрировались')
      console.log(res.dada)
      return res.data
    } catch (error) {
      message.error('Ошибка при регистрации')
      console.log(error)
    }
  }
)

const fetchLoginUser = createAsyncThunk(
  'auth/fetchLoginUser',
  async ({ username, password }) => {
    try {
      const res = await axiosInstance.post('/auth/login', {
        username,
        password,
      })

      message.success('Вы успешно вошли в систему')
      return res.data
    } catch (error) {
      console.log(error)
      message.error('Ошибка при авторизации')
    }
  }
)

const fetchLogoutUser = createAsyncThunk(
  'auth/fetchLogoutUser',
  async (_, { dispatch }) => {
    try {
      const res = await axiosInstance.post('/auth/logout')
      dispatch(logout())
      message.success('Вы покинули сайт')
      return res.data
    } catch (error) {
      console.log(error)
      message.error('Ошибка при выходе из системы')
    }
  }
)

const fetchGetMe = createAsyncThunk('auth/fetchGetMe', async () => {
  try {
    const res = await axiosInstance.get('/auth/me')
    return res.data
  } catch (error) {
    console.log(error)
  }
})

const fetchSubscribing = createAsyncThunk(
  'auth/fetchSubscribing',
  async (user) => {
    console.log(user)
    try {
      const res = await axiosInstance.patch(
        '/auth/subscription',
        user
      )
      message.success('Подписка успешно оформлена')
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
)

const initialState = {
  isLoading: true,
  isAdmin: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null,
      state.isAdmin = false,
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    //register user
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.newUser
      })
      .addCase(fetchRegisterUser.rejected, (state) => {
        state.isLoading = false
      })
      //login user
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        console.log('Redux succsess login')
        state.isLoading = false
        state.user = action.payload?.user
      })
      .addCase(fetchLoginUser.rejected, (state) => {
        console.log('Redux error login')

        state.isLoading = false
        state.user = null
      })

      //logout user
      .addCase(fetchLogoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(fetchLogoutUser.rejected, (state) => {
        state.isLoading = false
      })
      //get me
      .addCase(fetchGetMe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetMe.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload?.user
        state.isAdmin = action.payload?.user.isAdmin
      })
      .addCase(fetchGetMe.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.isAdmin = false
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
const checkIsAuth = (state) => Boolean(state.auth.user)
export const { logout } = authSlice.actions
export {
  fetchRegisterUser,
  fetchLoginUser,
  fetchGetMe,
  fetchLogoutUser,
  fetchSubscribing,
  checkIsAuth,
}
export default authSlice.reducer
