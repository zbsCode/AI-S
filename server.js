const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('message', (data) => {
    console.log('Received message: ${data}')
    io.emit('message', data)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
