import { useEffect, useRef, useState } from 'react'
import './App.scss'
import useSocket from './socket'
import { useMessage } from './AppContext'
import { ChatStarter, Message } from './components'
import { Message as MS } from './types'

function App() {
  const [value, setValue] = useState("")
  const [messages, setMessages] = useState<MS[]>([])
  const { chatOpen, userInfor, updateUser, setChatBoardOpen } = useMessage()
  const { username, icon } = userInfor
  const messageViewRef = useRef<HTMLDivElement>(null)

  const { socket } = useSocket()


  useEffect(() => {
    socket?.addEventListener("open", () => {
      // socket.send("Chat initialization")

    })
    socket?.addEventListener("message", (e) => {
      const messages = JSON.parse(e.data)
      setMessages(messages)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, userInfor.username, chatOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value.length && value === "") return
    socket?.send(JSON.stringify({ ...userInfor, message: value }))
    setValue("")
  }

  const handleOpenChat = () => {
    if (icon === "") return
    if (username === "" || username.length < 4) return
    socket?.send(JSON.stringify({ username: username, message: `${username} has entered the chat!!`, icon }))
    updateUser({ username, icon })
    setChatBoardOpen()
  }
  const handleChangeIcon = (icon: string) => {
    updateUser({ ...userInfor, icon })
  }

  const scrollToBottom = () => {
    messageViewRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <h1 className='text-red-500'>Vite + Socket</h1>
      {!chatOpen ? (
        <ChatStarter
          handleOpenChat={handleOpenChat}
          handleChangeIcon={handleChangeIcon} />
      ) : (
        <div className="card">
          <div className='messages'>
            {messages.map((msg) => {
              return (
                <Message
                  key={crypto.randomUUID()}
                  icon={userInfor.icon}
                  side={msg.username === userInfor.username ? 'right' : "left"}
                  message={msg}
                />
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
