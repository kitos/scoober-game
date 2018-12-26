import * as React from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'

import Circle from './circle'

let ActionButton = styled.button`
  background: transparent;
  border: 2px solid transparent;
  padding: 0;
  border-radius: 50%;
  outline: none;

  &:hover,
  &:active {
    border-color: green;
  }
`

export let ActionBar = () => (
  <Flex justifyContent="space-between" m="20px">
    <ActionButton>
      <Circle>-1</Circle>
    </ActionButton>
    <ActionButton>
      <Circle>0</Circle>
    </ActionButton>
    <ActionButton>
      <Circle>+1</Circle>
    </ActionButton>
  </Flex>
)
