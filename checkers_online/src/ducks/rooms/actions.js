import types from './types';

export const changeRoomYouAreInDataAction = (roomData) => ({
    type: types.ROOMS_CHANGE_ROOM_YOU_ARE_IN_DATA,
    payload: roomData
})