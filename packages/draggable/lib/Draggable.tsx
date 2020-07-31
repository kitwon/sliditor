import React, {
  ReactElement,
  FC,
  cloneElement,
  useState,
  useEffect,
  useRef,
  MutableRefObject
} from 'react'
import DragCore, { DragCoreProps } from './DragCore'
import { ControlPosition, DraggableEventHandler, BoundsShape } from './types'
import { log } from './utils/helpers'
import { createCoreData, createDraggableData } from './utils/positions'

interface DraggableProps extends DragCoreProps {
  /**
   * `axis` determines which axis the draggable can move.
   * default 'both'
   */
  axis: 'both' | 'x' | 'y' | 'none'
  className?: string
  draggingClassName?: string
  draggedClassName?: string
  position: ControlPosition | null
  defaultPosition: ControlPosition
  children: ReactElement
  nodeRef?: MutableRefObject<any>
  bounds?: BoundsShape | string
  scale?: number
}

const Draggable: FC<DraggableProps> = (props) => {
  const {
    children,
    position,
    nodeRef,
    bounds,
    onStart,
    scale = 1,
    defaultPosition = { x: 0, y: 0 }
  } = props
  const domNode = useRef<HTMLElement>(null)
  const [state, setState] = useState({
    dragging: false,
    drgged: false,
    x: position?.x ?? defaultPosition.x,
    y: position?.y ?? defaultPosition.y,
    prevPropsPos: { ...position },
    slackX: 0,
    slackY: 0,
    isElementSVG: false
  })

  const findNode = () => nodeRef?.current ?? domNode?.current

  useEffect(() => {
    if (typeof window.SVGAElement !== 'undefined' && findNode() instanceof window.SVGAElement) {
      setState({ ...state, isElementSVG: true })
    }
  }, [nodeRef, domNode])

  const onDragStart: DraggableEventHandler = (e, coreData) => {
    log('Draggable: onDragStart: %j', coreData)

    const sholdStart =
      onStart && onStart(e, createDraggableData({ x: state.x, y: state.y, scale, coreData }))
    if (sholdStart === false) return

    setState({ ...state, dragging: true, drgged: true })
  }

  const onDrag: DraggableEventHandler = (e, coreData) => {
    if (!state.dragging) return

    log('Draggable: onDrag: %j', coreData)
    const uiData = createDraggableData({ x: state.x, y: state.y, scale, coreData })

    const newState = {
      x: uiData.x,
      y: uiData.y
    }

    if (bounds) {
      const { x, y } = newState

      newState.x += state.slackX
      newState.y += state.slackY

      // TODO:
      // add bound calc
    }
  }

  return (
    <DragCore onStart={onDragStart}>
      {cloneElement(children, {
        ref: domNode
      })}
    </DragCore>
  )
}

export default Draggable
