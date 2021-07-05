import React from 'react'

import Resizable, { ResizeProps } from '../lib'
import './index.scss'

export default {
  title: 'Resizable'
}

export const common = (props: Partial<ResizeProps>) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Resizable {...props} width={110} height={110}>
      <span role="img" aria-label="so cool" style={{ verticalAlign: 'middle' }}>
        😀 😎
        <br />
        👍 💯
      </span>
    </Resizable>
  )
}
