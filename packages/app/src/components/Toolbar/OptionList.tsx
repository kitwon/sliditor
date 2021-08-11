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

const OptionList: FC<OptionProps> = (props) => {
  const { onDrag, onDragStart, onDragEnd } = props
  const handleDrag = useCallback(
    (type: string, event?: OptionEvent) => {
      const drag: DraggableEventHandler = (e, coreData) => {
        if (event) return event(type, coreData, e)
        return true
      }

      return drag
    },
    [onDrag, onDragStart, onDragEnd]
  )

  return (
    <div className="relative">
      {TOOLBAR_ADD_OPTIONS.map((i) => (
        <div key={i.name}>
          <DragCore
            onDrag={handleDrag(i.type, onDrag)}
            onStart={(e, core) => onDragStart?.(i.type, core, e)}
            onStop={handleDrag(i.type, onDragEnd)}
          >
            <div className="text-gray-100 px-5 py-3 cursor-pointer rounded hover:bg-gray-600 text-center">
              {i.name}
            </div>
          </DragCore>
        </div>
      ))}
    </div>
  )
}

export default OptionList
