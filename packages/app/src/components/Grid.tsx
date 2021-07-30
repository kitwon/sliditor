import React, { FC, useEffect, useState } from 'react'
import { PRESENTATION_SIZE } from '../constants'

interface Props {
  className?: string
  width?: number
  height?: number
  color?: string
  strokeWidth?: number
}

function getGridSize(width: number, height: number) {
  const rowCount = Math.round(height / 70)
  const colCount = Math.round(width / 80)
  return {
    rowCount,
    colCount,
    row: height / rowCount,
    col: width / colCount
  }
}

const Grid: FC<Props> = (props) => {
  const {
    className,
    width = PRESENTATION_SIZE[1].width,
    height = PRESENTATION_SIZE[1].height,
    color = '#eaeaea',
    strokeWidth = 2
  } = props

  const [grid, updateGrid] = useState({
    ...getGridSize(width, height)
  })

  useEffect(() => {
    updateGrid({ ...getGridSize(width, height) })
  }, [width, height])

  return (
    <div className={className}>
      <svg id="svg" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 H 0 V 8" fill="none" stroke={color} strokeWidth="0.5" />
          </pattern>

          <pattern id="grid" width={grid.col} height={grid.row} patternUnits="userSpaceOnUse">
            {/* <rect width="80" height="80" fill="url(#smallGrid)" /> */}
            {/* draw from upper right to upper left, then down to lower left */}
            {/* This creates the appearance of an 80x80 grid when stacked */}
            <path
              d={`M ${grid.col} 0 H 0 V ${grid.row}`}
              fill="none"
              stroke={color}
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
