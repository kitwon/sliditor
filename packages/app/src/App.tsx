import React from 'react'
import Toolbar from './components/Toolbar'
import Block from './components/Block'
import Grid from './components/Grid'

// import './assets/styles/app.scss'
import useCreateBlock from './hooks/useCreateBlock'

function App() {
  const { drag, dragStart, dragEnd, state } = useCreateBlock()

  return (
    <div className="flex">
      <Toolbar
        className="flex-shrink-0"
        onDrag={drag}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
      />

      <div className="flex items-center justify-center flex-1">
        <div>
          {Object.keys(state.pages).map((page) => {
            const blocks = state.pages[page]
            return Object.keys(blocks).map((id) => {
              const block = blocks[id]
              return <Block block={block} key={block.id} />
            })
          })}
        </div>

        <Grid />
      </div>
    </div>
  )
}

export default App
