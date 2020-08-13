import * as types from './types'
import { Block } from '../reducers/types'

export const updateBlock = (id: string, block: Block): types.UpdateBlock => ({
  type: types.UPDATE_BLOCK,
  payload: block,
  id
})

export const deleteBlock = (id: string): types.DeleteBlock => ({
  type: types.DELETE_BLOCK,
  id
})
