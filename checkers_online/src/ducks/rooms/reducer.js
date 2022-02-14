import types from "./types";

const initialState = {
    rooms: [],
    isRoomNameTaken: false
}

export const roomsReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ROOMS_CREATE_ROOM_SUCCESS:
            return {...state,
                rooms: [...state.rooms.filter(el => el.id !== action.payload.newRoom.id), action.payload.newRoom],
                isRoomNameTaken: false
            }
        case types.ROOMS_CREATE_ROOM_FAILURE:
            //obsluzyc gdy baza zwroci blad ze typ juz ma pokoj
            let newIsRoomNameTaken = false

            switch(action.payload.message) {
                case "roomName is taken":
                    newIsRoomNameTaken = true;
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