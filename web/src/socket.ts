import { useEffect, useRef } from "react"


const useSocket = () => {
  const socketRef = useRef<WebSocket>()
  const url = process.env.NODE_ENV === "prod" ? "wss://socket-chat-rbhj.onrender.com" : "ws://localhost:4000"

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new WebSocket(url)
    }

    return () => {
      if (socketRef.current?.readyState === 1) {
        socketRef.current.close()
      }
    }
  }, [])

  return { socket: socketRef.current }
}

export default useSocket