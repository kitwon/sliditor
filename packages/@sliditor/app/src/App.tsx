import React from 'react'
import Toolbar, { OptionEvent } from './components/Toolbar'

import './assets/styles/app.scss'

function App() {
  const handleDrag: OptionEvent = (type, coreData) => {
    console.log(type, coreData)
  }

  return (
    <div className="page-wrapper">
      <Toolbar onDrag={handleDrag} />
    </div>
  )
}

export default App
