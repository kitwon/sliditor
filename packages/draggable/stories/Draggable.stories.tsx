/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import Draggable from '../lib/DragCore'

export default {
  title: 'Draggable',
  component: Draggable
}

export const Common = () => (
  <Draggable>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Draggable>
)
