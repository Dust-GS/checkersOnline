import React from "react";
import { connect } from "react-redux";
import { getUserNameById } from "../../ducks/users/selectors";
import { useNavigate } from "react-router-dom";
import "./RoomOption.scss";

const RoomOption = ({
  roomName,
  owner,
  roomId,
  numberOfPlayers,
  changeYouAreInGameAction,
}) => {
  const navigate = useNavigate();

  const handleClickRoomOption = () => {
    if (numberOfPlayers < 2) {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundedUser = JSON.parse(loggedInUser);
        foundedUser.youAreInGame = roomId;
        localStorage.setItem("user", JSON.stringify(foundedUser));
        changeYouAreInGameAction(roomId);
        navigate(`/oneRoom/${roomId}`);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div>
      {owner && (
        <div
          className={`room-option-box ${
            numberOfPlayers === 2 ? "not-full" : "full"
          }`}
          onClick={handleClickRoomOption}
        >
          <p>
            <span>Owner:</span> {owner.nickname}
          </p>
          <p>
            <span>Room name:</span> {roomName}
          </p>
          <p>
            <span>Players:</span> {numberOfPlayers}/2
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
