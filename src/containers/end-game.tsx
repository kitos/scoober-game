import * as React from 'react'
import { Transition } from 'react-spring'
import styled from 'styled-components'
import { Box, Flex } from '@rebass/grid'

import { IGameStatus } from './game-container'
import WhiteButton from '../components/white-button'

let EndGameCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.blue};
  color: #fff;
  font-size: 64px;
  font-weight: bold;
`

export let EndGame = ({
  status,
  onReStart
}: {
  status: IGameStatus
  onReStart: () => void
}) =>
  status === 'progress' ? null : (
    <Transition
      items={status}
      from={{ opacity: 0, transform: 'scale(0.2)' }}
      enter={{ opacity: 0.8, transform: 'scale(1)' }}
      leave={{ opacity: 0, transform: 'scale(0.2)' }}
    >
      {() => ({ opacity, transform }) => (
        <Flex
          as={EndGameCover}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{ opacity }}
        >
          <img
            style={{ transform }}
            src={`/img/${status}.png`}
            srcSet={`/img/${status}.png, /img/${status}@2x.png 2x, /img/${status}@3x.png 3x`}
          />

          <Box my={20} style={{ transform }}>
            {status === 'won' ? 'You won!' : 'You lose :-('}
          </Box>

          <Transition
            items={1}
            trail={500}
            from={{ transform: 'translateY(300px)' }}
            enter={{ transform: 'translateY(0)' }}
            leave={{ transform: 'translateY(300px)' }}
          >
            {() => style => (
              <WhiteButton style={style} onClick={onReStart}>
                New game
              </WhiteButton>
            )}
          </Transition>
        </Flex>
      )}
    </Transition>
  )
