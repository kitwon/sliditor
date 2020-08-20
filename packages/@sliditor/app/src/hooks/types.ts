import { Block } from '../types/block'

export interface Action<T> {
  type: T
}

// Undo actions
export const UNDO = 'UNDO'
export const REDO = 'REDO'
export const SET = 'SET'
export const RESET = 'RESET'

export interface UndoAction<T>
  extends Action<typeof UNDO | typeof REDO | typeof SET | typeof RESET> {
  payload?: T
}

// Slides & Blocks Actions
export const UPDATE_BLOCK = 'UPDATE_BLOCK'
export const SELECT_BLOCK = 'SELECT_BLOCK'

export interface UpdateBlock extends Action<typeof UPDATE_BLOCK> {
  id: string
  payload: Block
}

export interface SelectBlock extends Action<typeof SELECT_BLOCK> {
  id: string
}

export type SlidesActions = UpdateBlock | SelectBlock
