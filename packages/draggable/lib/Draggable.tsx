/* eslint react/jsx-props-no-spreading: off */
import React, { ReactElement, FC, cloneElement, useState, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import DragCore, { DragCoreProps } from './DragCore'
import {
  ControlPosition,
  DraggableEventHandler,
  BoundsShape,
  OffsetPositionOfControl,
  Axis
} from './types'
import { log, canDragX, canDragY } from './utils/helpers'
import { createDraggableData, getBoundPosition } from './utils/positions'
import { createSVGTransform, createCSSTransform } from './utils/dom'
import useReferenceState from './hooks/useReferenceState'

export interface DraggableProps extends DragCoreProps {
  /**
   * `axis` determines which axis the draggable can move.
   * default 'both'
   */
  axis?: Axis

  className?: string
  draggingClassName?: string
  draggedClassName?: string

  /**
   * Specifies **current** x,y position (include start) when drag end.
   * Useful for guideline and sticked action.
   */
  position?: ControlPosition

  /**
   * Specifies the x,y position that the drag element should start at
   */
  startPosition?: ControlPosition
  positionOffset?: OffsetPositionOfControl
  /**
   * Bounds is the range of movement available to the element.
   *
   * ⚠️ Notice that here use `offsetTop` and `offsetLeft` to calcute the bounds.
   * If use 'parent' or specifies classname,
   * Add `position` to the parentNode make it run perfectly.
   */
  bounds?: BoundsShape | string
  children: ReactElement
}

const Draggable: FC<DraggableProps> = (props) => {
  const {
    children,
    className,
    draggedClassName = 'dragged',
    draggingClassName = 'dragging',
    position,
    bounds,
    positionOffset,
    scale = 1,
    axis = 'both',
    startPosition = { x: 0, y: 0 },
    onStop,
    onStart,
    onDrag
  } = props

  // const domNode = useRef<HTMLElement>(null)
  // const [domNode, setDomNode] = useState<HTMLElement | null>(null)

  const [stateRef, setState, refState] = useReferenceState({
    dragging: false,
    dragged: false,
    x: position?.x ?? startPosition.x,
    y: position?.y ?? startPosition.y,
    prevPropsPos: { ...position },
    slackX: 0,
    slackY: 0,
    isElementSVG: false,
    domNode: null as HTMLElement | null
  })
  const [childProps, setChildProps] = useState({
    style: { ...children.props.style },
    className: '',
    transform: ''
  })

  // Effects
  useEffect(() => {
    if (
      typeof window.SVGAElement !== 'undefined' &&
      stateRef.current.domNode instanceof window.SVGAElement
    ) {
      setState({ ...stateRef.current, isElementSVG: true })
    }
  }, [stateRef])

  useEffect(() => {
    const state = stateRef.current
    const controlled = Boolean(position)
    const draggable = !controlled || state.dragging

    const validatePosition = position || startPosition
    const transformOpts = {
      x: canDragX(axis) && draggable ? state.x : validatePosition.x,
      y: canDragY(axis) && draggable ? state.y : validatePosition.y
    }

    let svgTransform = null
    let cssTransform = {}
    if (state.isElementSVG) {
      svgTransform = createSVGTransform(transformOpts, positionOffset)
    } else {
      cssTransform = createCSSTransform(transformOpts, positionOffset)
    }

    const classnames = classNames(className || '', children.props.className || '', {
      [draggedClassName]: state.dragged,
      [draggingClassName]: state.dragging
    })

    setChildProps({
      style: { ...childProps.style, ...cssTransform },
      className: classnames,
      transform: svgTransform || ''
    })
  }, [refState])

  useEffect(() => {
    if (position && !stateRef.current.dragging) {
      const { x, y } = position
      setState({ ...stateRef.current, x, y })
    }
  }, [position])

  // Actions
  const handleDragStart: DraggableEventHandler = (e, coreData) => {
    const state = stateRef.current
    log('Draggable: handleDragStart: %j', coreData)

    const sholdStart =
      onStart && onStart(e, createDraggableData({ x: state.x, y: state.y, scale, coreData }))
    if (sholdStart === false) return false

    setState({ ...state, dragging: true, dragged: true })
    return undefined
  }

  const handleDrag: DraggableEventHandler = (e, coreData) => {
    const state = stateRef.current
    if (!state.dragging) return undefined

    log('Draggable: handleDrag: %j', coreData)
    const uiData = createDraggableData({ x: state.x, y: state.y, scale, coreData })

    const newState = {
      x: uiData.x,
      y: uiData.y,
      slackX: 0,
      slackY: 0
    }

    // if (bounds) {
    const { x, y } = newState

    newState.x += state.slackX
    newState.y += state.slackY

    if (state.domNode) {
      const [newStateX, newStateY] = getBoundPosition(state.domNode, bounds, newState.x, newState.y)
      newState.x = newStateX
      newState.y = newStateY

      newState.slackX = state.slackX + (x - newState.x)
      newState.slackY = state.slackY + (y - newState.y)
    }

    uiData.x = newState.x
    uiData.y = newState.y
    uiData.deltaX = newState.x - state.x
    uiData.deltaY = newState.y - state.y
    // }

    const shouldUpdate = onDrag && onDrag(e, uiData)
    if (shouldUpdate === false) return false

    setState({ ...state, ...newState })
    return undefined
  }

  const handleDragStop: DraggableEventHandler = (e, coreData) => {
    const state = stateRef.current
    if (!state.dragging) return undefined

    const shouldContinune = onStop && onStop(e, coreData)
    if (shouldContinune === false) return false

    log('Draggable: onDragStop: %j', coreData)

    const newState: Partial<typeof state> = {
      dragging: false,
      slackX: 0,
      slackY: 0
    }

    setState({ ...state, ...newState })
    return undefined
  }

  return (
    <DragCore
      {...{ ...props, onStart: handleDragStart, onDrag: handleDrag, onStop: handleDragStop }}
      domRef={(instace) => {
        setState({ ...stateRef.current, domNode: instace })
      }}
    >
      {cloneElement(children, {
        ...childProps
      })}
    </DragCore>
  )
}

export default Draggable
