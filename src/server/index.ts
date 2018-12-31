import http from 'http'
import Koa from 'koa'
import serve from 'koa-static'
import socket from 'socket.io'

let app = new Koa()
let server = http.createServer(app.callback())
let io = socket(server)

app.use(serve('../../build'))

let pickRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

type IOperation = '-' | '+'

type IGameAction = {
  from: string
  operation: IOperation
  value: number
}

let users = new Set<string>()
let actions: IGameAction[] = []

export let applyOperation = (o: IOperation, a: number, b: number) =>
  Math.round((o === '+' ? a + b : a - b) / 3)

export let calculateResult = (actions: IGameAction[]) =>
  actions.reduce(
    (res, action) => applyOperation(action.operation, res, action.value),
    0
  )

let performAction = (action: IGameAction) => {
  let lastAction = actions[actions.length - 1]

  if (
    lastAction &&
    (lastAction.from === action.from || calculateResult(actions) <= 1)
  ) {
    return
  }

  io.emit('step', action)
  actions.push(action)
}

io.on('connection', socket => {
  let clientId = socket.id

  console.log(`Client connected: ${clientId}`)

  if (users.size < 2) {
    users.add(clientId)
    console.log(`Client "${clientId}" was added to game session.`)

    socket.on('start', () => {
      actions = []
      io.emit('start')
    })

    socket.on('step', (action: IGameAction) => {
      let isFirstAction = actions.length === 0

      performAction({
        ...action,
        operation: isFirstAction ? '+' : action.operation,
        value: isFirstAction
          ? Math.floor(Math.random() * 100) + 50
          : action.value,
        from: clientId
      })

      // add "bot" for single player
      if (users.size < 2) {
        setTimeout(
          () =>
            performAction({
              operation: pickRandom(['+', '-']),
              value: pickRandom([1, 0]),
              from: 'opponent'
            }),
          1000
        )
      }
    })
  }

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${clientId}`)

    if (users.has(clientId)) {
      users.delete(clientId)
      console.log(`Client "${clientId}" was removed from game session.`)
    }
  })
})

const { PORT = 8080 } = process.env

server.listen(PORT, () => console.log(`Server listening: ${PORT}`))
