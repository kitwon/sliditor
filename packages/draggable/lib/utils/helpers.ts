import { Axis } from '../types'

export function find<T>(array: Array<T>, cb: (value: T, index: number, array: Array<T>) => any) {
  if (!Array.isArray(array)) return undefined

  for (let i = 0, { length } = array; i < length; i += 1) {
    if (cb.apply(cb, [array[i], i, array])) return array[i]
  }

  return undefined
}

export function isFunction(func: any) {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]'
}

export function isNum(number?: number) {
  return typeof number === 'number' && !Number.isNaN(number)
}

export function int(number: string) {
  return parseInt(number, 10)
}

export function snapToGrid(grid: [number, number], pendingX: number, pendingY: number) {
  const x = Math.round(pendingX / grid[0]) * grid[0]
  const y = Math.round(pendingY / grid[1]) * grid[1]

  return [x, y]
}

export function canDragX(axis: Axis) {
  return axis === 'both' || axis === 'x'
}

export function canDragY(axis: Axis) {
  return axis === 'both' || axis === 'y'
}

export function log(...args: any[]) {
  // if (process.env.NODE_ENV === 'development') {
  //   // eslint-disable-next-line
  //   console.log(...args)
  // }
}
