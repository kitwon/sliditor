import React, { useEffect } from 'react'
import Toolbar from './components/Toolbar'
import Viewport from './containers/Viewport'

function App() {
  return (
    <div className="pl-44">
      <Toolbar className="absolute left-0 top-0 h-screen z-40" />
      <Viewport />
    </div>
  )
}

export default App
