import { createAction } from "redux-api-middleware"
import types from './types';

export const createRoomOperation = (roomData) => {
    return createAction({
        endpoint: 'http://localhost:5000/rooms/createRoom',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${roomData.accessToken}`
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

export const getAllRoomsOperation = () => {
    return createAction({
        endpoint: 'http://localhost:5000/rooms/getAllRooms',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            'types.ROOMS_GET_ROOMS_FROM_DATA_BASE_START',
            types.ROOMS_GET_ROOMS_FROM_DATA_BASE_SUCCESS,
            {
                type: types.ROOMS_GET_ROOMS_FROM_DATA_BASE_FAILURE,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    return json;
                }
            }
        ],
    })
}