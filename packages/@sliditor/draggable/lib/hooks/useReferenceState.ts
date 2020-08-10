import { useState, useRef, MutableRefObject } from 'react'

export default function useReferenceState<T>(
  initialValue: T
): [MutableRefObject<T>, (value: T) => any, T] {
  const [state, setState] = useState<T>(initialValue)
  const reference = useRef<T>(state)

  const setRef = (value: T) => {
    reference.current = value
    setState(value)
  }

  return [reference, setRef, state]
}
