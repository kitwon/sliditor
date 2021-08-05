import { DeepPartial } from '@reduxjs/toolkit'
import { PRESENTATION_SIZE } from '../constants'
import { getGridSize } from '../utils/viewport'
import configureAppStore from './configureStore'

function getInitialState(): DeepPartial<RootState> {
  const viewport = { ...PRESENTATION_SIZE[0] }
  return {
    setting: {
      viewport,
      grid: getGridSize(viewport.width, viewport.height)
    }
  }
}

const store = configureAppStore(getInitialState())

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
