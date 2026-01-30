import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import axiosInstance from '../../utils/axios'

const fetchGetAllSounds = createAsyncThunk(
  'sound/fetchGetAllSounds',
  async () => {
    try {
      const res = await axiosInstance.get('/sounds/all')
      return res.data
    } catch (error) {
      message.error('Ошибка при загрузке всех звуков')
      console.log(error)
    }
  }
)

const fetchGetCategorySounds = createAsyncThunk(
  'sound/fetchGetCategorySounds',
  async (alias) => {
    try {
      const res = await axiosInstance.get(`/sounds/category/${alias}`)
      return res.data
    } catch (error) {
      message.error('Ошибка при загрузке звуков для категории')
      console.log(error)
    }
  }
)

const fetchGetOneSound = createAsyncThunk(
  'sound/fetchGetOneSound',
  async (id) => {
    try {
      const res = await axiosInstance.get(`sounds/${id}`)
      console.log(res.dada)
      return res.data
    } catch (error) {
      message.error('Ошибка при получении данных о мелодии')
      console.log(error)
    }
  }
)

const fetchCreateSound = createAsyncThunk(
  'sound/fetchCreateSound',
  async (soundData) => {
    try {
      const res = await axiosInstance.post('/sounds/new', soundData)

      message.success('Новый звук создан успешно')
      return res.data
    } catch (error) {
      message.error('Ошибка при создании нового звука')
      console.log(error)
    }
  }
)

const fetchDeleteSound = createAsyncThunk(
  'sound/fetchDeleteSound',
  async (soundId) => {
    try {
      const res = await axiosInstance.delete(`sounds/${soundId}`)

      message.success('Звук успешно удален')
      console.log(res.dada)
      return res.data
    } catch (error) {
      message.error('Ошибка при удалении звука')
      console.log(error)
    }
  }
)

const fetchUpdateSound = createAsyncThunk(
  'sound/fetchUpdateSound',
  async ({ soundId, soundData }) => {
    try {
      const res = await axiosInstance.put(
        `/sounds/${soundId}`,
        soundData
      )

      message.success('Мелодия отредактиована')
      return res.data
    } catch (error) {
      message.error('Ошибка при редактировании мелодии')
      console.log(error)
    }
  }
)

// Начальное значение
const initialState = {
  isLoading: true,
  allSounds: [],
  categorySounds: [],
  currentSound: {},

  soundsCategory: [{}, {}, {}],
}

const soundSlice = createSlice({
  name: 'sound',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    setSound: (state, action) => {
      state.currentSound = { ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      //get all sounds
      .addCase(fetchGetAllSounds.pending, (state) => {
        state.isLoading = true
        state.allSounds = []
      })
      .addCase(fetchGetAllSounds.fulfilled, (state, action) => {
        state.isLoading = false
        state.allSounds = [...action.payload]
      })
      .addCase(fetchGetAllSounds.rejected, (state) => {
        state.isLoading = false
        state.allSounds = []
      })
      //get one sound
      .addCase(fetchGetOneSound.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetOneSound.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentSound = action.payload
      })
      .addCase(fetchGetOneSound.rejected, (state) => {
        state.isLoading = false
        state.currentSound = {}
      })
      //create sound
      .addCase(fetchCreateSound.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCreateSound.fulfilled, (state, action) => {
        state.isLoading = false
        state.allSounds = [...state.allSounds, action.payload]
      })
      .addCase(fetchCreateSound.rejected, (state) => {
        state.isLoading = false
      })
      //delete sound
      .addCase(fetchDeleteSound.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchDeleteSound.fulfilled, (state, action) => {
        state.isLoading = false
        state.allSounds = state.allSounds.filter((elem) => {
          return elem._id !== action.payload._id
        })
        state.currentSound = {}
      })
      .addCase(fetchDeleteSound.rejected, (state) => {
        state.isLoading = false
      })
      //update sound
      .addCase(fetchUpdateSound.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUpdateSound.fulfilled, (state, action) => {
        state.isLoading = false
        state.allSounds = state.allSounds.map((elem) => {
          if (elem._id === action.payload._id) {
            return action.payload
          }
          return elem
        })
        state.currentSound = { ...action.payload }
      })
      .addCase(fetchUpdateSound.rejected, (state) => {
        state.isLoading = false
        state.allSounds = [...state.allSounds]
      })
      //get sounds for category
      .addCase(fetchGetCategorySounds.pending, (state) => {
        state.isLoading = true
        state.categorySounds = []
      })
      .addCase(fetchGetCategorySounds.fulfilled, (state, action) => {
        state.isLoading = false
        state.categorySounds = [...action.payload]
      })
      .addCase(fetchGetCategorySounds.rejected, (state) => {
        state.isLoading = false
        state.categorySounds = [...state.categorySounds]
      })
  },
})

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { setSound } = soundSlice.actions

export {
  fetchGetAllSounds,
  fetchCreateSound,
  fetchDeleteSound,
  fetchUpdateSound,
  fetchGetOneSound,
  fetchGetCategorySounds,
}

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default soundSlice.reducer
