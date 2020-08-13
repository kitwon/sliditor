import { combineReducers } from 'redux'

import block from './block'

export default function createRootRducer() {
  return combineReducers({
    block
  })
}

export type RootState = ReturnType<ReturnType<typeof createRootRducer>>
