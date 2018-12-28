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
        seed: Math.round(100 + Math.random() * 100),
        status: 'progress'
      }
    case 'step':
      let { seed, actions } = state
      let result = calculateResult(seed, actions)
      let lastAction = last(actions)
      let newAction = action.payload

      if (result <= 1 || (lastAction && lastAction.from === newAction.from)) {
        return state
      }

      actions = [...state.actions, newAction]
      result = calculateResult(state.seed, actions)

      let status: IGameStatus =
        result <= 1 ? (newAction.from === 'me' ? 'won' : 'lose') : 'progress'

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
  let lastOperation = last(actions)

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
          overflow-y: auto;
          overflow-x: hidden;
        `}
      >
        <ActionList {...{ actions, seed }} />
      </Box>

      <EndGame status={status} onReStart={() => dispatch({ type: 'start' })} />

      {status === 'progress' && (
        <Flex justifyContent="space-between">
          {operations.map(o => (
            <ActionButton
              disabled={!lastOperation || lastOperation.from === 'me'}
              onClick={() => {
                dispatch({
                  type: 'step',
                  payload: { from: 'me', operation: o }
                })

                setTimeout(
                  () =>
                    dispatch({
                      type: 'step',
                      payload: {
                        from: 'opponent',
                        operation:
                          operations[
                            Math.floor(Math.random() * operations.length)
                          ]
                      }
                    }),
                  1000
                )
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
