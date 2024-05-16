import { useEffect, useRef, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import useSocket from './socket'
import Username from './components/Username'
import { Message } from './components'
import { animals } from './assets/icons'
type Message = {
  username: string,
  message: string,
  icon: string
}

// type User = {
//   username: string,
// }
function App() {
  const [value, setValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  // const [users, setUsers] = useState<User[]>([])
  const [chatOpen, setChatOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [iconProfile, setIconProfile] = useState("")
  const messageViewRef = useRef<HTMLDivElement>(null)

  const { socket } = useSocket()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value.length && value === "") return
    socket?.send(JSON.stringify({ username: username, message: value, icon: iconProfile }))
    setValue("")
  }



  useEffect(() => {
    socket?.addEventListener("open", () => {
      socket.send("Chat initialization")

    })
    socket?.addEventListener("message", (e) => {
      const messages = JSON.parse(e.data)
      // console.log(messages)
      setMessages(messages)
    })

    return () => {

      socket?.close(4000, `${username} has left the chat`)

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleOpenChat = () => {
    if (!iconProfile.length) return
    if (username === "" || username.length < 4) return
    socket?.send(JSON.stringify({ username: username, message: `${username} has entered the chat!!`, icon: iconProfile }))
    setChatOpen(() => true)
  }

  const scrollToBottom = () => {
    messageViewRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <h1 className='text-red-500'>Vite + Socket</h1>
      {!chatOpen ? (
        <>
          <Username value={username} handleChangeUsername={handleChangeUsername} handleOpenChat={handleOpenChat}></Username>
          <div className='flex' style={{ display: "flex", marginTop: "2rem" }}>
            {Object.entries(animals).map(animal => {
              return <div
                key={animal[0]}
                onClick={() => setIconProfile(animal[0])}
                style={{ cursor: "pointer" }}
              >
                {animal[0] === "bot" ? null : (
                  <img src={animal[1]} alt={animal[0]} style={{ width: 50, height: 50, borderRadius: "50%", }} />
                )}
              </div>
            })}
          </div>
          {
            iconProfile.length && iconProfile !== "" ? (
              <img src={animals[iconProfile]} alt="hello" style={{ margin: "3rem", width: 128, height: 128, borderRadius: "50%", }} />
            ) : null
          }
        </>
      ) : (
        <div className="card">
          <div className='messages'>
            {messages.map((msg) => {
              return (
                <Message key={crypto.randomUUID()} icon={iconProfile} side={msg.username === username ? 'right' : "left"} message={msg} />
              )
            })}
            <div ref={messageViewRef}></div>
          </div>
          <form onSubmit={handleSubmit} className='message-input'>
            <input className='input' type='text' name='message' placeholder='message...' value={value} onChange={e => setValue(e.target.value)} />
            <button type='submit'>
              Send
            </button>
          </form>
        </div>
      )}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
