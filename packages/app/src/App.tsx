import React from 'react'
import Toolbar from './components/Toolbar'
import Block from './components/Block'

import './assets/styles/app.scss'
import useCreateBlock from './hooks/useCreateBlock'

function App() {
  const { drag, dragStart, dragEnd, state } = useCreateBlock()

  return (
    <div className="page-wrapper">
      <Toolbar onDrag={drag} onDragStart={dragStart} onDragEnd={dragEnd} />
      <div className="playground">
        {Object.keys(state.pages).map((page) => {
          const blocks = state.pages[page]
          return Object.keys(blocks).map((id) => {
            const block = blocks[id]
            return <Block block={block} key={block.id} />
          })
        })}
      </div>
    </div>
  )
}

export default App
