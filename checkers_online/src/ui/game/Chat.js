import React, { useState } from 'react'
import './Chat.scss'
import Message from './Message'

const Chat = ({
  socket,
  roomId
}) => {
  //stestowac co jak bedzie duzo wiadomosci
  const [inputValue, setInputValue] = useState("")
  const handleChangeInputValue = (event) => {
    setInputValue(event.target.value)
  }
  const handleSendMessage = () => {
    //wiadomosc wysylac do servera i on wysyla do osob z tego pokoju
    //socket.to(`room-${roomId}`).emit("send-message", inputValue)
  }
  const messages = [
    {
      owner: "Jan",
      message: "hello"
    },
    {
      owner: "Andrzej",
      message: "hello"
    },
    {
      owner: "Jan",
      message: "what are you doing"
    },
    {
      owner: "Andrzej",
      message: "hello"
    }

  ]
  return (
    <div className='chat-box'>
        {/* zapisyujemy chat w bazie */}
        <div className='chat'>
          {messages.map((el, index) => 
              <Message key={index} owner={el.owner} message={el.message}/>
          )}
        </div>
        <div className='send-message-box'>
            <input
              className='input'
              type='text'
              placeholder='message...'
              value={inputValue}
              onChange={handleChangeInputValue}

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