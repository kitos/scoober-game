import http from 'http'
import Koa from 'koa'
import serve from 'koa-static'
import socket from 'socket.io'

let app = new Koa()
let server = http.createServer(app.callback())
let io = socket(server)

app.use(serve('../../build'))

let pickRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

io.on('connection', socket => {
  let { id } = socket

  console.log(`Client connected: ${id}`)

  socket.on('start', () =>
    socket.emit('step', {
      operation: '+',
      value: Math.floor(Math.random() * 100) + 50,
      from: 'opponent'
    })
  )

  socket.emit('step', {
    operation: '+',
    value: Math.floor(Math.random() * 100) + 50,
    from: 'opponent'
  })

  socket.on('step', action => {
    socket.emit('step', {
      ...action,
      from: 'me'
    })
    socket.emit('step', {
      operation: pickRandom(['+', '-']),
      value: pickRandom([1, 0]),
      from: 'opponent'
    })
  })

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${id}`)
  })
})

const { PORT = 8080 } = process.env

server.listen(PORT, () => console.log('server started'))
