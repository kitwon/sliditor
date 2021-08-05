import React from 'react'
import Toolbar from './components/Toolbar'
import Viewport from './containers/Viewport'

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

      <Viewport />
    </div>
  )
}

export default App
