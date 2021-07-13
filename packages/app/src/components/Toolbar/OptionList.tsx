import React, { FC, useCallback, SyntheticEvent } from 'react'
import { DragCore, DraggableEventHandler, DraggableData } from '@sliditor/draggable'
import { TOOLBAR_ADD_OPTIONS } from './constants'
// import styled from '../../assets/styles'

export type OptionEvent = (type: string, coreData: DraggableData, e: SyntheticEvent) => any

export interface OptionProps {
  onDrag?: OptionEvent
  onDragStart?: OptionEvent
  onDragEnd?: OptionEvent
}

// const AddOption = styled.div`
//   color: ${({ theme }) => theme.colors.gray[1]};
//   text-align: center;
//   padding: 20px 10px;
//   cursor: pointer;
//   border-radius: 3px;
//   &:hover {
//     background-color: ${({ theme }) => theme.colors.gray[6]};
//   }
// `

const OptionList: FC<OptionProps> = (props) => {
  const { onDrag, onDragStart, onDragEnd } = props
  const handleDrag = useCallback((type: string, event?: OptionEvent) => {
    const drag: DraggableEventHandler = (e, coreData) => {
      if (event) return event(type, coreData, e)
      return true
    }

    return drag
  }, [])

  return (
    <div className="relative bg-white">
      {TOOLBAR_ADD_OPTIONS.map((i) => (
        <div key={i.name}>
          <DragCore
            onDrag={handleDrag(i.type, onDrag)}
            onStart={handleDrag(i.type, onDragStart)}
            onStop={handleDrag(i.type, onDragEnd)}
          >
            <div>{i.name}</div>
          </DragCore>
        </div>
      ))}
    </div>
  )
}

export default OptionList
