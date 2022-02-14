import { createAction } from "redux-api-middleware"
import types from './types';

export const createRoomOperation = (roomData) => {
    return createAction({
        endpoint: 'http://localhost:5000/rooms/createRoom',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer roomDaaccessToken`
        },
        body: JSON.stringify(roomData.newRoom),
        types: [
            'types.ROOMS_CREATE_ROOM_START',
            types.ROOMS_CREATE_ROOM_SUCCESS,
            {
                type: types.ROOMS_CREATE_ROOM_FAILURE,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    return json;
                }
            }
        ],
    })
}