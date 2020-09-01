import { SyntheticEvent } from 'react'

export type ResizeHandleAxis = 't' | 'r' | 'b' | 'l' | 'tl' | 'tr' | 'bl' | 'br'

export interface ResizeData {
  node: HTMLElement
  size: { width: number; height: number }
  handle: ResizeHandleAxis
}

export type ResizeEvent = (e: SyntheticEvent, data: ResizeData) => any
