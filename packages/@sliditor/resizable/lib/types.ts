import { SyntheticEvent } from 'react'

export type ResizeHandleAxis = 'n' | 'e' | 's' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

export interface ResizeData {
  node: HTMLElement
  size: { width: number; height: number }
  handle: ResizeHandleAxis
}

export type ResizeEvent = (e: SyntheticEvent, data: ResizeData) => any
