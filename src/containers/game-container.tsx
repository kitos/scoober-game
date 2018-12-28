import * as React from 'react'
import { useReducer } from 'react'
import { Box, Flex } from '@rebass/grid'
import { last } from 'ramda'

import ActionButton from '../components/action-button'
import Operation from '../components/operation'
import ActionList from '../components/action-list'
import { EndGame } from './end-game'

export type IOperation = '-' | '0' | '+'
type Issuer = 'me' | 'opponent'

export type IGameAction = {
  from: Issuer
  operation: IOperation
}

export type IGameStatus = 'progress' | 'won' | 'lose'

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
        actions: [{ from: 'opponent', operation: '0' }],
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
