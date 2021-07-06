import { RefObject, MutableRefObject } from 'react'

import { DraggableState, MouseTouchEvent, DraggableData, BoundsShape } from '../types'
import { getTouch, offsetFromParent, innerWidth, outerWidth, innerHeight, outerHeight } from './dom'
import { isNum, int } from './helpers'

function cloneBounds(bounds: BoundsShape): BoundsShape {
  return {
    left: bounds.left,
    right: bounds.right,
    top: bounds.top,
    bottom: bounds.bottom
  }
}

export function getBoundPosition(
  node: HTMLElement,
  bounds: BoundsShape | string | undefined,
  x: number,
  y: number
): [number, number] {
  if (!bounds) return [x, y]

  let newX = x
  let newY = y
  let newBounds = typeof bounds === 'string' ? {} : cloneBounds(bounds)

  const { ownerDocument } = node
  const ownerWindow = ownerDocument.defaultView
  if (typeof bounds === 'string' && ownerWindow) {
    let boundNode
    if (bounds === 'parent') {
      boundNode = node.parentNode
    } else {
      boundNode = ownerDocument.querySelector(bounds)
    }
    if (!(boundNode instanceof ownerWindow.HTMLElement)) {
      throw new Error(`Bounds selector "${bounds}" not exist.`)
    }
    const nodeStyle = ownerWindow.getComputedStyle(node)
    const boundNodeStyle = ownerWindow.getComputedStyle(boundNode)

    newBounds = {
      left: -node.offsetLeft + int(boundNodeStyle.paddingLeft) + int(nodeStyle.marginLeft),
      top: -node.offsetTop + int(boundNodeStyle.paddingTop) + int(nodeStyle.marginTop),
      right:
        innerWidth(boundNode) -
        outerWidth(node) -
        node.offsetLeft +
        int(boundNodeStyle.paddingRight) -
        int(nodeStyle.marginRight),
      bottom:
        innerHeight(boundNode) -
        outerHeight(node) -
        node.offsetTop +
        int(boundNodeStyle.paddingBottom) -
        int(nodeStyle.marginBottom)
    }
  }

  if (typeof newBounds.right === 'number' && isNum(newBounds.right))
    newX = Math.min(newX, newBounds.right)
  if (typeof newBounds.bottom === 'number' && isNum(newBounds.bottom))
    newY = Math.min(newY, newBounds.bottom)

  if (typeof newBounds.left === 'number' && isNum(newBounds.left))
    newX = Math.max(newX, newBounds.left)
  if (typeof newBounds.top === 'number' && isNum(newBounds.top))
    newY = Math.max(newY, newBounds.top)

  return [newX, newY]
}

export function getContnrolPosition(
  e: MouseTouchEvent,
  draggableRef?: RefObject<HTMLElement>,
  touchIndentifier?: number,
  scale?: any
) {
  const touchObj = typeof touchIndentifier === 'number' ? getTouch(e, touchIndentifier) : null
  if (!draggableRef?.current || (typeof touchIndentifier === 'number' && !touchObj)) return null

  const node = draggableRef.current

  const offsetParent =
    draggableRef.current.offsetParent || node.offsetParent || node.ownerDocument.body
  return offsetFromParent(touchObj || e, offsetParent, scale)
}

export function createCoreData(
  ref: MutableRefObject<any>,
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

export function createDraggableData(state: {
  x: number
  y: number
  scale: number
  coreData: DraggableData
}) {
  const { coreData, x, y, scale } = state
  return {
    node: coreData.node,
    x: x + coreData.deltaX / scale,
    y: y + coreData.deltaY / scale,
    deltaX: coreData.deltaX / scale,
    deltaY: coreData.deltaY / scale,
    lastX: x,
    lastY: y
  }
}
