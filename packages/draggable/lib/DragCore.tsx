/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  FC,
  cloneElement,
  ReactElement,
  useRef,
  useEffect,
  MutableRefObject,
  useCallback,
  SyntheticEvent
} from 'react'
import {
  matchSelectorAndParent,
  getTouchIdentifier,
  addUserSelectStyles,
  addEvent,
  removeUserSelectStyle,
  removeEvent
} from './utils/dom'
import { MouseTouchEvent, DraggableData } from './types'
import { getContnrolPosition, createCoreData } from './utils/positions'
import { log, snapToGrid, isFunction } from './utils/helpers'

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
  domRef?: (instance: MutableRefObject<HTMLElement>) => any
  onMousedown?: (e: SyntheticEvent) => void
  /**
   * Emit when draggable start, if return `false`,
   * Draggable will stop.
   */
  onStart?: (e: SyntheticEvent, core: DraggableData) => boolean | void
  /**
   * Emit when dragging, if return `false`,
   * Draggable will stop.
   */
  onDrag?: (e: SyntheticEvent, core: DraggableData) => boolean | void
  onStop?: (e: SyntheticEvent, core: DraggableData) => boolean | void
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
    domRef,
    scale = 1,
    enableUserSelect = true,
    onStart = () => 0,
    onDrag = () => 0,
    onStop = () => 0,
    onMousedown = () => 0
  } = props
  const stateRef = useRef({
    lastX: NaN,
    lastY: NaN,
    dragging: false,
    touchIndentifier: null
  })

  // ref never use as function
  // const domNode = ref as MutableRefObject<HTMLElement>
  const domNode = useRef<HTMLElement>(null)

  const handleDrag = useCallback(
    (e: MouseTouchEvent) => {
      const state = stateRef.current
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
      log('DragCore - handleDrag: %j', coreEvent)

      // Manually emit the stop event
      const shouldUpdate = onDrag(e, coreEvent)
      if (shouldUpdate === false) {
        // TODO:
        // Old browser support
        // @ts-ignore
        handleDragStop(new MouseEvent('mouseup'))
        return
      }

      stateRef.current = { ...state, dragging: true, lastX: x, lastY: y }
    },
    [domNode]
  )

  const handleDragStop = useCallback(
    (e: MouseTouchEvent) => {
      const state = stateRef.current
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

      log('DragCore - handleStop: %j', coreEvent)

      stateRef.current = { ...state, dragging: false, lastX: NaN, lastY: NaN }

      if (domNode) {
        // eslint-disable-next-line no-use-before-define
        removeEvent(domNode.current.ownerDocument, dragEvent.move, handleDrag)
        removeEvent(domNode.current.ownerDocument, dragEvent.stop, handleDragStop)
      }
    },
    [domNode]
  )

  /**
   * Handle staring
   * @param { MouseTouchEvent } e Event
   */
  const handleDragStart = useCallback(
    (e: MouseTouchEvent) => {
      const state = stateRef.current
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
      stateRef.current = { ...state, touchIndentifier }

      const position = getContnrolPosition(e, domNode, touchIndentifier, scale)
      if (position === null) return
      const { x, y } = position

      const coreEvent = createCoreData(domNode, state, x, y)

      log('DragCore - handleDragStart: %j', coreEvent)

      const shouldUpdate = onStart(e, coreEvent)
      if (shouldUpdate === false) return

      if (enableUserSelect) addUserSelectStyles(ownerDocument)

      stateRef.current = {
        ...state,
        dragging: true,
        lastX: x,
        lastY: y
      }

      addEvent(ownerDocument, dragEvent.move, handleDrag)
      addEvent(ownerDocument, dragEvent.stop, handleDragStop)
    },
    [domNode]
  )

  const onMouseDown = useCallback((e: MouseTouchEvent) => {
    dragEvent = events.mouse
    return handleDragStart(e)
  }, [])

  const onMouseUp = useCallback((e: MouseTouchEvent) => {
    dragEvent = events.mouse
    return handleDragStop(e)
  }, [])

  const onTouchStart = useCallback((e: MouseTouchEvent) => {
    dragEvent = events.touch
    return handleDragStart(e)
  }, [])

  const onTouchEnd = useCallback((e: MouseTouchEvent) => {
    dragEvent = events.touch
    return handleDragStop(e)
  }, [])

  useEffect(() => {
    if (domNode) {
      if (isFunction(domRef)) domRef(domNode)
      addEvent(domNode.current, events.touch.start, onTouchStart, { passive: false })
    }

    return () => {
      if (domNode?.current) {
        const { ownerDocument } = domNode.current
        removeEvent(ownerDocument, events.mouse.move, handleDrag)
        removeEvent(ownerDocument, events.touch.move, handleDrag)
        removeEvent(ownerDocument, events.mouse.stop, handleDragStop)
        removeEvent(ownerDocument, events.touch.stop, handleDragStop)
        removeEvent(domNode.current, events.touch.start, onTouchStart, { passive: false })
        if (enableUserSelect) removeUserSelectStyle(ownerDocument)
      }
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
