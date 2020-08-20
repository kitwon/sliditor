import { useReducer, Reducer, useCallback } from 'react'
import * as types from './types'

interface UndoState<T = any> {
  past: Array<T>
  present: T | null
  future: Array<T>
}

function getInititalState<T = any>(): UndoState<T> {
  return {
    past: [],
    present: null,
    future: []
  }
}

function reducer<T>(state: UndoState<T>, action: types.UndoAction<T>) {
  const { past, present, future } = state

  switch (action.type) {
    case types.SET: {
      const { payload } = action
      if (!payload || payload === present) return state
      return {
        past: present ? [...past, present] : past,
        present: payload,
        future: []
      }
    }

    case types.RESET: {
      return getInititalState()
    }

    case types.UNDO: {
      if (!past.length) return state
      const prev = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)

      return {
        past: newPast,
        present: prev,
        future: present ? [present, ...future] : future
      }
    }

    case types.REDO: {
      if (!future.length) return state
      const next = future[0]
      const newFuture = future.slice(1)

      return {
        past: present ? [...past, present] : past,
        present: next,
        future: newFuture
      }
    }

    default:
      return state
  }
}

export default function useUndo<T = any>(initital: T) {
  const [state, dispatch] = useReducer(reducer as Reducer<UndoState<T>, types.UndoAction<T>>, {
    ...getInititalState(),
    present: initital
  })

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0
  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: types.UNDO })
    }
  }, [canUndo])

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: types.REDO })
    }
  }, [canRedo])

  const set = useCallback<(payload: T) => any>(
    (payload) => dispatch({ type: types.SET, payload }),
    []
  )
  const reset = useCallback<(payload: T) => any>(
    (payload) => dispatch({ type: types.RESET, payload }),
    []
  )

  return [state, { set, reset, undo, redo, canUndo, canRedo }]
}
