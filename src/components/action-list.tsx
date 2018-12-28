import * as React from 'react'
import styled from 'styled-components'
import { Box, Flex } from '@rebass/grid'
import { Transition } from 'react-spring'

import { calculateResult, IGameAction } from '../containers/game-container'
import Operation from './operation'
import Circle from './circle'
import ResponsiveImage from './responsive-image'

let TextMsg = styled.p`
  background: #fff;
  padding: 10px 20px;
  box-shadow: #e2e2e2 2px 2px 10px;
`

let translateX = ({ from }: IGameAction): object => ({
  transform: `translateX(${from === 'me' ? '-100%' : '100%'})`
})

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
    <Transition
      items={actions.map((a, i) => ({
        ...a,
        id: i,
        prevResult: calculateResult(seed, actions.slice(0, i)),
        result: calculateResult(seed, actions.slice(0, i + 1))
      }))}
      keys={({ id }) => id}
      from={translateX}
      enter={{ transform: 'translateX(0)' }}
      leave={translateX}
    >
      {action => style => (
        <Flex
          as="li"
          flexDirection={action.from === 'me' ? 'row' : 'row-reverse'}
          style={style}
        >
          <Box mr={20}>
            <Circle background="gray" size="60px">
              <ResponsiveImage
                name={action.from === 'me' ? 'avatar' : 'opponent'}
              />
            </Circle>
          </Box>

          <Flex flexDirection="column">
            <Circle>
              <Operation value={action.operation} />
            </Circle>

            <TextMsg>
              [({action.prevResult}
              {action.operation === '0'
                ? ''
                : action.operation === '-'
                ? ' - 1'
                : ' + 1'}
              ) / 3] = {action.result}
            </TextMsg>
          </Flex>
        </Flex>
      )}
    </Transition>
  </Flex>
)

export default ActionList
export { ActionList }
