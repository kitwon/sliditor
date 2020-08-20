import React, { useState, useCallback, useEffect } from 'react'
import Toolbar, { OptionEvent } from './components/Toolbar'
import Block from './components/Block'

import './assets/styles/app.scss'
import useBlocks from './hooks/use-blocks'

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const { state, getCurrentBlock, addBlock, updateBlock } = useBlocks()

  const dragStart: OptionEvent = useCallback(
    (type, coreData) => {
      const { x, y } = coreData
      addBlock(type, { position: { x, y }, content: 'Text' })
    },
    [state.currentBlock]
  )

  const drag: OptionEvent = useCallback(
    (type, coreData) => {
      const { x, y } = coreData
      setPos({ x, y })
    },
    [state.currentBlock]
  )

  const dragEnd: OptionEvent = useCallback(() => {
    setPos({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const { x, y } = pos
    const curblock = getCurrentBlock()
    if ((x === 0 && y === 0) || !curblock) return
    updateBlock(curblock.id, { ...curblock, position: pos })
  }, [pos, getCurrentBlock])

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
