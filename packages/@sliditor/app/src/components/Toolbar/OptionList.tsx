import React, { FC } from 'react'
import { DragCore, DraggableEventHandler, DraggableData } from '@sliditor/draggable'
import { TOOLBAR_ADD_OPTIONS } from './constants'
import styled from '../../assets/styles'

export type OptionEvent = (type: string, coreData: DraggableData, e: MouseEvent) => any

export interface OptionProps {
  onDrag?: OptionEvent
  onAdd?: (e: React.MouseEvent, type: string) => any
}

const AddOption = styled.div`
  color: ${({ theme }) => theme.colors.gray[1]};
  text-align: center;
  padding: 20px 10px;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[6]};
  }
`

const OptionList: FC<OptionProps> = (props) => {
  const { onDrag, onAdd } = props
  const handleDrag = (type: string) => {
    const drag: DraggableEventHandler = (e, coreData) => {
      if (onDrag) return onDrag(type, coreData, e)
      return true
    }

    return drag
  }

  return (
    <div>
      {TOOLBAR_ADD_OPTIONS.map((i) => (
        <div style={{ position: 'relative' }} key={i.name}>
          <DragCore onDrag={handleDrag(i.type)}>
            <AddOption onClick={(e) => onAdd && onAdd(e, i.type)}>{i.name}</AddOption>
          </DragCore>
        </div>
      ))}
    </div>
  )
}

export default OptionList
