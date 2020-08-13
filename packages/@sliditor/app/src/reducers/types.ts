export interface Block<T = { [key: string]: any }> {
  id: string
  position: { x: number; y: number }
  props: T
}

export interface BlockState {
  past: Block[]
  map: { [key: string]: Block }
  future: Block[]
}
