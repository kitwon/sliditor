import { BlockActions, UPDATE_BLOCK } from '../actions/types'
import { BlockState } from './types'

export const initialState: BlockState = {
  past: [],
  map: {},
  future: []
}

function map(state = initialState.map, action: BlockActions) {
  if (action.type === UPDATE_BLOCK) {
    return { ...state, [action.id]: action.payload }
  }

  return state
}

export default function block(state = initialState, action: BlockActions): BlockState {
  return {
    past: state.past,
    map: map(state.map, action),
    future: state.future
  }
}
