export function find<T, K = Array<T>>(array: K, cb: (value: T, index: number) => void) {
  if (!Array.isArray(array)) return undefined

  for (let i = 0, { length } = array; i < length; i += 1) {
    if (cb.apply(cb, [array[i], i, array])) return array[i]
  }

  return undefined
}

export function isFunction(func: any) {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]'
}

export function isNum(number: number) {
  return typeof number === 'number' && !Number.isNaN(number)
}

export function int(number) {
  return parseInt(number, 10)
}

export function snapToGrid(grid: [number, number], pendingX: number, pendingY: number) {
  const x = Math.round(pendingX / grid[0]) * grid[0]
  const y = Math.round(pendingY / grid[1]) * grid[1]

  return [x, y]
}

export function canDragX(axis) {
  return axis === 'both' || axis === 'x'
}

export function canDragY(axis) {
  return axis === 'both' || axis === 'y'
}

export function log(...args) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    // console.log(...args)
  }
}
