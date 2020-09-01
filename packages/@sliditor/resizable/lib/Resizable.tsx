/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useState, useEffect } from 'react'
import ResizeCore, { ResizeProps } from './ResizeCore'
import { ResizeEvent } from './types'

interface SizeState {
  width: number
  height: number
  propsHeight?: number
  propsWidth?: number
}

const Resizable: FC<ResizeProps> = (props) => {
  const [state, setState] = useState<SizeState | null>(null)

  const { style, onResize, children, ...resizeProps } = props

  const handleResize: ResizeEvent = (e, data) => {
    const { size } = data
    if (onResize) {
      // eslint-disable-next-line no-unused-expressions
      e.persist && e.persist()
      setState(onResize(e, data))
    } else {
      setState(size)
    }
  }

  return (
    <ResizeCore {...resizeProps} onResize={handleResize} width={state.height} height={state.height}>
      <div style={{ ...style, width: `${state.width}px`, height: `${state.height}px` }}>
        {children}
      </div>
    </ResizeCore>
  )
}

export default Resizable
