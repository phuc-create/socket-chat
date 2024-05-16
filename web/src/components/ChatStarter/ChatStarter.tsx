import React from 'react'

import { animals } from '../../assets/icons'
import { useMessage } from '../../AppContext'
import Username from '../Username'
import "./styles.scss"
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
      <span>Choose an icon</span>
      <div className='icon-list' style={{ display: "flex", marginTop: "2rem" }}>
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