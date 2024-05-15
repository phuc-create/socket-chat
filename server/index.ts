let messages: { username: string, message: string }[] = []
const server = Bun.serve<{ username: string }>({
  port: 4000,
  fetch(req, server) {
    const url = new URL(req.url)
    // if (url.pathname === "/chat") {
    console.log(`upgrade!`)
    const username = "user_" + Math.random().toString().slice(12)
    const success = server.upgrade(req, { data: { username } })
    return success
      ? undefined
      : new Response("WebSocket upgrade error", { status: 400 })
    // }

    // return new Response("Hello world")
  },
  websocket: {
    open: (ws) => {
      const msg = `${ws.data.username} has entered the chat`
      ws.subscribe("the-group-chat")
      messages.push({ username: ws.data.username.toString(), message: msg })
      ws.publish("the-group-chat", JSON.stringify(messages))
      // ws.(JSON.stringify([...messages, data]))
    },
    message: (ws, message) => {
      console.log("this is incomming message: ", message)
      // this is a group chat
      // so the server re-broadcasts incoming message to everyone
      const data = { username: ws.data.username.toString(), message: message.toString() }
      messages.push(data)
      // ws.publish("the-group-chat", JSON.stringify(messages))
      ws.send(JSON.stringify([...messages, data]))
    },
    close: (ws) => {
      const msg = `${ws.data.username} has left the chat`
      ws.unsubscribe("the-group-chat")
      ws.publish("the-group-chat", msg)
    },
  },
})

console.log(`Listening on ${server.hostname}:${server.port}`)

function getUsernameFromReq(req: Request) {
  console.log(req)
  throw req.body
}
