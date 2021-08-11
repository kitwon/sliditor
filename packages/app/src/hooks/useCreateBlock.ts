import { useState, useCallback, useEffect } from 'react'
import useBlocks from './useBlocks'
import { OptionEvent } from '../components/Toolbar/OptionList'
import { useAppSelector } from './store'

export default function useCreateBlock() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const { state, getCurrentBlock, add, update } = useBlocks()
  const { gridRect } = useAppSelector((rootState) => rootState.setting)

  const dragStart: OptionEvent = (type, coreData, e) => {
    const { x, y } = coreData

    add(type, {
      position: { x: x - gridRect.left, y: y - gridRect.top },
      // position: { x, y },
      visible: true,
      content: 'Text'
    })
  }

  const drag: OptionEvent = (type, coreData) => {
    requestAnimationFrame(() => {
      const { x, y } = coreData
      setPos({ x: x - gridRect.left, y: y - gridRect.top })
    })
  }

  const dragEnd: OptionEvent = useCallback(() => {
    setPos({ x: 0, y: 0 })
  }, [])

  // useEffect(() => {
  //   const { x, y } = pos
  //   const curblock = getCurrentBlock()
  //   if ((x || y) && curblock) update(curblock.id, { ...curblock, position: pos, visible: true })
  // }, [pos])

  return { drag, dragStart, dragEnd, state }
}
