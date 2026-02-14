import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import axiosInstance from '../../utils/axios'

const fetchGetAllOrders = createAsyncThunk(
  'order/fetchGetAllOrders',
  async () => {
    try {
      const res = await axiosInstance.get('/vk-orders/all')
      return res.data
    } catch (error) {
      message.error('Ошибка при загрузке списка заказов ВК')
      console.log(error)
    }
  },
)

const initialState = {
  isLoading: true,
  orders: [],
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //cteate subscribe vk user
    builder
      //get all vk orders
      .addCase(fetchGetAllOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetAllOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = [...action.payload]
      })
      .addCase(fetchGetAllOrders.rejected, (state) => {
        state.isLoading = false
        state.orders = []
      })
  },
})

export const { _ } = orderSlice.actions
export { fetchGetAllOrders }
export default orderSlice.reducer
