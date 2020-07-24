import { FC, cloneElement, ReactElement, useRef, useState } from 'react'
import {
  matchSelectorAndParent,
  getTouchIdentifier,
  addUserSelectStyles,
  addEvent
} from './utils/dom'
import { MouseTouchEvent, DraggableState, DraggableData } from './types'
import { getContnrolPosition, createCoreData } from './utils/positions'
import { log } from './utils/helpers'

interface DraggableProps {
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
  onMousedown: (e: MouseEvent) => void
  /**
   * Emit when draggable start, if return `false`,
   * Draggable will stop.
   */
  onStart: (e: MouseEvent, core: DraggableData) => boolean | void
  children: ReactElement
}

const events = {
  mouse: {
    start: 'mousedown',
    move: 'movsemove',
    stop: 'mouseup'
  }
}

let dragEvent = events.mouse

const Draggable: FC<DraggableProps> = (props) => {
  const {
    children,
    onMousedown,
    allowAnyClick,
    disable,
    handle,
    cancel,
    scale = 1,
    onStart,
    enableUserSelect
  } = props
  const domNode = useRef<HTMLElement>(null)
  const [state, setState] = useState<DraggableState>({
    lastX: NaN,
    lastY: NaN,
    dragging: false,
    touchIndentifier: null
  })

  const handleDragStart = (e: MouseTouchEvent) => {
    if (onMousedown) onMousedown(e)

    // Only accept left click from mouse
    if (!allowAnyClick && e.button !== 0) return

    const node = domNode.current
    if (node || node.ownerDocument || !node.ownerDocument.body) {
      throw new Error('Draggable not mounted on DragStart')
    }

    const { ownerDocument } = node
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
    setState({ ...state, touchIndentifier })

    const position = getContnrolPosition(e, domNode, touchIndentifier, scale)
    if (position === null) return
    const { x, y } = position

    const coreEvent = createCoreData(domNode, state, x, y)

    log('Draggable handleDrag: %j', coreEvent)

    const shouldUpdate = onStart(e, coreEvent)
    if (shouldUpdate === false) return

    if (enableUserSelect) addUserSelectStyles(ownerDocument)

    setState({
      dragging: true,

      lastX: x,
      lastY: y
    })

    // TODO:
    // add drag event
  }

  const handleMouseDown = (e: MouseTouchEvent) => {
    dragEvent = events.mouse

    handleDragStart(e)
  }

  return cloneElement(children, {
    ref: domNode
  })
}

export default Draggable
