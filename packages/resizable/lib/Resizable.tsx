/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useCallback, useRef, useState } from 'react'
import ResizeCore, { ResizeProps } from './ResizeCore'
import { ResizeEvent } from './types'

interface SizeState {
  width: number
  height: number
  propsHeight?: number
  propsWidth?: number
}

const Resizable: FC<ResizeProps> = (props) => {
  // const { width, height, style, onResize, children, ...resizeProps } = props
  const {
    handle,
    handleSize,
    onResize,
    onResizeStart,
    onResizeStop,
    draggableOpts,
    minConstraints,
    maxConstraints,
    lockAspectRatio,
    axis,
    width,
    height,
    resizeHandles,
    style,
    transformScale,
    ...extraProps
  } = props
  const [state, setState] = useState<SizeState>({
    width,
    height,
    propsWidth: width,
    propsHeight: height
  })
  // const state = useRef({
  //   width,
  //   height,
  //   propsWidth: width,
  //   propsHeight: height
  // })

  const handleResize: ResizeEvent = useCallback((e, data) => {
    const { size } = data

    if (onResize) {
      onResize(e, data)
      e.persist?.()
    }

    setState(size)
    // state.current = { ...state.current, ...size }
  }, [])

  return (
    <ResizeCore
      axis={axis}
      draggableOpts={draggableOpts}
      handle={handle}
      handleSize={handleSize}
      height={state.height}
      lockAspectRatio={lockAspectRatio}
      maxConstraints={maxConstraints}
      minConstraints={minConstraints}
      onResizeStart={onResizeStart}
      onResize={handleResize}
      onResizeStop={onResizeStop}
      resizeHandles={resizeHandles}
      transformScale={transformScale}
      width={state.width}
    >
      <div
        {...extraProps}
        style={{ ...style, width: `${state.width}px`, height: `${state.height}px` }}
      />
    </ResizeCore>
  )
}

export default Resizable
