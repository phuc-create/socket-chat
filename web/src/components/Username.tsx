import React from 'react'
interface IUsername {
  value: string
  handleChangeUsername: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleOpenChat: () => void
}
const Username: React.FC<IUsername> = ({ value, handleChangeUsername, handleOpenChat }) => {
  return (
    <div className='w-full'>
      <span>User name</span>
      <input onChange={handleChangeUsername} value={value} className='w-full rounded-lg border py-3 px-4 text-sm font-medium bg-slate-900 cursor-pointer transition duration-75' type='text' name='username'></input>
      <button onClick={handleOpenChat}>Go to chat</button>
    </div>
  )
}

export default Username