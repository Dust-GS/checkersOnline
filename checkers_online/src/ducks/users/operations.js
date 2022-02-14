import { createAction } from "redux-api-middleware"
import types from './types';
//get
export const getAllUsersOperation = () => {
    return createAction({
        endpoint: 'http://localhost:5000/users/getAllUsers',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            'types.USERS_GET_ALL_USERS_START',
            types.USERS_GET_ALL_USERS_SUCCESS,
            {
                type: types.USERS_GET_ALL_USERS_FAILURE,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    return json;
                }
            }
        ],
    })
}
//post
export const postUserOperation = (newUser) => {
    return createAction({
        endpoint: 'http://localhost:5000/users/createUser',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),
        types: [
            'types.USERS_POST_USER_START',
            types.USERS_POST_USER_SUCCESS,
            {
                type: types.USERS_POST_USER_FAILURE,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    return json;
                }
            }
        ],
    })
}

export const loginOperation = (userData) => {
    return createAction({
        endpoint: 'http://localhost:5000/users/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        types: [
            'types.USERS_LOGIN_START',
            types.USERS_LOGIN_SUCCESS,
                
            {
                type: types.USERS_LOGIN_FAILURE,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    return json;
                }
            }
        ],
    })
}

