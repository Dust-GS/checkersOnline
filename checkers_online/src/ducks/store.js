import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import { createMiddleware } from 'redux-api-middleware';
import { usersReducer } from './users/reducer'
import { roomsReducer } from './rooms/reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    users: usersReducer,
    rooms: roomsReducer
});

const store = createStore(combinedReducers, 
  composeEnhancers(applyMiddleware(thunk, createMiddleware())),
);

export default store;