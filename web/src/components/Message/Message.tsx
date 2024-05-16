import React from 'react'
import "./styles.scss"

interface IMessageProps {
  side: "left" | "right",
  message: TMessage
}

type TMessage = {
  username: string,
  message: string
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

        <span className='user-pic'>{message.username.slice(0, 1)}</span>
      </div>
    )
  }
  return (
    <div className='msg-group left'>
      <div className='user-pic'>{message.username.slice(0, 1)}</div>
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