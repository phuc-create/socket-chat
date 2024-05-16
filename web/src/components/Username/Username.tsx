import React from 'react'
import { useMessage } from '../../AppContext'
import "./styles.scss"
interface IUsername {
  value: string
  handleOpenChat: () => void
}
const Username: React.FC<IUsername> = ({ value, handleOpenChat }) => {
  const { updateUser, userInfor } = useMessage()

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUser({ ...userInfor, username: e.target.value })
  }

  return (
    <div className='user-start'>
      <span>User name</span>
      <input onChange={handleChangeUsername} value={value} type='text' name='username'></input>
      <button onClick={handleOpenChat}>Go to chat</button>
    </div>
  )
}

export default Username