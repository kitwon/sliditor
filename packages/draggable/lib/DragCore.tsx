import { FC, cloneElement, ReactElement, useRef, useState, useEffect } from 'react'
import {
  matchSelectorAndParent,
  getTouchIdentifier,
  addUserSelectStyles,
  addEvent,
  removeUserSelectStyle,
  removeEvent
} from './utils/dom'
import { MouseTouchEvent, DraggableState, DraggableData } from './types'
import { getContnrolPosition, createCoreData } from './utils/positions'
import { log, snapToGrid } from './utils/helpers'

export interface DragCoreProps {
  /**
   * `allowAnyClick allows dragging using any mouse btuton`
   * Default only accept the left button
   *
   * Defaults to `false`
   */
  allowAnyClick?: boolean
  /**
   * If true, stop the Component from dragging.
   */
  disable?: boolean
  /**
   * Specifies a selector to be used as the drag handler.
   */
  handle?: string
  cancel?: string
  enableUserSelect?: boolean
  scale?: number
  grid?: [number, number]
  onMousedown?: (e: MouseEvent) => void
  /**
   * Emit when draggable start, if return `false`,
   * Draggable will stop.
   */
  onStart?: (e: MouseEvent, core: DraggableData) => boolean | void
  /**
   * Emit when dragging, if return `false`,
   * Draggable will stop.
   */
  onDrag?: (e: MouseEvent, core: DraggableData) => boolean | void
  onStop?: (e: MouseEvent, core: DraggableData) => boolean | void
  children: ReactElement
}

const events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  }
}

let dragEvent = events.mouse

const DragCore: FC<DragCoreProps> = (props) => {
  const {
    children,
    allowAnyClick,
    disable,
    handle,
    cancel,
    grid,
    scale = 1,
    enableUserSelect,
    onStart = () => null,
    onDrag = () => null,
    onStop = () => null,
    onMousedown = () => null
  } = props
  const domNode = useRef<HTMLElement>(null)
  let state = {
    lastX: NaN,
    lastY: NaN,
    dragging: false,
    touchIndentifier: null
  }

  const handleDragStop = (e: MouseTouchEvent) => {
    if (!state.dragging) return

    const position = getContnrolPosition(e, domNode, state.touchIndentifier, scale)
    if (position === null) return
    const { x, y } = position
    const coreEvent = createCoreData(domNode, state, x, y)

    const shouldContinune = onStop(e, coreEvent)
    if (shouldContinune === false) return

    if (domNode.current && enableUserSelect) {
      removeUserSelectStyle(domNode.current.ownerDocument)
    }

    log('Draggable stop: %j', coreEvent)

    state = { ...state, dragging: false, lastX: NaN, lastY: NaN }

    if (domNode) {
      // eslint-disable-next-line no-use-before-define
      removeEvent(domNode.current.ownerDocument, dragEvent.move, handleDrag)
      removeEvent(domNode.current.ownerDocument, dragEvent.stop, handleDragStop)
    }
  }

  const handleDrag = (e: MouseTouchEvent) => {
    const position = getContnrolPosition(e, domNode, state.touchIndentifier, scale)

    if (position === null) return
    let { x, y } = position
    if (Array.isArray(grid)) {
      const [deltaX, deltaY] = snapToGrid(grid, x - state.lastX, y - state.lastY)
      if (!deltaX && !deltaY) return
      x = state.lastX + deltaX
      y = state.lastY + deltaY
    }

    const coreEvent = createCoreData(domNode, state, x, y)
    log('Dragging: %j', coreEvent)

    // Manually emit the stop event
    const shouldUpdate = onDrag(e, coreEvent)
    if (shouldUpdate === false) {
      // TODO:
      // Old browser support
      // @ts-ignore
      handleDragStop(new MouseEvent('mouseup'))
      return
    }

    state = { ...state, dragging: true, lastX: x, lastY: y }
  }

  /**
   * Run in staring
   * @param { MouseTouchEvent } e Event
   */
  const handleDragStart = (e: MouseTouchEvent) => {
    if (onMousedown) onMousedown(e)

    // Only accept left click from mouse
    if (!allowAnyClick && e.button !== 0) return

    const node = domNode.current
    if (!node || !node.ownerDocument || !node.ownerDocument.body) {
      throw new Error('Draggable not mounted on DragStart')
    }
    const { ownerDocument } = node

    // Handle cancel \ handle \ disable prop.
    if (
      disable ||
      !(e.target instanceof ownerDocument.defaultView.Node) ||
      (handle && !matchSelectorAndParent(e.target, handle, node)) ||
      (cancel && matchSelectorAndParent(e.target, cancel, node))
    ) {
      return
    }

    // Prevent scrolling on mobile device.
    if (e.type === 'touchstart') e.preventDefault()

    const touchIndentifier = getTouchIdentifier(e)
    state = { ...state, touchIndentifier }

    const position = getContnrolPosition(e, domNode, touchIndentifier, scale)
    if (position === null) return
    const { x, y } = position

    const coreEvent = createCoreData(domNode, state, x, y)

    log('Draggable handleDrag: %j', coreEvent)

    const shouldUpdate = onStart(e, coreEvent)
    if (shouldUpdate === false) return

    if (enableUserSelect) addUserSelectStyles(ownerDocument)

    state = {
      ...state,
      dragging: true,
      lastX: x,
      lastY: y
    }

    addEvent(ownerDocument, dragEvent.move, handleDrag)
    addEvent(ownerDocument, dragEvent.stop, handleDragStop)
  }

  const onMouseDown = (e: MouseTouchEvent) => {
    dragEvent = events.mouse
    return handleDragStart(e)
  }

  const onMouseUp = (e: MouseTouchEvent) => {
    dragEvent = events.mouse
    return handleDragStop(e)
  }

  const onTouchStart = (e: MouseTouchEvent) => {
    dragEvent = events.touch
    return handleDragStart(e)
  }

  const onTouchEnd = (e: MouseTouchEvent) => {
    dragEvent = events.touch
    return handleDragStop(e)
  }

  useEffect(() => {
    if (domNode) {
      addEvent(domNode.current, events.touch.start, onTouchStart, { passive: false })
    }

    return () => {
      const { ownerDocument } = domNode?.current
      removeEvent(ownerDocument, events.mouse.move, handleDrag)
      removeEvent(ownerDocument, events.touch.move, handleDrag)
      removeEvent(ownerDocument, events.mouse.stop, handleDragStop)
      removeEvent(ownerDocument, events.touch.stop, handleDragStop)
      removeEvent(domNode.current, events.touch.start, onTouchStart, { passive: false })
      if (enableUserSelect) removeUserSelectStyle(ownerDocument)
    }
  }, [domNode])

  return cloneElement(children, {
    ref: domNode,
    onMouseDown,
    onMouseUp,
    onTouchEnd
  })
}

export default DragCore
