import * as React from 'react'
import { always, cond, equals } from 'ramda'
import { IOperation } from '../containers/game-container'

let Operation = ({ value }: { value: IOperation }) => {
  let convert = cond([
    [equals('0'), always('0')],
    [equals('-'), always('-1')],
    [equals('+'), always('+1')]
  ])

  return <>{convert(value)}</>
}

export default Operation
export { Operation }
