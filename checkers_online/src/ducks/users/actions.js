import types from './types';

export const addYourDataAction = (yourData) => ({
    type: types.USERS_SET_YOUR_DATA,
    payload: yourData
})

export const changeIsNicknameTakenAction = (newValue) => ({
    type: types.USERS_CHANGE_NICKNAME_TAKEN_VALUE,
    payload: newValue
    
})