import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllRoomsOperation } from "../../ducks/rooms/operations";
import {
  getAllRooms,
  getGotRoomsFromDataBase,
} from "../../ducks/rooms/selectors";
import { getAllUsersOperation } from "../../ducks/users/operations";
import { getAreAllUsersInStore } from "../../ducks/users/selectors";
import "./FindRoom.scss";
import RoomOption from "./RoomOption";

const FindRoom = ({
  gotRoomsFromDataBase,
  getAllRoomsOperation, //w all rooms nie ma mojego pokokju
  allRooms,
  areAllUsersInStore,
  getAllUsersOperation,
}) => {
  //wyswietlaja si wszystkie pokoje poza jego pokojem

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

  return (
    <div className="all-rooms-box">
      <div className="search-room-box"></div>
      <div className="all-rooms">
        {allRooms.map((room) => (
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
  };
};

const mapDispatchToProps = {
  getAllRoomsOperation,
  getAllUsersOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(FindRoom);
