import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import { socket } from './socket'
import { ConnectionState } from './components/ConnectionState'
type Message = {
  username: string,
  message: string
}

type User = {
  username: string,
}
const socket = new WebSocket("ws://localhost:4000")
function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [value, setValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])

  const handleSubmit = () => {

    socket.send(
      value
    )
    setValue("")

  }
  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg])
  }
  console.log(messages, users)

  useEffect(() => {
    socket.addEventListener("open", (e) => {
      console.log("init chat app", e)
      socket.send("Connection established")

    })
    socket.addEventListener("message", (e) => console.log(e))
    socket.addEventListener("message", (e) => {
      const messages = JSON.parse(e.data)
      console.log(messages)
      setMessages(messages)
      // switch (evt.type) {
      //   case "USERS":
      //     setUsers(evt.data)
      //     break
      //   case "MESSAGES":
      //     setMessages(evt.data)
      //     break
      //   case "ADD_MSG":
      //     addMessage(evt.data)
      //     break
      //   case "LEAVE":
      //     setUsers(evt.data)
      //     break
      //   default:
      //     break
      // }
    })
    return () => {
      if (socket.readyState === 1) { // <-- This is important
        socket.close()
      }
    }
  }, [socket])


  return (
    <>

      <h1>Vite + Socket</h1>
      <ConnectionState isConnected={isConnected} />
      <div className="card">
        <div className='messages'>
          {messages.map(msg => {
            return (
              <div className='msg-group'>
                <span className='user-pic'>{msg.username.slice(0, 1)}</span>
                <span className='user-msg'>{msg.message}</span>
              </div>
            )
          })}

        </div>
        <div className='message-input'>
          <input className='input' type='text' name='message' placeholder='message...' value={value} onChange={e => setValue(e.target.value)} />
          <button onClick={handleSubmit}>
            Send
          </button>
        </div>
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
