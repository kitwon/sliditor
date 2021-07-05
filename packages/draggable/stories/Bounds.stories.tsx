import React from 'react'
import { Common } from './Common.stories'

export default {
  title: 'Draggable/Bounds'
}

export const BoundRight = () => <Common bounds={{ right: 100 }} />
export const BoundBottom = () => <Common bounds={{ bottom: 100 }} />
export const BoundLeft = () => <Common bounds={{ left: 80 }} startPosition={{ x: 150, y: 0 }} />
export const BoundTop = () => <Common bounds={{ top: 80 }} startPosition={{ x: 0, y: 150 }} />
export const BoundAll = () => (
  <Common
    bounds={{ right: 350, bottom: 350, left: 0, top: 0 }}
    startPosition={{ x: 250, y: 250 }}
  />
)

export const BoundsWithElement = () => {
  return (
    <div
      className="wrapper"
      style={{
        position: 'relative',
        width: 500,
        height: 600,
        border: '1px solid #ddd',
        backgroundColor: '#fdfdfd',
        padding: 10
      }}
    >
      <Common bounds=".wrapper" />
    </div>
  )
}
