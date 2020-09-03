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
  const { width, height } = props
  const [state, setState] = useState<SizeState>({
    width,
    height,
    propsWidth: width,
    propsHeight: height
  })

  const { style, onResize, children, ...resizeProps } = props

  const handleResize: ResizeEvent = (e, data) => {
    console.log(data)
    const { size } = data
    if (onResize) {
      // eslint-disable-next-line no-unused-expressions
      e.persist && e.persist()
      setState(onResize(e, data))
    } else {
      setState(size)
    }
  }

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <ResizeCore {...resizeProps} onResize={handleResize} width={state.height} height={state.height}>
      <div style={{ ...style, width: `${state.width}px`, height: `${state.height}px` }}>
        {[children]}
      </div>
    </ResizeCore>
  )
}

export default Resizable
