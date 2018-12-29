import * as React from 'react'
import styled, { StyledComponentProps } from 'styled-components'

import Circle from './circle'

let Button = styled.button`
  background: transparent;
  border: 2px solid transparent;
  padding: 0;
  border-radius: 50%;
  outline: none;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.darkBlue};
    box-shadow: ${({ theme }) => theme.colors.lightGray} 1px 3px 5px;
  }

  &:active {
    border-color: ${({ theme }) => theme.colors.blue};
    box-shadow: none;
  }

  &:disabled {
    border-color: transparent;
    box-shadow: none;

    ${Circle} {
      background: ${({ theme }) => theme.colors.lightGray};
    }
  }
`

let ActionButton = ({
  children,
  ...props
}: StyledComponentProps<'button', any, {}, never>) => (
  <Button {...props}>
    <Circle>{children}</Circle>
  </Button>
)

export default ActionButton

export { ActionButton }
