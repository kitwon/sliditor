import { Action } from 'redux'
import { Block } from '../reducers/types'

/* ------------- Block types -------------- */
//
export const UPDATE_BLOCK = 'UPDATE_BLOCK'
export const DELETE_BLOCK = 'DELETE_BLOCK'

export interface UpdateBlock extends Action<typeof UPDATE_BLOCK> {
  id: string
  payload: Block
}
export interface DeleteBlock extends Action<typeof DELETE_BLOCK> {
  id: string
}

export type BlockActions = UpdateBlock | DeleteBlock

/* ------------- Editor types -------------- */
//
export const EDITOR_UNDO = 'EDITOR_UNDO'
export const EDITOR_REDO = 'EDITOR_REDO'

export type EditorRedo = Action<typeof EDITOR_REDO>
export type EditorUndo = Action<typeof EDITOR_UNDO>

export type EditorActions = EditorRedo | EditorUndo
