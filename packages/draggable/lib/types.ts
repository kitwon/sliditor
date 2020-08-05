export interface DraggableState {
  dragging: boolean
  lastX: number
  lastY: number
  touchIndentifier?: number
}

export interface DraggableData {
  node: HTMLElement
  x: number
  y: number
  deltaX: number
  deltaY: number
  lastX: number
  lastY: number
}

export interface BoundsShape {
  left?: number
  right?: number
  top?: number
  bottom?: number
}

export interface ControlPosition {
  x: number
  y: number
}

export interface OffsetPositionOfControl {
  x?: number | string
  y?: number | string
}

export interface ITouchEvent extends TouchEvent {
  changedTouches: TouchList
  targetTouches: TouchList
}

export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void | boolean

export type MouseTouchEvent = MouseEvent & ITouchEvent
