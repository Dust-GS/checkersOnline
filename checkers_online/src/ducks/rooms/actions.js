import types from "./types";

export const addPlayerToRoomAction = (playerId) => ({
  type: types.ROOMS_ADD_PLAYER_TO_ROOM_YOU_ARE_IN,
  payload: playerId,
});

export const enemyMovedAction = (updatedBoard, whoIsNow) => ({
  type: types.ROOMS_ENEMY_MOVED,
  payload: {
    updatedBoard: updatedBoard,
    whoIsNow: whoIsNow,
  },
});

export const someoneWonAction = (winnerId) => ({
  type: types.ROOMS_ENEMY_MOVED,
  payload: winnerId,
});
