import { createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  grid: {
    colCount: 0,
    rowCount: 0,
    col: 0,
    row: 0
  },
  viewport: {
    width: 0,
    height: 0
  }
}

type SettingType = typeof initialState

const settingReducers = createReducer(initialState)

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateViewport: (state, action: PayloadAction<>) => {
      return {
        ...state,
        action.payload
      }
    }
  }
})

export type ViewportSeeting = typeof initialState
