const WebSocket = require('ws');
const JWT = require('./util/JWT');
const { WebSocketServer } = WebSocket;

const MsgType = {
  Error: 0,
  Single: 1,
  Group: 2
}

function createMsg(type, user, text) {
  return JSON.stringify({type, user, text})
}

// websocket
const websocket = new WebSocketServer({ port: 8080 })

websocket.on('connection', function (ws, req) {
  const myUrl = new URL(req.url, 'http://127.0.0.1:3000')
  const token = myUrl.SearchParams?.get('token')
  const payload = JWT.verify(token)
  if (!payload) {
    ws.send(createMsg(MsgType.Error, null, '未授权'))
  } else {
    ws.user = payload
    ws.send(createMsg(MsgType.Group, null, '开始聊天吧'))
  }

  ws.on('open', function (data) {
    console.log('open %s')
  })

  ws.on('message', function (data) {
    console.log('received: %s', data)
    websocket.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: false})
      }
    })
  })
})