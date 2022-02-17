import React from 'react'
import './Message.scss'

const Message = ({
    messageContent,
    senderNickname
}) => {
  return (
    <div className='message-box'> 
        <p><span>{senderNickname}:</span> {messageContent}</p>
    </div>
  )
}

export default Message