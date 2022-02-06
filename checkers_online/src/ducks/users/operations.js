import { createAction } from "redux-api-middleware"
import types from './types';

export const postUserOperation = (newUser) => {
    return createAction({
        endpoint: 'http://localhost:5000/users',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),
        types: [
            'types.PERSON_ADD_NEW_PERSON_START',
            types.USERS_POST_USER_SUCCESS,
            'types.PERSON_ADD_NEW_PERSON_FAILURE'
        ],
    })
}