import React from 'react'
import "./styles.scss"
import { animals } from '../../assets/icons'

interface IMessageProps {
  icon: string
  side: "left" | "right",
  message: TMessage
}

type TMessage = {
  username: string,
  message: string
  icon: string
}

const Message: React.FC<IMessageProps> = ({ side, message }) => {
  if (side === "right") {
    return (
      <div className='msg-group right'>
        <div></div>
        <div className='content-group'>
          <span className='user-infor'>{message.username}</span>
          <div className='wrapper'>
            <div className='user-msg'>{message.message}</div>

          </div>
        </div>

        <span className='user-pic'>
          <img src={animals[message.icon]} />
        </span>
      </div>
    )
  }
  return (
    <div className='msg-group left'>
      <div className='user-pic'><img src={animals[message.icon]} /></div>
      <div className='content-group'>
        <span className='user-infor'>{message.username}</span>
        <div className='wrapper'>
          <div className='user-msg'>{message.message}</div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Message