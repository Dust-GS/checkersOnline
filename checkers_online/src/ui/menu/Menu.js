import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addYourDataAction } from "../../ducks/users/actions";
import { getYourData } from "../../ducks/users/selectors";
import { useNavigate } from "react-router-dom";
import "./Menu.scss";

const Menu = ({ yourData, addYourDataAction }) => {
  const navigate = useNavigate();

  const handleEnterMyRoomButton = () => {
    navigate(`/oneRoom/${yourData.roomIdYouCreated}`);
  };

  const handleLogoutButton = () => {
    addYourDataAction({
      _id: "",
      nickname: "",
      numberOfRooms: null,
      accessToken: "",
      roomIdYouCreated: "",
      youAreInGame: "",
    });
    localStorage.clear();
    navigate("/");
  };

  const handleCreateRoomButton = () => {
    navigate("/createRoom");
  };

  const handleFindRoomButton = () => {
    navigate("/findRoom");
  };

  //w tym komponencie w storze potrzebuje tylko yourData
  //pobieram z store jak nie ma to z localstorage jak nie ma to przenosi mnie do homePage
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

  useEffect(() => {
    const enterMyRoomButton = document.getElementById("EnterMyRoomButton");

    if (yourData.roomIdYouCreated === "") {
      enterMyRoomButton.disabled = true;
    } else {
      enterMyRoomButton.disabled = false;
    }
  }, [yourData.roomIdYouCreated]);

  return (
    <div className="menu-box">
      <div className="nickname-box">
        <p>{yourData.nickname}</p>
      </div>
      <div className="menu">
        <button type="button" onClick={handleLogoutButton}>
          Log out
        </button>
        <button type="button" onClick={handleFindRoomButton}>
          Find room
        </button>
        <button type="button" onClick={handleCreateRoomButton}>
          Create room
        </button>
        <button
          type="button"
          id="EnterMyRoomButton"
          onClick={handleEnterMyRoomButton}
        >
          Enter my room
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    yourData: getYourData(state),
  };
};

const mapDispatchToProps = {
  addYourDataAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
