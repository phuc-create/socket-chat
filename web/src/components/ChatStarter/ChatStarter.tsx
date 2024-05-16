import React from 'react'
import Username from '../Username'
import { animals } from '../../assets/icons'
import { useMessage } from '../../AppContext'
interface IChatStarterProps {
  handleOpenChat: () => void
  handleChangeIcon: (icon: string) => void
}
const ChatStarter: React.FC<IChatStarterProps> = ({ handleOpenChat, handleChangeIcon }) => {
  const { userInfor } = useMessage()
  const { username, icon } = userInfor

  return (
    <>
      <Username value={username} handleOpenChat={handleOpenChat}></Username>
      <div className='flex' style={{ display: "flex", marginTop: "2rem" }}>
        {Object.entries(animals).map(animal => {
          return <div
            key={animal[0]}
            onClick={() => handleChangeIcon(animal[0])}
            style={{ cursor: "pointer" }}
          >
            {animal[0] === "bot" ? null : (
              <img src={animal[1]} alt={animal[0]} style={{ width: 50, height: 50, borderRadius: "50%", }} />
            )}
          </div>
        })}
      </div>
      {
        icon.length && icon !== "" ? (
          <img src={animals[icon]} alt="hello" style={{ margin: "3rem", width: 128, height: 128, borderRadius: "50%", }} />
        ) : null
      }
    </>
  )
}

export default ChatStarter