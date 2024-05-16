import { useEffect, useRef } from "react"


const useSocket = () => {
  const socketRef = useRef<WebSocket>()
  const url = process.env.NODE_ENV === "production" ? "https://socket-chat-rbhj.onrender.com" : "ws://localhost:4000"

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new WebSocket(url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { socket: socketRef.current }
}

export default useSocket