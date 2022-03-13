import types from "./types";

export const addYourDataAction = (yourData) => ({
  type: types.USERS_SET_YOUR_DATA,
  payload: yourData,
});

export const changeIsNicknameTakenAction = (newValue) => ({
  type: types.USERS_CHANGE_NICKNAME_TAKEN_VALUE,
  payload: newValue,
});

export const changeDoYouHaveTooManyRoomsAction = (newValue) => ({
  type: types.USERS_CHANGE_TOO_MANY_ROOMS_VALUE,
  payload: newValue,
});

export const changeYourRoomsNumberAction = (newValue) => ({
  type: types.USERS_CHANGE_YOUR_ROOMS_NUMBER,
  payload: newValue,
});

export const changeRoomIdYouCreatedAction = (roomId) => ({
  type: types.USERS_CHANGE_ROOM_ID_YOUR_CREATED,
  payload: roomId,
});

export const changeYouAreInGameAction = (newValue) => ({
  type: types.USERS_CHANGE_YOUR_ARE_IN_GAME,
  payload: newValue,
});
