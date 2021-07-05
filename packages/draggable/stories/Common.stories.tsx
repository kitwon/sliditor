import './index.scss'

import React, { useState } from 'react'
import Draggable, { DraggableProps } from '../lib/Draggable'

export default {
  title: 'Draggable'
}

export const Common = (props: Partial<DraggableProps>) => {
  const { children } = props
  return (
    // eslint-disable-next-line
    <Draggable {...props}>
      <div className="rc-draggable">
        {children}
        <span role="img" aria-label="so cool" style={{ verticalAlign: 'middle' }}>
          😀 😎
          <br />
          👍 💯
        </span>
      </div>
    </Draggable>
  )
}

export const WithAxisX = () => <Common axis="x" />
export const WithAxisY = () => <Common axis="y" />

export const StartPostion = () => <Common startPosition={{ x: 88, y: 88 }} />

export const Position = () => {
  const [position, setPosition] = useState({ x: 88, y: 88 })
  const handleDragEnd = (e, coreData) => {
    const { lastX, lastY } = coreData
    setPosition({ x: lastX + 18, y: lastY + 18 })
  }

  return <Common position={position} onStop={handleDragEnd} />
}

export const CustomClassname = () => (
  <Common className="custom-class" draggedClassName="rc-dragged" draggingClassName="rc-dragging" />
)

export const Scale = () => <Common scale={1.2} />
export const Grid = () => <Common grid={[30, 30]} />

export const positionOffset = () => <Common positionOffset={{ x: 50, y: 50 }} />

export const DragHandle = () => (
  <Common className="no-drag" handle=".handle">
    <div className="handle drag">Drag here!</div>
  </Common>
)

export const DragCancel = () => (
  <Common cancel=".cancel">
    <div className="cancel no-drag">Can&apos;t drag here!</div>
  </Common>
)

export const Disabled = () => <Common disable />
