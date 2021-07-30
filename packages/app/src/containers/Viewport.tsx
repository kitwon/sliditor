import React, { FC } from 'react'
import Block from '../components/Block'

const Viewport = () => {
  return (
    <div className="absolute z-10 w-full h-full">
      {Object.keys(state.pages).map((page) => {
        const blocks = state.pages[page]
        return Object.keys(blocks).map((id) => {
          const block = blocks[id]
          return <Block block={block} key={block.id} />
        })
      })}
    </div>
  )
}

export default Viewport
