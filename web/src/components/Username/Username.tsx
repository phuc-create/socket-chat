import React from 'react'
import { useMessage } from '../../AppContext'
import "./styles.scss"
interface IUsername {
  value: string
  handleOpenChat: () => void
}
const Username: React.FC<IUsername> = ({ value, handleOpenChat }) => {

  /**
   * input: array of numbers
   * output: how many odd number in array
   */

  const howManyOdd = (arr: number[]) => arr.reduce((s, n) => s += n & 1, 0)

  console.log(howManyOdd([])) // 0
  console.log(howManyOdd([2, 4, 6, 8])) // 0
  console.log(howManyOdd([1, 3, 5, 7])) // 4
  console.log(howManyOdd([1, 2, 3, 4, 5])) // 3
  console.log(howManyOdd([2, 7])) // 1
  console.log(howManyOdd([1, 1, 1, 2])) // 3
  console.log(howManyOdd([-1001, 2002, 3003, -4004])) // 2
  console.log(howManyOdd([1.5, 2, 3.14, 4])) // 2
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