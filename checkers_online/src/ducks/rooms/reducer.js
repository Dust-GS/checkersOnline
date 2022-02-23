import types from "./types";

const initialState = {
  rooms: [],
  isRoomNameTaken: false,
  gotRoomsFromDataBase: false,
  //mozliwe ze to jest niepotrzebne to nizej
  roomYouAreInData: {
    _id: "",
    roomName: "",
    ownerId: "",
    board: [],
    whoIsNow: "",
    playersId: [],
  },
};

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
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
        default:
          alert(action.payload.message);
          break;
      }

      return { ...state, isRoomNameTaken: newIsRoomNameTaken };
    default:
      return state;
  }
};
