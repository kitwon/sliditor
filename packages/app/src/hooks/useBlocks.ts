import { useCallback } from 'react'
import { Block, BlockProps } from '../models/block'
import { selectBlock, updateBlock } from '../store/modules/pages'
import { useAppDispatch, useAppSelector } from './store'
// import * as types from './types'

interface SlidesState {
  currentPage: number
  currentBlock: string | null
  pages: { [key: string]: { [key: string]: Block } }
}

let blockId = 1

export default function useBlocks() {
  const state = useAppSelector((rootState) => rootState.pages)
  const dispatch = useAppDispatch()

  const update = (id: string, block: Block) => dispatch(updateBlock({ id, block: { ...block } }))

  const select = useCallback((id: string) => dispatch(selectBlock({ id })), [])

  /**
   * Add new block
   * @param type block type
   * @param blockProps - block props
   */
  const add = (type: string, blockProps?: Partial<BlockProps>) => {
    const id = `${state.currentPage}.${blockId}`
    const block = new Block({ id, type, ...blockProps })
    update(id, block)
    blockId += 1
  }

  /**
   * Get selected block
   */
  const getCurrentBlock = () => {
    const { pages, currentPage, currentBlock } = state
    const pageBlocks = pages[currentPage]
    if (!pageBlocks || !currentBlock) return null
    return pageBlocks[currentBlock]
  }

  return { state, update, add, select, getCurrentBlock }
}
