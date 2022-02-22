import React from "react";
import { connect } from "react-redux";
import { getUserNameById } from "../../ducks/users/selectors";
import { useNavigate } from "react-router-dom";
import "./RoomOption.scss";

const RoomOption = ({ roomName, owner, roomId }) => {
  const navigate = useNavigate();

  const handleClickRoomOption = () => {
    navigate(`/oneRoom/${roomId}`);
  };

  return (
    <div>
      {owner && (
        <div className="room-option-box" onClick={handleClickRoomOption}>
          <p>
            <span>Owner:</span> {owner.nickname}
          </p>
          <p>
            <span>Room name:</span> {roomName}
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, params) => {
  return {
    owner: getUserNameById(state, params.ownerId),
  };
};

export default connect(mapStateToProps, null)(RoomOption);
