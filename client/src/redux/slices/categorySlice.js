import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import axiosInstance from '../../utils/axios'

const fetchGetAllCategories = createAsyncThunk(
  'category/fetchGetAllCategories',
  async () => {
    try {
      const res = await axiosInstance.get('/categories/all')
      return res.data
    } catch (error) {
      message.error('Ошибка при загрузке категорий')
      console.log(error)
    }
  }
)

const fetchCreateCategory = createAsyncThunk(
  'category/fetchCreateCategory',
  async ({ title, alias, imageUrl }) => {
    try {
      const res = await axiosInstance.post('/categories/new', {
        title,
        alias,
        imageUrl
      })

      message.success('Новая категория создана')
      return res.data
    } catch (error) {
      message.error('Ошибка при создании категории')
      console.log(error)
    }
  }
)

const fetchDeleteCategory = createAsyncThunk(
  'category/fetchDeleteCategory',
  async (categoryId) => {
    try {
      const res = await axiosInstance.delete(
        `categories/${categoryId}`
      )

      message.success('Категория успешно удалена')
      console.log(res.dada)
      return res.data
    } catch (error) {
      message.error('Ошибка при удалении категории')
      console.log(error)
    }
  }
)

const fetchUpdateCategory = createAsyncThunk(
  'category/fetchUpdateCategory',
  async ({ title, alias, imageUrl, categoryId }) => {
    try {
      const res = await axiosInstance.put(
        `/categories/${categoryId}`,
        {
          title,
          alias,
          imageUrl
        }
      )

      message.success('Категория отредактиована')
      return res.data
    } catch (error) {
      message.error('Ошибка при редактировании категории')
      console.log(error)
    }
  }
)



// Начальное значение
const initialState = {
  isLoading: true,
  categories: [],  
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {

  },
  extraReducers: (builder) => {
    //get all categories
    builder
      .addCase(fetchGetAllCategories.pending, (state) => {
        state.isLoading = true
        state.categories = []
      })
      .addCase(fetchGetAllCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = [...action.payload]
      })
      .addCase(fetchGetAllCategories.rejected, (state) => {
        state.isLoading = false
        state.categories = []
      })
      //create category
      .addCase(fetchCreateCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCreateCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = [...state.categories, action.payload]
      })
      .addCase(fetchCreateCategory.rejected, (state) => {
        state.isLoading = false
        state.categories = []
      })
      //delete category
      .addCase(fetchDeleteCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchDeleteCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = state.categories.filter((elem) => {
          return elem._id !== action.payload._id
        })
      })
      .addCase(fetchDeleteCategory.rejected, (state) => {
        state.isLoading = false
        state.categories = []
      })
      //update category
      .addCase(fetchUpdateCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUpdateCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = state.categories.map((elem) => {
          if (elem._id === action.payload._id) {
            return action.payload
          }
          return elem
        })
      })
      .addCase(fetchUpdateCategory.rejected, (state) => {
        state.isLoading = false
        state.categories = [...state.categories]
      })
      
  },
})

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
// export const {} = categorySlice.actions

export {
  fetchGetAllCategories,
  fetchCreateCategory,
  fetchDeleteCategory,
  fetchUpdateCategory,
  
}

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default categorySlice.reducer
