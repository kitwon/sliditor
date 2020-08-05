import './index.scss'

import React, { useState } from 'react'
import Draggable, { DraggableProps } from '../lib/Draggable'

export default {
  title: 'Draggable'
}

export const Common = (props: Partial<DraggableProps>) => (
  // eslint-disable-next-line
  <Draggable {...props}>
    <div className="rc-draggable">
      <span role="img" aria-label="so cool">
        😀 😎
        <br />
        👍 💯
      </span>
    </div>
  </Draggable>
)

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
