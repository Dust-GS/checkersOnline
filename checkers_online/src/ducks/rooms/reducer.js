import types from "./types";

const initialState = {
    rooms: [],
    isRoomNameTaken: false,
    //mozliwe ze to jest niepotrzebne to nizej
    roomYouAreInData: {
        roomName: "",
        ownerId:  "",
        board: [],
        whoIsNow: "",
        playersId: []
    }
}

export const roomsReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ROOMS_CHANGE_ROOM_YOU_ARE_IN_DATA:
            return {...state,
                roomYouAreInData: {
                    roomName: action.payload.roomName,
                    ownerId:  action.payload.ownerId,
                    board: action.payload.board,
                    whoIsNow: action.payload.whoIsNow,
                    playersId: action.payload.playersId
                }
            }
        case types.ROOMS_CREATE_ROOM_SUCCESS:
            return {...state,
                rooms: [...state.rooms.filter(el => el._id !== action.payload.newRoom._id), action.payload.newRoom],
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