import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateViewport: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        viewport: action.payload
      }
    }
  }
})

export default settingSlice
