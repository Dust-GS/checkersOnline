import React, { useState } from 'react'
import './Chat.scss'
import Message from './Message'

const Chat = ({
  socket,
  roomId,
  messages,
  yourNickname
}) => {
  //stestowac co jak bedzie duzo wiadomosci
  const [messageContent, setMessageContent] = useState("")
  const handleChangeMessageContent = (event) => {
    setMessageContent(event.target.value)
  }

  const handleSendMessage = () => {
    const message = {
      senderNickname: yourNickname,
      messageContent: messageContent
    }
    //wiadomosc wysylac do servera i on wysyla do osob z tego pokoju
    socket.emit("send-message", message, roomId)
  }

  return (
    <div className='chat-box'>
        {/* zapisyujemy chat w bazie */}
        <div className='chat'>
          {messages.map((el, index) => 
              <Message key={index} senderNickname={el.senderNickname} messageContent={el.messageContent}/>
          )}
        </div>
        <div className='send-message-box'>
            <input
              className='input'
              type='text'
              placeholder='message...'
              value={messageContent}
              onChange={handleChangeMessageContent}

            />
            <input
              className='submit'
              type='submit'
              value='send'
              onClick={handleSendMessage}
            />
        </div>
    </div>
  )
}

export default Chat