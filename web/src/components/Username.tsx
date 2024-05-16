import React from 'react'
import { useMessage } from '../AppContext'
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
    <div className='w-full'>
      <span>User name</span>
      <input onChange={handleChangeUsername} value={value} className='w-full rounded-lg border py-3 px-4 text-sm font-medium bg-slate-900 cursor-pointer transition duration-75' type='text' name='username'></input>
      <button onClick={handleOpenChat}>Go to chat</button>
    </div>
  )
}

export default Username