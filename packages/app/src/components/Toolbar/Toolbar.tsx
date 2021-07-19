import React, { FC } from 'react'
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
  style?: CSSStyleSheet
}

const Toolbar: FC<Props> = (props) => {
  return (
    <div className="absolute bg-gray-700 left-0 top-0 bottom-0">
      <div className="p-3">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <OptionList {...props} />
      </div>
    </div>
  )
}

export default Toolbar
