import * as React from 'react'
import { useReducer } from 'react'
import { Box, Flex } from '@rebass/grid'
import { Transition } from 'react-spring'
import { last } from 'ramda'

import ActionButton from '../components/action-button'
import Operation from '../components/operation'
import ActionList from '../components/action-list'
import styled from 'styled-components'

export type IOperation = '-' | '0' | '+'
type Issuer = 'me' | 'opponent'

export type IGameAction = {
  from: Issuer
  operation: IOperation
}

type IGameStatus = 'progress' | 'won' | 'lose'

type IState = {
  seed: number
  actions: IGameAction[]
  status: IGameStatus
}

type IAction = { type: IOperation | 'start' }

export let applyOperation = (a: IOperation, seed: number) => {
  switch (a) {
    case '-':
      seed--
      break
    case '+':
      seed++
  }

  return Math.round(seed / 3)
}

export let calculateResult = (seed: number, messages: IGameAction[]) =>
  messages.reduce((res, m) => applyOperation(m.operation, res), seed)

let reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'start':
      return {
        actions: [{ from: 'me', operation: '0' }],
        seed: Math.round(Math.random() * 100),
        status: 'progress'
      }
    case '-':
    case '0':
    case '+':
      let actions = [
        ...state.actions,
        { from: 'me' as Issuer, operation: action.type }
      ]
      let result = calculateResult(state.seed, actions)
      let lastMessage = last(actions)
      let status: IGameStatus =
        result <= 1
          ? lastMessage && lastMessage.from === 'me'
            ? 'won'
            : 'lose'
          : 'progress'

      return {
        ...state,
        actions,
        status
      }
    default:
      return state
  }
}

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

let EndGame = ({
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

          <WhiteButton onClick={onReStart}>New game</WhiteButton>
        </Flex>
      )}
    </Transition>
  )

let WhiteButton = styled.button`
  background: #fff;
  color: #5189b7;
  font-size: 24px;
  font-weight: bold;
  padding: 20px 64px;
  border-radius: 35px;
`

let GameContainer = ({ className }: { className: string }) => {
  let [{ seed, status, actions }, dispatch] = useReducer(
    reducer,
    {} as IState,
    { type: 'start' }
  )

  return (
    <Flex
      flexDirection="column"
      className={className}
      css={`
        position: relative;
      `}
    >
      <Box
        flex={1}
        mb={20}
        css={`
          overflow: auto;
        `}
      >
        <ActionList {...{ actions, seed }} />
      </Box>

      <EndGame status={status} onReStart={() => dispatch({ type: 'start' })} />

      {status === 'progress' && (
        <Flex justifyContent="space-between">
          {(['-', '0', '+'] as IOperation[]).map(o => (
            <ActionButton onClick={() => dispatch({ type: o })}>
              <Operation value={o} />
            </ActionButton>
          ))}
        </Flex>
      )}
    </Flex>
  )
}

export default GameContainer

export { GameContainer }
