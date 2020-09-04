/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC,
  ReactElement,
  cloneElement,
  useCallback,
  SyntheticEvent,
  useRef,
  CSSProperties
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
  children?: ReactElement
}

const ResizeCore: FC<ResizeProps> = (props) => {
  const {
    children,
    handle,
    draggableOpts,
    lockAspectRatio,
    axis = 'both',
    resizeHandles = ['br'],
    transformScale = 1,
    minConstraints = [20, 20],
    maxConstraints = [Infinity, Infinity]
  } = props

  const lastHandleRect = useRef<DOMRect>(null)
  const slack = useRef<[number, number] | null>(null)

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

  const runConstraints = useCallback((w: number, h: number) => {
    let width = w
    let height = h
    const [min, max] = [minConstraints, maxConstraints]
    if (!min && !max) return [width, height]

    if (lockAspectRatio) {
      if (height === props.height) {
        const ratio = props.width / props.height
        height = width / ratio
        width = height * ratio
      } else {
        const radio = props.height / props.width
        width = height / radio
        height = width * radio
      }
    }

    const [oldW, oldH] = [width, height]

    const [slackW, slackH] = slack.current || [0, 0]
    width += slackW
    height += slackH

    if (min) {
      width = Math.max(min[0], width)
      height = Math.max(min[1], height)
    }
    if (max) {
      width = Math.min(max[0], width)
      height = Math.min(max[1], height)
    }

    slack.current = [slackW + (oldW - width), slackH + (oldH - height)]
    return [width, height]
  }, [])

  const resetData = () => {
    lastHandleRect.current = null
    slack.current = null
  }

  const resizeHandler = useCallback(
    (handleName: 'onResize' | 'onResizeStart' | 'onResizeStop', handleAxis: ResizeHandleAxis) => {
      return (e: SyntheticEvent, dragData: DraggableData) => {
        let deltaX = dragData.deltaX / transformScale
        let deltaY = dragData.deltaY / transformScale

        const canDragX = (axis === 'both' || axis === 'x') && ['t', 'b'].indexOf(handleAxis) === -1
        const canDragY = (axis === 'both' || axis === 'y') && ['l', 'r'].indexOf(handleAxis) === -1

        if (!canDragX && !canDragY) return

        const axisVertical = handleAxis[0]
        const axisHorizontal = handleAxis[handleAxis.length - 1]

        const handleRect = dragData.node.getBoundingClientRect()
        if (lastHandleRect.current !== null) {
          if (axisHorizontal === 'l') {
            const deltaLeftSinceLast = handleRect.left - lastHandleRect.current.left
            deltaX += deltaLeftSinceLast
          }
          if (axisVertical === 't') {
            const deltaTopSinceLast = handleRect.top - lastHandleRect.current.top
            deltaY += deltaTopSinceLast
          }
        }

        lastHandleRect.current = handleRect

        if (axisHorizontal === 'l') deltaX = -deltaX
        if (axisHorizontal === 't') deltaY = -deltaY

        let width = props.width + (canDragX ? deltaX / transformScale : 0)
        let height = props.height + (canDragY ? deltaY / transformScale : 0)

        ;[width, height] = runConstraints(width, height)
        const demensionsChanged = width !== props.width || height !== props.height

        const cb = typeof props[handleName] === 'function' ? props[handleName] : null
        const shouldSkipCb = handleName === 'onResize' && !demensionsChanged
        if (cb && !shouldSkipCb) {
          if (typeof e.persist === 'function') e.persist()
          cb(e, { node: dragData.node, size: { width, height }, handle: handleAxis })
        }

        if (handleName === 'onResizeStop') resetData()
      }
    },
    [axis]
  )

  return cloneElement(children, {
    children: [
      ...children.props.children,
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
