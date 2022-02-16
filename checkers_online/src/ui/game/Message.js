import React from 'react'
import './Message.scss'

const Message = ({
    message,
    owner
}) => {
  return (
    <div className='message-box'> 
        <p><span>{owner}:</span> {message}</p>
    </div>
  )
}

export default Message