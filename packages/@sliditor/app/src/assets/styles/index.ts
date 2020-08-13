import styled, { CreateStyled } from '@emotion/styled'
import Theme from 'merely.css/theme'

export const theme = {
  ...Theme,
  colors: { ...Theme.colors, primary: '#ff7dc5' },
  components: {
    toolbar: {
      width: 170
    }
  }
}

export type Theme = typeof theme
export default styled as CreateStyled<typeof theme>
