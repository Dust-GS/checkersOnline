import React, { useEffect, useState } from "react";
import "./OneRoom.scss";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { addYourDataAction } from "../../ducks/users/actions";
import { getYourData } from "../../ducks/users/selectors";
import { getRoomYouAreInData } from "../../ducks/rooms/selectors";
import Chat from "./Chat";
import { getOneRoomOperation } from "../../ducks/rooms/operations";
import Board from "./Board";
import {
  addPlayerToRoomAction,
  enemyMovedAction,
  someoneWonAction,
} from "../../ducks/rooms/actions";

const OneRoom = ({
  yourData,
  addYourDataAction,
  roomYouAreInData,
  getOneRoomOperation,
  addPlayerToRoomAction,
  enemyMovedAction,
  someoneWonAction,
}) => {
  //dodac guzik wracania do menu
  //co jak wchodzi durga osoba
  //przez socket jest dodawana druga osoba lokalnie(za pomocą akcji) i w bazie danych
  const { roomId } = useParams();
  const [yourColor, setYourColor] = useState("");
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const getWhoIsNow = (roomYouAreInData, yourColor, yourData) => {
    if (
      roomYouAreInData._id !== "" &&
      yourColor !== undefined &&
      yourData._id !== ""
    ) {
      if (roomYouAreInData.winnerId !== "") {
        if (roomYouAreInData.winnerId === yourData._id) return "You won :)";
        else if (roomYouAreInData.winnerId !== yourData._id)
          return "You lost :(";
      }

      if (roomYouAreInData.whoIsNow === yourColor) return "Your turn";
      else return "Opponent's turn";
    } else return "";
  };

  useEffect(() => {
    if (yourData.nickname === "") {
      //pobieranie z local storage your
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundedUser = JSON.parse(loggedInUser);
        addYourDataAction(foundedUser);
      } else {
        navigate("/");
      }
    } else if (roomYouAreInData._id !== "") {
      if (yourColor === "") {
        //ustawianie koloru
        setYourColor(
          yourData._id === roomYouAreInData.ownerId ? "red" : "black"
        );
      } else {
        //dodawanie siebie nowego gracza lokalnie do pokoju
        if (
          roomYouAreInData.ownerId !== yourData._id &&
          roomYouAreInData.playersId.includes(yourData._id) === false
        ) {
          addPlayerToRoomAction(yourData._id);
        }
      }
    }
  }, [
    addYourDataAction,
    navigate,
    roomYouAreInData._id,
    roomYouAreInData.ownerId,
    yourColor,
    yourData._id,
    yourData.nickname,
    addPlayerToRoomAction,
    roomYouAreInData,
  ]);

  useEffect(() => {
    if (roomYouAreInData._id === "") {
      getOneRoomOperation(roomId);
    }
  }, [
    getOneRoomOperation,
    roomId,
    roomYouAreInData._id,
    roomYouAreInData.board,
  ]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.on("connect", () => {
      //lączenie sie z pokojem
      //wysylanie prosby o doloczenie pokokju by tylko server moze przydzieli cie do pokoju
      newSocket.emit("join-room", roomId, yourData._id);
    });

    newSocket.on("receive-message", (message) =>
      receiveMessageListener(message)
    );

    newSocket.on("new-player", (playerId) => newPlayerIdListener(playerId));

    newSocket.on("receive-piece-move", (updatedBoard) =>
      receivePieceMoveListener(updatedBoard)
    );

    newSocket.on("receive-new-winner", (winnerId) =>
      newWinnerIdListener(winnerId)
    );

    const newPlayerIdListener = (playerId) => {
      if (roomYouAreInData.playersId.includes(playerId) === false) {
        addPlayerToRoomAction(playerId);
      }
    };

    const receiveMessageListener = (message) => {
      setMessages((elements) => [...elements, message]);
    };

    const receivePieceMoveListener = (updatedBoard) => {
      enemyMovedAction(updatedBoard, yourColor);
    };

    const newWinnerIdListener = (winnerId) => {
      someoneWonAction(winnerId);
    };
    //bez tego close() się łączy
    //retrun chyba wywoluje sie przy opuszczaniu tego komponentu albo przy odswierzaniu strony zeby nie tworzylo sie wiele soketow
    return () => {
      newSocket.disconnect();
    };
  }, [
    roomId,
    yourData._id,
    addPlayerToRoomAction,
    roomYouAreInData.playersId,
    yourColor,
    enemyMovedAction,
    someoneWonAction,
  ]);

  return (
    <div className="one-room-box">
      <div className="who-is-now-box">
        <p>{getWhoIsNow(roomYouAreInData, yourColor, yourData)}</p>
      </div>
      <div className="board-chat-box">
        <Board
          yourId={yourData._id}
          roomId={roomId}
          socket={socket}
          board={roomYouAreInData.board}
          yourColor={yourColor}
          whoIsNow={roomYouAreInData.whoIsNow}
        />
        <Chat
          socket={socket}
          roomId={roomId}
          messages={messages}
          setMessages={setMessages}
          yourNickname={yourData.nickname}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    yourData: getYourData(state),
    roomYouAreInData: getRoomYouAreInData(state),
  };
};

const mapDispatchToProps = {
  addYourDataAction,
  getOneRoomOperation,
  addPlayerToRoomAction,
  enemyMovedAction,
  someoneWonAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OneRoom);
