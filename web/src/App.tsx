import { useEffect, useRef, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import useSocket from './socket'
import Username from './components/Username'
import { Message } from './components'
type Message = {
  username: string,
  message: string
}

type User = {
  username: string,
}
function App() {
  const [value, setValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [chatOpen, setChatOpen] = useState(false)
  const [username, setUsername] = useState("")
  const messageViewRef = useRef<HTMLDivElement>(null)

  const { socket } = useSocket()
  const handleSubmit = () => {
    socket?.send(JSON.stringify({ username: username, message: value }))
    setValue("")
  }



  useEffect(() => {
    // socket?.addEventListener("open", (e) => {


    // })
    socket?.addEventListener("message", (e) => {
      const messages = JSON.parse(e.data)
      // console.log(messages)
      setMessages(messages)
    })

    return () => {
      if (socket?.readyState === 1) { // <-- This is important
        socket?.close(123, `${username} has left the chat`)
      }
    }
  }, [socket, username])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleOpenChat = () => {
    if (username === "" || username.length < 4) return
    socket?.send(JSON.stringify({ username: username, message: `${username} has entered the chat!!` }))
    setChatOpen(() => true)
  }

  const scrollToBottom = () => {
    messageViewRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <h1 className='text-red-500'>Vite + Socket</h1>
      {!chatOpen ? (
        <Username value={username} handleChangeUsername={handleChangeUsername} handleOpenChat={handleOpenChat}></Username>
      ) : (
        <div className="card">
          <div className='messages'>
            {messages.map((msg) => {
              return (
                <Message key={crypto.randomUUID()} side={msg.username === username ? 'right' : "left"} message={msg} />
              )
            })}
            <div ref={messageViewRef}></div>
          </div>
          <div className='message-input'>
            <input className='input' type='text' name='message' placeholder='message...' value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
      )}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
