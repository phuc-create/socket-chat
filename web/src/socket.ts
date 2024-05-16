import { useEffect, useRef } from "react"


const useSocket = () => {
  const socketRef = useRef<WebSocket>()

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new WebSocket("ws://localhost:4000")
    }
  }, [])

  return { socket: socketRef.current }
}

export default useSocket