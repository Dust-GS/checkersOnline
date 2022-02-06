import types from "./types";

const initialState = {
    users: []
}

export const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.USERS_POST_USER_SUCCESS:
            //return { ...state, users: [...state.users, action.payload] }
            console.log(action.type)
            return state
        default:
            return state;
    }
}