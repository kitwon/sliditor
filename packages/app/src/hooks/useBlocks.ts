import { useReducer, Reducer, useCallback } from 'react'
import { Block, BlockProps } from '../models/block'
import * as types from './types'

interface SlidesState {
  currentPage: number
  currentBlock: string | null
  pages: { [key: string]: { [key: string]: Block } }
}

let blockId = 1

const initialState: SlidesState = {
  currentPage: 1,
  currentBlock: null,
  pages: {}
}

function reducer(state: SlidesState, action: types.SlidesActions) {
  const { currentPage, pages } = state

  switch (action.type) {
    case types.UPDATE_BLOCK: {
      const currentBlocks = pages[currentPage]
      return {
        currentPage,
        currentBlock: action.id,
        pages: { [currentPage]: { ...currentBlocks, [action.id]: action.payload } }
      }
    }
    case types.SELECT_BLOCK: {
      return {
        ...state,
        currentBlock: action.id
      }
    }
    default:
      return state
  }
}

export default function useBlocks() {
  const [state, dispatch] = useReducer(reducer as Reducer<SlidesState, types.SlidesActions>, {
    ...initialState
  })

  const update = (id: string, block: Block) =>
    dispatch({ type: types.UPDATE_BLOCK, id, payload: block })

  const select = useCallback((id: string) => dispatch({ type: types.SELECT_BLOCK, id }), [])

  const add = (type: string, blockProps?: Partial<BlockProps>) => {
    const id = `${state.currentPage}.${blockId}`
    const block = new Block({ id, type, ...blockProps })
    update(id, block)
    blockId += 1
  }

  const getCurrentBlock = () => {
    const { pages, currentPage, currentBlock } = state
    const pageBlocks = pages[currentPage]
    if (!pageBlocks || !currentBlock) return null
    return pageBlocks[currentBlock]
  }

  return { state, update, add, select, getCurrentBlock }
}
