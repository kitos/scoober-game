import * as React from 'react'
import { Transition } from 'react-spring'
import styled from 'styled-components'
import { Box, Flex } from '@rebass/grid'

import { IGameStatus } from './game-container'
import WhiteButton from '../components/white-button'
import ResponsiveImage from '../components/responsive-image'

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
}) => (
  <Transition
    items={status}
    trail={200}
    from={{ opacity: 0, transform: 'scale(0.2)' }}
    enter={{ opacity: 0.8, transform: 'scale(1)' }}
    leave={{ opacity: 0, transform: 'scale(0.2)' }}
  >
    {s =>
      s !== 'progress' &&
      (({ opacity, transform }) => (
        <Flex
          as={EndGameCover}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{ opacity }}
        >
          <ResponsiveImage name={s} style={{ transform }} />

          <Box my={20} style={{ transform }}>
            {s === 'won' ? 'You won!' : 'You lose :-('}
          </Box>

          <Transition
            items={status}
            trail={status !== 'progress' ? 500 : 0}
            from={{ transform: 'translateY(300px)' }}
            enter={{ transform: 'translateY(0)' }}
            leave={{ transform: 'translateY(300px)' }}
          >
            {status =>
              status !== 'progress' &&
              (style => (
                <WhiteButton style={style} onClick={onReStart}>
                  New game
                </WhiteButton>
              ))
            }
          </Transition>
        </Flex>
      ))
    }
  </Transition>
)
