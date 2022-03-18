import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRoomsOperation } from "../../ducks/rooms/operations";
import {
  getAllRooms,
  getGotRoomsFromDataBase,
} from "../../ducks/rooms/selectors";
import {
  addYourDataAction,
  changeYouAreInGameAction,
} from "../../ducks/users/actions";
import { getAllUsersOperation } from "../../ducks/users/operations";
import {
  getAreAllUsersInStore,
  getYourData,
} from "../../ducks/users/selectors";
import "./FindRoom.scss";
import RoomOption from "./RoomOption";

const FindRoom = ({
  gotRoomsFromDataBase,
  getAllRoomsOperation,
  allRooms,
  areAllUsersInStore,
  getAllUsersOperation,
  yourData,
  addYourDataAction,
  changeYouAreInGameAction,
}) => {
  //wyswietlaja si wszystkie pokoje poza jego pokojem
  //wyswietla liczbe graczy i nie mozna wejsc do pokju gdy jest juz dwoch graczy

  const navigate = useNavigate();

  useEffect(() => {
    if (gotRoomsFromDataBase === false) {
      getAllRoomsOperation();
    }

    if (areAllUsersInStore === false) {
      getAllUsersOperation();
    }
  }, [
    gotRoomsFromDataBase,
    getAllRoomsOperation,
    areAllUsersInStore,
    getAllUsersOperation,
  ]);

  useEffect(() => {
    if (yourData.nickname === "") {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundedUser = JSON.parse(loggedInUser);
        addYourDataAction(foundedUser);
      } else {
        navigate("/");
      }
    } else if (yourData.youAreInGame !== "") {
      navigate(`/oneRoom/${yourData.youAreInGame}`);
    }
  }, [addYourDataAction, yourData, navigate]);

  return (
    <div className="all-rooms-box">
      <div className="all-rooms">
        <div className="search-room-box">
          <p>Rooms:</p>
        </div>

        {allRooms
          .filter((room) => room.ownerId !== yourData._id)
          .map((room) => (
            <RoomOption
              key={room._id}
              roomName={room.roomName}
              ownerId={room.ownerId}
              roomId={room._id}
              numberOfPlayers={room.playersId.length}
              changeYouAreInGameAction={changeYouAreInGameAction}
            />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gotRoomsFromDataBase: getGotRoomsFromDataBase(state),
    allRooms: getAllRooms(state),
    areAllUsersInStore: getAreAllUsersInStore(state),
    yourData: getYourData(state),
  };
};

const mapDispatchToProps = {
  getAllRoomsOperation,
  getAllUsersOperation,
  addYourDataAction,
  changeYouAreInGameAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FindRoom);
