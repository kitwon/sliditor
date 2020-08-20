import { ControlPosition } from '@sliditor/draggable'

export interface BlockProps {
  id: string
  type: string
  content?: string
  visible?: boolean
  position?: ControlPosition
}

export interface Border {
  width: number
  color: string
  style?: string
}

export class Block {
  id: string

  type: string

  visible: boolean

  position: ControlPosition

  border: null | Border = null

  opacity = 1

  content = ''

  constructor(props: BlockProps) {
    this.id = props.id
    this.type = props.type
    this.position = props.position ?? { x: 0, y: 0 }
    this.content = props.content || ''
    this.visible = false
  }
}
