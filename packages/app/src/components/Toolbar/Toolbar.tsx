import React, { FC, PropsWithChildren } from 'react'
import useCreateBlock from '../../hooks/useCreateBlock'

// import styled from '../../assets/styles'
import OptionList, { OptionProps } from './OptionList'

// const Toolbars = styled.div`
//   width: ${({ theme }) => theme.components.toolbar.width}px;
//   background-color: ${({ theme }) => theme.colors.gray[7]};
//   position: absolute;
//   left: 0;
//   top: 0;
//   bottom: 0;
// `

interface Props extends OptionProps {
  className?: any
  style?: CSSStyleSheet
}

const Toolbar: FC<PropsWithChildren<Props>> = (props) => {
  const { className } = props
  const { drag, dragStart, dragEnd } = useCreateBlock()

  return (
    <div className={`bg-gray-700 h-screen w-44 ${className}`}>
      <div className="p-3">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <OptionList onDrag={drag} onDragStart={dragStart} onDragEnd={dragEnd} />
      </div>
    </div>
  )
}

export default Toolbar
