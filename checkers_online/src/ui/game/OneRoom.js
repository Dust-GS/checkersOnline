import React,{ useEffect, useState } from 'react'
import './OneRoom.scss'
import { connect } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { addYourDataAction } from '../../ducks/users/actions';
import { getYourData } from '../../ducks/users/selectors';
import Chat from './Chat';

const OneRoom = ({
  yourData,
  addYourDataAction
}) => {
  const { roomId } = useParams()
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]) 
  const navigate = useNavigate()

  useEffect(() => {
    if(yourData.nickname === ""){
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
          const foundedUser = JSON.parse(loggedInUser);
          addYourDataAction(foundedUser)
      } else {
          navigate("/")
      }
  }
  }, [addYourDataAction, navigate, yourData]);

  useEffect(() => {
      const newSocket = io('http://localhost:5000')
      setSocket(newSocket);
      newSocket.on("connect", () => {
        //lączenie sie z pokojem
         //wysylanie prosby o doloczenie pokokju by tylko server moze przydzieli cie do pokoju
         newSocket.emit('join-room', roomId)

         newSocket.on("receive-message", message => receiveMessageListener(message))

         const receiveMessageListener = (message) => {
           setMessages(elements => [...elements, message])
         }
      })

      //bez tego close() się łączy
      //retrun chyba wywoluje sie przy opuszczaniu tego komponentu albo przy odswierzaniu strony zeby nie tworzylo sie wiele soketow
      return () => {
        newSocket.disconnect()
      }
  },[roomId])

  return (
    <div className='one-room-box'>
      OneRoom<br/>
      {roomId}
      <Chat socket={socket} roomId={roomId} messages={messages} yourNickname={yourData.nickname}/>
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      yourData: getYourData(state)
  };
}

const mapDispatchToProps = {
  addYourDataAction
}

export default connect(mapStateToProps, mapDispatchToProps)(OneRoom);