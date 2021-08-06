import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getGridSize } from '../../utils/viewport'

const initialState = {
  grid: {
    colCount: 0,
    rowCount: 0,
    col: 0,
    row: 0,
    color: '#eaeaea',
    borderColor: 'rgba(150,150,150,0.5)'
  },
  gridRect: {} as DOMRect,
  viewport: {
    name: '',
    width: 0,
    height: 0
  }
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateViewport: (state, action: PayloadAction<typeof initialState['viewport']>) => {
      const viewport = action.payload
      return {
        ...state,
        viewport,
        grid: {
          ...getGridSize(viewport.width, viewport.height),
          ...state.grid
        }
      }
    },
    updateGridRect: (state, action: PayloadAction<typeof initialState['gridRect']>) => {
      console.log(action.payload)
      return {
        ...state,
        gridRect: action.payload
      }
    }
  }
})

export const { updateViewport, updateGridRect } = settingSlice.actions
export default settingSlice
