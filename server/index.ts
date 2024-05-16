import type { ServerWebSocket } from "bun"


type TMessage = {
  username: string, message: string
}

type TUser = {
  id: string,
  username: string,
}
let messages: TMessage[] = []
let users: TUser[] = []

const server = Bun.serve<{ username: string }>({
  port: 4000,
  fetch(req, server) {
    // if (url.pathname === "/chat") {
    console.log(`upgrade!`)
    // const username = "user_" + Math.random().toString().slice(12)
    const success = server.upgrade(req
      // , { data: { username } }
    )
    return success
      ? undefined
      : new Response("WebSocket upgrade error", { status: 400 })
  },
  websocket: {
    open: (ws) => {
      ws.subscribe("group-chat")
      // socketServer.push(ws)
      // const msg = `${ws.data.username} has entered the chat`
      const msg = messages.length ? "Welcome to the chat" : "The new chat was opened!"
      messages.push({ username: "Bot", message: msg })
      // sendToEveryone(messages)
      // ws.publish("group-chat", JSON.stringify(messages))
      server.publish("group-chat", JSON.stringify(messages))
    },
    message: (ws, message) => {
      const msg = JSON.parse(message.toString()) as TMessage
      console.log("this is incomming message: ", msg)
      // this is a group chat
      // so the server re-broadcasts incoming message to everyone
      const data = { username: msg.username, message: msg.message }
      messages.push(data)

      // sendToEveryone(messages)
      server.publish("group-chat", JSON.stringify(messages))
    },
    close: (ws, code, reason) => {
      ws.unsubscribe("group-chat")
      const data = { username: "Bot", message: reason }
      messages.push(data)
      server.publish("group-chat", JSON.stringify(messages))
      // socketServer.filter(open => open.data.username !== ws.data.username
      // )
    },
  },
})

console.log(`Listening on ${server.hostname}:${server.port}`)
