import * as React from 'react'
import styled from 'styled-components'
import { Box, Flex } from '@rebass/grid'

import { calculateResult, IGameAction } from '../containers/game-container'
import Operation from './operation'
import Circle from './circle'
import ResponsiveImage from './responsive-image'

let TextMsg = styled.p`
  background: #fff;
  padding: 10px 20px;
  box-shadow: #e2e2e2 2px 2px 10px;
`

let ActionList = ({
  actions,
  seed
}: {
  actions: IGameAction[]
  seed: number
}) => (
  <Flex
    as="ul"
    flexDirection="column"
    m={0}
    p={0}
    css={`
      list-style: none;
    `}
  >
    {actions
      .map((m, i) => ({
        ...m,
        prevResult: calculateResult(seed, actions.slice(0, i)),
        result: calculateResult(seed, actions.slice(0, i + 1))
      }))
      .map((m, i) => (
        <Flex
          key={i}
          as="li"
          flexDirection={m.from === 'me' ? 'row' : 'row-reverse'}
        >
          <Box mr={20}>
            <Circle background="gray" size="60px">
              <ResponsiveImage name={m.from === 'me' ? 'avatar' : 'opponent'} />
            </Circle>
          </Box>

          <Flex flexDirection="column">
            <Circle>
              <Operation value={m.operation} />
            </Circle>

            <TextMsg>
              [({m.prevResult}
              {m.operation === '0' ? '' : m.operation === '-' ? ' - 1' : ' + 1'}
              ) / 3] = {m.result}
            </TextMsg>
          </Flex>
        </Flex>
      ))}
  </Flex>
)

export default ActionList
export { ActionList }
