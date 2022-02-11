import types from "./types";

const initialState = {
    users: [],
    yourData: {
        nickname: "",
        password: ""
    },
    areAllUsersInStore: false,
    isNicknameTaken: false,
    isNicknameWrong: false,
    isPaswordWrong: false
}

export const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.USERS_CHANGE_NICKNAME_TAKEN_VALUE:
            return {...state, isNicknameTaken: action.payload}
        case types.USERS_SET_YOUR_DATA:
            return {...state,
                yourData: {
                    nickname: action.payload.nickname,
                    password: action.payload.password
                }
            }
        case types.USERS_POST_USER_SUCCESS:
            //moze dodac filter ktory sie upewnia ze nie ma  duplikatow w users
            //musimy pobrac z bazy osobe zeby miala id
            return {...state,
                users: [...state.users.filter(el => el.nickname !== action.payload.newUser.nickname), action.payload.newUser],
                yourData: {
                    nickname: action.payload.newUser.nickname,
                    password: action.payload.newUser.password
                },
                isNicknameTaken: false
            }
        case types.USERS_POST_USER_FAILURE:
            let newIsNicknameTaken
            if(action.payload.message === "nickname is taken"){
                newIsNicknameTaken = true
            } else if(action.payload.message === "user created"){
                newIsNicknameTaken = false
            } else {
                alert(action.payload.message)
            }

            return {...state, isNicknameTaken: newIsNicknameTaken}
        case types.USERS_LOGIN_SUCCESS:
            //musimy pobrac z bazy osobe zeby miala id
            return {...state,
                users: [...state.users.filter(el => el.nickname !== action.payload.userData.nickname), action.payload.userData],
                yourData: {
                    nickname: action.payload.userData.nickname,
                    password: action.payload.userData.password
                },
                isNicknameWrong: false,
                isPaswordWrong: false
            }
        case types.USERS_LOGIN_FAILURE:
            let newIsNicknameWrong = false
            let newIsPaswordWrong = false

            switch(action.payload.message) {
                case "Cant find the user":
                    newIsNicknameWrong = true;
                    break;
                case "password incorrect":
                    newIsPaswordWrong = true;
                    break;
                default:
                    alert(action.payload.message)
                    break;
            }

            return {...state, isNicknameWrong: newIsNicknameWrong, isPaswordWrong: newIsPaswordWrong}
        case types.USERS_GET_ALL_USERS_SUCCESS:
            //tutaj przychodzą osoby z id
            return {...state, users: action.payload.allUsers, areAllUsersInStore: true}
        case types.USERS_GET_ALL_USERS_FAILURE:
            alert(action.payload.message)
            return state
        default:
            return state;
    }
}