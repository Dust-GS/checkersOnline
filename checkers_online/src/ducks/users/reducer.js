import types from "./types";

const initialState = {
  users: [],
  yourData: {
    _id: "",
    nickname: "",
    numberOfRooms: null,
    accessToken: "",
    roomIdYouCreated: "",
    youAreInGame: false,
  },
  areAllUsersInStore: false,
  isNicknameTaken: false,
  isNicknameWrong: false,
  isPaswordWrong: false,
  doYouHaveTooManyRooms: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USERS_CHANGE_YOUR_ARE_IN_GAME:
      return {
        ...state,
        yourData: {
          ...state.yourData,
          youAreInGame: action.payload,
        },
      };
    case types.USERS_CHANGE_ROOM_ID_YOUR_CREATED:
      return {
        ...state,
        yourData: {
          ...state.yourData,
          roomIdYouCreated: action.payload,
        },
      };
    case types.USERS_CHANGE_YOUR_ROOMS_NUMBER:
      return {
        ...state,
        yourData: {
          ...state.yourData,
          numberOfRooms: action.payload,
        },
      };
    case types.USERS_CHANGE_TOO_MANY_ROOMS_VALUE:
      return { ...state, doYouHaveTooManyRooms: action.payload };
    case types.USERS_CHANGE_NICKNAME_TAKEN_VALUE:
      return { ...state, isNicknameTaken: action.payload };
    case types.USERS_SET_YOUR_DATA:
      return {
        ...state,
        yourData: {
          _id: action.payload._id,
          nickname: action.payload.nickname,
          numberOfRooms: action.payload.numberOfRooms,
          accessToken: action.payload.accessToken,
          roomIdYouCreated: action.payload.roomIdYouCreated,
          youAreInGame: action.payload.youAreInGame,
        },
      };
    case types.USERS_POST_USER_SUCCESS:
      //moze dodac filter ktory sie upewnia ze nie ma  duplikatow w users
      //musimy pobrac z bazy osobe zeby miala id
      //to ze w allusers ten user ma wiecej danych to nic nie szkodzi
      return {
        ...state,
        users: [
          ...state.users.filter(
            (el) => el.nickname !== action.payload.newUser.nickname
          ),
          action.payload.newUser,
        ],
        yourData: {
          _id: action.payload.newUser._id,
          nickname: action.payload.newUser.nickname,
          numberOfRooms: action.payload.newUser.numberOfRooms,
          accessToken: action.payload.newUser.accessToken,
          roomIdYouCreated: action.payload.newUser.roomIdYouCreated,
          youAreInGame: action.payload.newUser.youAreInGame,
        },
        isNicknameTaken: false,
      };
    case types.USERS_POST_USER_FAILURE:
      let newIsNicknameTaken;
      if (action.payload.message === "nickname is taken") {
        newIsNicknameTaken = true;
      } else if (action.payload.message === "user created") {
        newIsNicknameTaken = false;
      } else {
        alert(action.payload.message);
      }

      return { ...state, isNicknameTaken: newIsNicknameTaken };
    case types.USERS_LOGIN_SUCCESS:
      //musimy pobrac z bazy osobe zeby miala id
      return {
        ...state,
        users: [
          ...state.users.filter(
            (el) => el.nickname !== action.payload.userData.nickname
          ),
          action.payload.userData,
        ],
        yourData: {
          _id: action.payload.userData._id,
          nickname: action.payload.userData.nickname,
          numberOfRooms: action.payload.userData.numberOfRooms,
          accessToken: action.payload.userData.accessToken,
          roomIdYouCreated: action.payload.userData.roomIdYouCreated,
          youAreInGame: action.payload.userData.youAreInGame,
        },
        isNicknameWrong: false,
        isPaswordWrong: false,
      };
    case types.USERS_LOGIN_FAILURE:
      let newIsNicknameWrong = false;
      let newIsPaswordWrong = false;

      switch (action.payload.message) {
        case "Cant find the user":
          newIsNicknameWrong = true;
          break;
        case "password incorrect":
          newIsPaswordWrong = true;
          break;
        default:
          alert(action.payload.message);
          break;
      }

      return {
        ...state,
        isNicknameWrong: newIsNicknameWrong,
        isPaswordWrong: newIsPaswordWrong,
      };
    case types.USERS_GET_ALL_USERS_SUCCESS:
      //tutaj przychodzą osoby z id bez hasla
      return {
        ...state,
        users: action.payload.allUsers,
        areAllUsersInStore: true,
      };
    case types.USERS_GET_ALL_USERS_FAILURE:
      alert(action.payload.message);
      return state;
    default:
      return state;
  }
};
