import types from "./types";

const initialState = {
  rooms: [],
  isRoomNameTaken: false,
  gotRoomsFromDataBase: false,
  roomYouAreInData: {
    _id: "",
    roomName: "",
    ownerId: "",
    board: [],
    whoIsNow: "",
    playersId: [],
    winnerId: "",
  },
};

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ROOMS_SOMEONE_WON:
      return {
        ...state,
        roomYouAreInData: {
          ...state.roomYouAreInData,
          winnerId: action.payload,
        },
      };
    case types.ROOMS_ENEMY_MOVED:
      return {
        ...state,
        roomYouAreInData: {
          ...state.roomYouAreInData,
          board: action.payload.updatedBoard,
          whoIsNow: action.payload.whoIsNow,
        },
      };
    case types.ROOMS_ADD_PLAYER_TO_ROOM_YOU_ARE_IN:
      return {
        ...state,
        roomYouAreInData: {
          ...state.roomYouAreInData,
          playersId: [state.roomYouAreInData.ownerId, action.payload],
        },
      };
    case types.ROOMS_GET_ONE_ROOM_FROM_DATA_BASE_SUCCESS:
      return {
        ...state,
        roomYouAreInData: {
          _id: action.payload.room._id,
          roomName: action.payload.room.roomName,
          ownerId: action.payload.room.ownerId,
          board: action.payload.room.board,
          whoIsNow: action.payload.room.whoIsNow,
          playersId: action.payload.room.playersId,
          winnerId: action.payload.room.winnerId,
        },
      };
    case types.ROOMS_GET_ONE_ROOM_FROM_DATA_BASE_FAILURE:
      alert(action.payload.message);
      return state;
    case types.ROOMS_GET_ROOMS_FROM_DATA_BASE_SUCCESS:
      return {
        ...state,
        rooms: [...action.payload.allRooms],
        gotRoomsFromDataBase: true,
      };
    case types.ROOMS_GET_ROOMS_FROM_DATA_BASE_FAILURE:
      alert(action.payload.message);
      return state;
    case types.ROOMS_CREATE_ROOM_SUCCESS:
      return {
        ...state,
        roomYouAreInData: {
          _id: action.payload.newRoom._id,
          roomName: action.payload.newRoom.roomName,
          ownerId: action.payload.newRoom.ownerId,
          board: action.payload.newRoom.board,
          whoIsNow: action.payload.newRoom.whoIsNow,
          playersId: action.payload.newRoom.playersId,
          winnerId: action.payload.newRoom.winnerId,
        },
        isRoomNameTaken: false,
      };
    case types.ROOMS_CREATE_ROOM_FAILURE:
      //obsluzyc gdy baza zwroci blad ze typ juz ma pokoj
      let newIsRoomNameTaken = false;

      switch (action.payload.message) {
        case "roomName is taken":
          newIsRoomNameTaken = true;
          break;
        case "you already have a room":
          break;
        case "you are in game":
          break;
        default:
          alert(action.payload.message);
          break;
      }

      return { ...state, isRoomNameTaken: newIsRoomNameTaken };
    default:
      return state;
  }
};
