import * as React from 'react'
import { useEffect, useReducer, useState } from 'react'
import { Box, Flex } from '@rebass/grid'
import { last } from 'ramda'
import io from 'socket.io-client'

import ActionButton from '../components/action-button'
import ActionList from '../components/action-list'
import { EndGame } from './end-game'

export type IOperation = '-' | '+'
type Issuer = 'me' | 'opponent'

export type IGameAction = {
  from: Issuer
  operation: IOperation
  value: number
}

export type IGameStatus = 'progress' | 'won' | 'lose'

type IState = {
  actions: IGameAction[]
  status: IGameStatus
}

type IAction = { type: 'step'; payload: IGameAction } | { type: 'start' }

export let applyOperation = (o: IOperation, a: number, b: number) =>
  Math.round((o === '+' ? a + b : a - b) / 3)

export let calculateResult = (actions: IGameAction[]) =>
  actions.reduce(
    (res, action) => applyOperation(action.operation, res, action.value),
    0
  )

let reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'start':
      return {
        actions: [],
        status: 'progress'
      }
    case 'step':
      let { actions } = state
      let newAction = action.payload

      actions = [...state.actions, newAction]
      let result = calculateResult(actions)

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

let useSocket = () => {
  let [socket] = useState(() => io(window.location.origin))

  socket.on('connect', () => console.log('Connected to server!'))

  useEffect(
    () => () => {
      socket.disconnect()
      console.log('Disconnected from server.')
    },
    []
  )

  return socket
}

let GameContainer = ({ className }: { className: string }) => {
  let [{ status, actions }, dispatch] = useReducer(reducer, {
    actions: [],
    status: 'progress'
  })
  let lastOperation = last(actions)
  let socket = useSocket()

  useEffect(() => {
    socket.on('start', () => dispatch({ type: 'start' }))

    socket.on('step', (a: IGameAction) =>
      dispatch({
        type: 'step',
        payload: {
          ...a,
          from: a.from === socket.id ? 'me' : 'opponent'
        }
      })
    )

    return () => socket.off('step')
  }, [])

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
        <ActionList actions={actions} />
      </Box>

      <EndGame status={status} onReStart={() => socket.emit('start')} />

      {status === 'progress' && (
        <Flex justifyContent="space-between">
          {[
            { operation: '-', value: 1 },
            { operation: '+', value: 0 },
            { operation: '+', value: 1 }
          ].map(o => (
            <ActionButton
              key={o.value ? o.operation + o.value : '0'}
              disabled={lastOperation && lastOperation.from === 'me'}
              onClick={() => socket.emit('step', o)}
            >
              {o.value ? o.operation + o.value : '0'}
            </ActionButton>
          ))}
        </Flex>
      )}
    </Flex>
  )
}

export default GameContainer

export { GameContainer }
