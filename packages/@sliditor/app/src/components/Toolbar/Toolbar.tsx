import React, { FC } from 'react'
import styled from '../../assets/styles'
import OptionList, { OptionProps } from './OptionList'

const Toolbars = styled.div`
  width: ${({ theme }) => theme.components.toolbar.width}px;
  background-color: ${({ theme }) => theme.colors.gray[7]};
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
`

interface Props extends OptionProps {
  style?: CSSStyleSheet
}

const Toolbar: FC<Props> = (props) => {
  const { onDrag } = props

  return (
    <Toolbars>
      <div className="p-3">
        <OptionList onDrag={onDrag} />
      </div>
    </Toolbars>
  )
}

export default Toolbar
