import { createContext, useContext, useState } from "react"


interface IUserInfor {
  username: string,
  icon: string
}
interface IMessageContextProps {
  children: React.ReactNode
}

interface IMessageContext {
  userInfor: IUserInfor
  chatOpen: boolean
  setChatBoardOpen: () => void
  updateUser: (user: IUserInfor) => void
}
const MessageContext = createContext<IMessageContext | null>(null)

export const MessageContextProvider: React.FC<IMessageContextProps> = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(false)
  const [userInfor, setUserInfor] = useState<IUserInfor>({
    username: "",
    icon: ""
  })

  const setChatBoardOpen = () => setChatOpen(() => true)

  const updateUser = (user: IUserInfor) => {
    setUserInfor(pre => ({ ...pre, ...user }))
  }
  return (
    <MessageContext.Provider value={{ userInfor, chatOpen, setChatBoardOpen, updateUser }}>
      {children}
    </MessageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMessage = () => {
  const store = useContext(MessageContext)
  if (!store) {
    throw Error('Must be within the MessageContext')
  }
  return store
}