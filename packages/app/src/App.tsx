import React from 'react'
import Toolbar from './components/Toolbar'
import Block from './components/Block'
import Grid from './components/Grid'

// import './assets/styles/app.scss'
import useCreateBlock from './hooks/useCreateBlock'

function App() {
  const { drag, dragStart, dragEnd, state } = useCreateBlock()

  return (
    <div className="pl-44">
      <Toolbar
        className="absolute left-0 top-0 h-screen z-50"
        onDrag={drag}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
      />

      <div className="playground relative h-screen">
        <div className="absolute z-10 w-full h-full">
          {Object.keys(state.pages).map((page) => {
            const blocks = state.pages[page]
            return Object.keys(blocks).map((id) => {
              const block = blocks[id]
              return <Block block={block} key={block.id} />
            })
          })}
        </div>

        <div className="w-full h-full absolute top-0 z-0 flex items-center justify-center">
          <Grid />
        </div>
      </div>
    </div>
  )
}

export default App
