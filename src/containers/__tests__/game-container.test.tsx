import { IGameAction, reducer } from '../game-container'

describe('game-container', () => {
  let mockGameAction: IGameAction = { from: 'me', value: 42, operation: '+' }

  describe('reducer', () => {
    it('should reset actions on "start" action', () =>
      expect(
        reducer(
          {
            actions: [mockGameAction],
            status: 'progress'
          },
          { type: 'start' }
        ).actions
      ).toEqual([]))

    it('should set status to "progress" on "start" action', () =>
      expect(
        reducer(
          {
            actions: [mockGameAction],
            status: 'won'
          },
          { type: 'start' }
        ).status
      ).toEqual('progress'))

    it('should push action on "step"', () =>
      expect(
        reducer(
          {
            actions: [],
            status: 'progress'
          },
          { type: 'step', payload: mockGameAction }
        ).actions
      ).toEqual([mockGameAction]))

    it('should set status to "progress" if result > 1', () =>
      expect(
        reducer(
          { actions: [], status: 'won' },
          { type: 'step', payload: mockGameAction }
        ).status
      ).toEqual('progress'))

    it('should set status to "won" if result <= 1 and last action was made by "me"', () =>
      expect(
        reducer(
          { actions: [], status: 'progress' },
          { type: 'step', payload: { from: 'me', operation: '+', value: 1 } }
        ).status
      ).toEqual('won'))

    it('should set status to "lose" if result <= 1 and last action was made by "opponent"', () =>
      expect(
        reducer(
          { actions: [], status: 'progress' },
          {
            type: 'step',
            payload: { from: 'opponent', operation: '+', value: 1 }
          }
        ).status
      ).toEqual('lose'))
  })
})
