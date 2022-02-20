import types from "./types";

const initialState = {
    rooms: [],
    isRoomNameTaken: false,
    gotRoomsFromDataBase: false,
    //mozliwe ze to jest niepotrzebne to nizej
    roomYouAreInData: {
        id: "",
        roomName: "",
        ownerId:  "",
        board: [],
        whoIsNow: "",
        playersId: []
    }
}

export const roomsReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ROOMS_GET_ROOMS_FROM_DATA_BASE_SUCCESS:
            return {...state,
                rooms: [...action.payload.allRooms],
                gotRoomsFromDataBase: true
            }
        case types.ROOMS_GET_ROOMS_FROM_DATA_BASE_FAILURE:
            alert(action.payload.message)
            return state
        case types.ROOMS_CHANGE_ROOM_YOU_ARE_IN_DATA:
            return {...state,
                roomYouAreInData: {
                    id: action.payload._id,
                    roomName: action.payload.roomName,
                    ownerId:  action.payload.ownerId,
                    board: action.payload.board,
                    whoIsNow: action.payload.whoIsNow,
                    playersId: action.payload.playersId
                }
            }
        case types.ROOMS_CREATE_ROOM_SUCCESS:
            return {...state,
                //nie potrzebuje moje pokoju we wszystkich pokojach bo po co?
                //rooms: [...state.rooms.filter(el => el._id !== action.payload.newRoom.id), action.payload.newRoom],
                isRoomNameTaken: false
            }
        case types.ROOMS_CREATE_ROOM_FAILURE:
            //obsluzyc gdy baza zwroci blad ze typ juz ma pokoj
            let newIsRoomNameTaken = false
            
            switch(action.payload.message) {
                case "roomName is taken":
                    newIsRoomNameTaken = true;
                    break;
                case "you already have a room":
                    break;
                default:
                    alert(action.payload.message)
                    break;
            }

            return {...state,
                isRoomNameTaken: newIsRoomNameTaken
            }
        default:
            return state;
    }
}