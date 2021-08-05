import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Block } from '../../models/block'

const initialState = {
  currentPage: 1,
  currentBlock: null as string | null,
  pages: {} as { [key: string]: { [key: string]: Block } }
}

export const pageSlices = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    updateBlock: (state, action: PayloadAction<{ id: string; block: Block }>) => {
      const { currentPage, pages } = state
      const { id, block } = action.payload
      const currentBlocks = pages[currentPage]

      return {
        currentPage,
        currentBlock: id,
        pages: { [currentPage]: { ...currentBlocks, [id]: block } }
      }
    },
    selectBlock: (state, action: any) => {
      return {
        ...state,
        currentBlock: action.id
      }
    }
  }
})

export const { updateBlock, selectBlock } = pageSlices.actions
export default pageSlices
