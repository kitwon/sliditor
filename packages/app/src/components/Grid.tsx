import React from 'react'

export default function Grid() {
  return (
    <div>
      <svg id="svg" width="960" height="700" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 H 0 V 8" fill="none" stroke="#eaeaea" strokeWidth="0.5" />
          </pattern>

          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* <rect width="80" height="80" fill="url(#smallGrid)" /> */}
            {/* draw from upper right to upper left, then down to lower left */}
            {/* This creates the appearance of an 80x80 grid when stacked */}
            <path d="M 80 0 H 0 V 80" fill="none" stroke="#eaeaea" strokeWidth="2" />
          </pattern>
        </defs>

        {/* a trick from my old Commodore 64 days is to extend the scrolling region beyond the viewport and use mod 80 to reset the position to simulate a virtual space. */}
        <rect
          transform="translate(0, 0)"
          x="2"
          y="2"
          id="surface"
          width="960"
          height="700"
          fill="url(#grid)"
        />
      </svg>
    </div>
  )
}
