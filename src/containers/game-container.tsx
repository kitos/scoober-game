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

let operations: IOperation[] = ['-', '0', '+']

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

type IAction = { type: 'step'; payload: IGameAction } | { type: 'start' }

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
    case 'step':
      let result = calculateResult(state.seed, state.actions)

      if (result <= 1) {
        return state // game is already over
      }

      let actions = [...state.actions, action.payload]
      result = calculateResult(state.seed, actions)
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
          {operations.map(o => (
            <ActionButton
              onClick={() => {
                dispatch({
                  type: 'step',
                  payload: { from: 'me', operation: o }
                })

                dispatch({
                  type: 'step',
                  payload: {
                    from: 'opponent',
                    operation:
                      operations[Math.floor(Math.random() * operations.length)]
                  }
                })
              }}
            >
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
