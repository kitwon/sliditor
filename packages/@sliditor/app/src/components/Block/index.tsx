import React, { FC, useState, useEffect } from 'react'
import Draggable from '@sliditor/draggable'
import { Block } from '../../types/block'
import styled from '../../assets/styles'

interface BlockProps {
  block: Block
}

const BlockWrap = styled.div`
  display: inline-block;
  position: absolute;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`

const BlockContainer: FC<BlockProps> = (props) => {
  const { block } = props

  const [pos, setPos] = useState(block.position)

  useEffect(() => {
    setPos(block.position)
  }, [block.position])

  return (
    <Draggable position={pos} onDrag={(e, coreData) => setPos({ x: coreData.x, y: coreData.y })}>
      <BlockWrap>{block.content}</BlockWrap>
    </Draggable>
  )
}

export default BlockContainer
