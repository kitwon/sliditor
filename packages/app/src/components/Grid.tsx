import React, { CSSProperties, FC, useEffect, useRef } from 'react'
import { RootState } from '../store'

interface Props {
  className?: string
  style?: CSSProperties
  width: number
  height: number
  color?: string
  strokeWidth?: number
  grid: RootState['setting']['grid']
  onUpdateRect?: (rect: DOMRect) => any
}

const Grid: FC<Props> = (props) => {
  const { className, width, height, grid, onUpdateRect, strokeWidth = 2 } = props
  const dom = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (dom.current) {
      onUpdateRect?.({ ...dom.current.getBoundingClientRect().toJSON() })
    }
  }, [dom])

  return (
    <div
      className={`absolute w-full h-full left-0 top-0 right-0 bottom-0 m-auto ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`
      }}
      ref={dom}
    >
      <svg id="svg" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width={grid.col} height={grid.row} patternUnits="userSpaceOnUse">
            {/* <rect width="80" height="80" fill="url(#smallGrid)" /> */}
            {/* draw from upper right to upper left, then down to lower left */}
            {/* This creates the appearance of an 80x80 grid when stacked */}
            <path
              d={`M ${grid.col} 0 H 0 V ${grid.row}`}
              fill="none"
              stroke={grid.color}
              strokeWidth={strokeWidth}
            />
          </pattern>
        </defs>

        {/* a trick from my old Commodore 64 days is to extend the scrolling region beyond the viewport and use mod 80 to reset the position to simulate a virtual space. */}
        <rect
          transform="translate(0, 0)"
          x={strokeWidth}
          y={strokeWidth}
          id="surface"
          width={width}
          height={height}
          fill="url(#grid)"
        />
      </svg>
    </div>
  )
}

export default Grid
