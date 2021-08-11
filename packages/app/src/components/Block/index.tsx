import React, { FC, useState, useEffect } from 'react'
import Draggable from '@sliditor/draggable'
import { Block } from '../../models/block'

interface BlockProps {
  block: Block
}

const BlockContainer: FC<BlockProps> = (props) => {
  const { block } = props
  const [pos, setPos] = useState(block.position)

  useEffect(() => {
    setPos(block.position)
  }, [block.position])

  useEffect(() => {
    console.log(pos)
  }, [pos])

  return (
    <Draggable position={pos} onDrag={(e, coreData) => setPos({ x: coreData.x, y: coreData.y })}>
      <div className="fixed cursor-pointer z-50">{block.content}</div>
    </Draggable>
  )
}

export default BlockContainer
