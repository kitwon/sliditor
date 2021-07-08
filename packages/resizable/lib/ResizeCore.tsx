/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC,
  ReactElement,
  cloneElement,
  useCallback,
  SyntheticEvent,
  useRef,
  CSSProperties,
  useState
} from 'react'
import { DragCore, Axis, DragCoreProps, DraggableData } from '@sliditor/draggable'
import { ResizeHandleAxis, ResizeEvent } from './types'

export type ResizeHandleFuction = (axis: ResizeHandleAxis) => ReactElement<any>

export interface ResizeProps {
  axis?: Axis
  style?: CSSProperties
  height: number
  width: number
  draggableOpts?: DragCoreProps
  lockAspectRatio?: boolean
  handleSize?: [number, number]
  maxConstraints?: [number, number]
  minConstraints?: [number, number]
  onResize?: ResizeEvent
  onResizeStart?: ResizeEvent
  onResizeStop?: ResizeEvent
  handle?: ReactElement<any> | ResizeHandleFuction
  resizeHandles?: ResizeHandleAxis[]
  transformScale?: number
  className?: string
  children?: ReactElement
}

const ResizeCore: FC<ResizeProps> = (props) => {
  const {
    className,
    children,
    handle,
    draggableOpts,
    lockAspectRatio,
    axis = 'both',
    resizeHandles = ['se'],
    transformScale = 1,
    minConstraints = [20, 20],
    maxConstraints = [Infinity, Infinity]
  } = props

  // const [lastHandleRect, setLastHandle] = useState<DOMRect | null>(null)
  const lastHandleRect = useRef<DOMRect | null>(null)
  const slack = useRef<[number, number] | null>(null)
  const state = useRef({
    width: props.width,
    height: props.height
  })

  const renderResizeHandle = useCallback(
    (handleAxis: ResizeHandleAxis) => {
      if (handle) {
        if (typeof handle === 'function') {
          return handle(handleAxis)
        }
        return handle
      }

      return <span className={`rc-resizable-handle is-${handleAxis}`} />
    },
    [handle]
  )

  const runConstraints = (w: number, h: number) => {
    const [min, max] = [minConstraints, maxConstraints]
    if (!min && !max) return [w, h]

    // If constraining to min and max, we need to also fit width and height to aspect ratio.
    if (lockAspectRatio) {
      // const resizingHorizontally = h === props.height
      const resizingHorizontally = h === state.current.height
      if (resizingHorizontally) {
        // const ratio = props.width / props.height
        const ratio = state.current.width / state.current.height
        h = w / ratio
        w = h * ratio
      } else {
        // Take into account vertical resize with N/S handles on locked aspect
        // ratio. Calculate the change height-first, instead of width-first
        const ratio = state.current.height / state.current.width
        w = h / ratio
        h = w * ratio
      }
    }

    const [oldW, oldH] = [w, h]

    // Add slack to the values used to calculate bound position. This will ensure that if
    // we start removing slack, the element won't react to it right away until it's been
    // completely removed.
    const [slackW, slackH] = slack.current || [0, 0]
    w += slackW
    h += slackH

    if (min) {
      w = Math.max(min[0], w)
      h = Math.max(min[1], h)
    }
    if (max) {
      w = Math.min(max[0], w)
      h = Math.min(max[1], h)
    }

    // If the width or height changed, we must have introduced some slack. Record it for the next iteration.
    slack.current = [slackW + (oldW - w), slackH + (oldH - h)]

    return [w, h]
  }

  const resetData = () => {
    lastHandleRect.current = null
    slack.current = null
  }

  const resizeHandler =
    (handleName: 'onResize' | 'onResizeStart' | 'onResizeStop', handleAxis: ResizeHandleAxis) =>
    (e: SyntheticEvent, dragData: DraggableData) => {
      let deltaX = dragData.deltaX / transformScale
      let deltaY = dragData.deltaY / transformScale

      if (handleName === 'onResizeStart') resetData()

      const canDragX = (axis === 'both' || axis === 'x') && handleAxis !== 'n' && handleAxis !== 's'
      const canDragY = (axis === 'both' || axis === 'y') && handleAxis !== 'e' && handleAxis !== 'w'

      if (!canDragX && !canDragY) return

      const axisVertical = handleAxis[0]
      const axisHorizontal = handleAxis[handleAxis.length - 1]

      const handleRect = dragData.node.getBoundingClientRect()
      if (lastHandleRect.current !== null) {
        if (axisHorizontal === 'w') {
          const deltaLeftSinceLast = handleRect.left - lastHandleRect.current.left
          deltaX += deltaLeftSinceLast
        }
        if (axisVertical === 'n') {
          const deltaTopSinceLast = handleRect.top - lastHandleRect.current.top
          deltaY += deltaTopSinceLast
        }
      }

      lastHandleRect.current = handleRect

      if (axisHorizontal === 'w') deltaX = -deltaX
      if (axisHorizontal === 'n') deltaY = -deltaY

      // let width = props.width + (canDragX ? deltaX / transformScale : 0)
      // let height = props.height + (canDragY ? deltaY / transformScale : 0)
      let width = state.current.width + (canDragX ? deltaX / transformScale : 0)
      let height = state.current.height + (canDragY ? deltaY / transformScale : 0)
      ;[width, height] = runConstraints(width, height)
      const demensionsChanged = width !== state.current.width || height !== state.current.height

      state.current = { width, height }
      const cb = typeof props[handleName] === 'function' ? props[handleName] : null
      const shouldSkipCb = handleName === 'onResize' && !demensionsChanged
      if (cb && !shouldSkipCb) {
        if (typeof e.persist === 'function') e.persist()
        // cb(e, { node: dragData.node, size: { width, height }, handle: handleAxis })
        cb(e, { node: dragData.node, size: state.current, handle: handleAxis })
      }

      if (handleName === 'onResizeStop') resetData()
    }

  if (!children) return null
  return cloneElement(children, {
    className: `${className || ''} rc-resizable`,
    children: [
      children?.props.children,
      ...resizeHandles.map((pos) => (
        <DragCore
          {...draggableOpts}
          key={`resiableHandle-${pos}`}
          onStop={resizeHandler('onResizeStop', pos)}
          onStart={resizeHandler('onResizeStart', pos)}
          onDrag={resizeHandler('onResize', pos)}
        >
          {renderResizeHandle(pos)}
        </DragCore>
      ))
    ]
  })
}

export default ResizeCore
