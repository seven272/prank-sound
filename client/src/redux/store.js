import { configureStore } from '@reduxjs/toolkit'

import categorySlice from './slices/categorySlice'
import soundSlice from './slices/soundSlice'
import authSlice from './slices/authSlice'
import vkUserSlice from './slices/vkUserSlice'

const store = configureStore({
  reducer: {
    category: categorySlice,
    sound: soundSlice,
    auth: authSlice,
    vkUser: vkUserSlice
  },
})

export default store
