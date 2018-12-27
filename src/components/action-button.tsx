import * as React from 'react'
import styled from 'styled-components'

import Circle from './circle'

let Button = styled.button`
  background: transparent;
  border: 2px solid transparent;
  padding: 0;
  border-radius: 50%;
  outline: none;

  &:hover,
  &:focus {
    border-color: green;
  }
`

let ActionButton = ({
  children,
  onClick
}: {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler
}) => (
  <Button onClick={onClick}>
    <Circle>{children}</Circle>
  </Button>
)

export default ActionButton

export { ActionButton }
