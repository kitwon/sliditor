import { MutableRefObject } from 'react'
import { DraggableState, MouseTouchEvent, DraggableData } from '../types'
import { getTouch, offsetFromParent } from './dom'
import { isNum } from './helpers'

function findDomNode(draggaleRef: MutableRefObject<HTMLElement>) {
  if (!draggaleRef) {
    throw new Error('Draggabble unmounted during event!')
  }

  return draggaleRef.current
}

export function getContnrolPosition(
  e: MouseTouchEvent,
  draggableRef: MutableRefObject<HTMLElement>,
  touchIndentifier: number,
  scale: any
) {
  const touchObj = typeof touchIndentifier === 'number' ? getTouch(e, touchIndentifier) : null
  if (typeof touchIndentifier !== 'number' && !touchObj) return null

  const node = draggableRef.current

  const offsetParent =
    draggableRef.current.offsetParent || node.offsetParent || node.ownerDocument.body
  return offsetFromParent(touchObj || e, offsetParent, scale)
}

export function createCoreData(
  ref: MutableRefObject<HTMLElement>,
  state: DraggableState,
  x: number,
  y: number
): DraggableData {
  const isStart = !isNum(state.lastX)
  const node = ref.current

  if (isStart) {
    return {
      node,
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x,
      y
    }
  }
  return {
    node,
    deltaX: x - state.lastX,
    deltaY: y - state.lastY,
    lastX: state.lastX,
    lastY: state.lastY,
    x,
    y
  }
}
