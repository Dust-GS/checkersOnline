import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRoomsOperation } from "../../ducks/rooms/operations";
import {
  getAllRooms,
  getGotRoomsFromDataBase,
} from "../../ducks/rooms/selectors";
import { addYourDataAction } from "../../ducks/users/actions";
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
}) => {
  console.log(allRooms);
  //wyswietlaja si wszystkie pokoje poza jego pokojem

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
    }
  }, [addYourDataAction, yourData, navigate]);

  return (
    <div className="all-rooms-box">
      <div className="search-room-box"></div>
      <div className="all-rooms">
        {allRooms
          .filter((room) => room.ownerId !== yourData._id)
          .map((room) => (
            <RoomOption
              key={room._id}
              roomName={room.roomName}
              ownerId={room.ownerId}
              roomId={room._id}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(FindRoom);
