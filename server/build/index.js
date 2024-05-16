// index.ts
var messages = [];
var server = Bun.serve({
  port: 4000,
  fetch(req, server2) {
    console.log(`upgrade!`);
    const success = server2.upgrade(req);
    return success ? undefined : new Response("WebSocket upgrade error", { status: 400 });
  },
  websocket: {
    open: (ws) => {
      ws.subscribe("group-chat");
      const msg = messages.length ? "Welcome to the chat" : "The new chat was opened!";
      messages.push({ username: "Bot", message: msg, icon: "bot" });
      server.publish("group-chat", JSON.stringify(messages));
    },
    message: (ws, message) => {
      const msg = JSON.parse(message.toString());
      console.log("this is incomming message: ", msg);
      messages.push(msg);
      server.publish("group-chat", JSON.stringify(messages));
    },
    close: (ws, code, reason) => {
      ws.unsubscribe("group-chat");
      const data = { username: "Bot", message: "A user has left the chat" + reason, icon: "bot" };
      messages.push(data);
      server.publish("group-chat", JSON.stringify(messages));
    }
  }
});
console.log(`Listening on ${server.hostname}:${server.port}`);
