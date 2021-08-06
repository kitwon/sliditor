import React from 'react'
import Block from '../components/Block'
import Grid from '../components/Grid'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { updateGridRect } from '../store/modules/setting'

const Viewport = () => {
  const { pages } = useAppSelector((root) => root.pages)
  const { viewport, grid } = useAppSelector((root) => root.setting)
  const dispatch = useAppDispatch()

  return (
    <div className="playground relative h-screen">
      {/* <div className="absolute z-10 w-full h-full"> */}
      <div
        className="absolute top-0 bottom-0 left-0 right-0 border-dashed border m-auto z-10"
        style={{
          width: `${viewport.width}px`,
          height: `${viewport.height}px`,
          borderColor: grid.borderColor
        }}
      >
        {Object.keys(pages).map((page) => {
          const blocks = pages[page]
          return Object.keys(blocks).map((id) => {
            const block = blocks[id]
            return <Block block={block} key={block.id} />
          })
        })}
      </div>

      <div className="w-full h-full absolute top-0 z-0">
        <Grid
          width={viewport.width}
          height={viewport.height}
          grid={grid}
          onUpdateRect={(rect) => dispatch(updateGridRect(rect))}
        />
      </div>
    </div>
  )
}

export default Viewport
