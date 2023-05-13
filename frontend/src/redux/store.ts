import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { reducer as AuthReducer } from './Auth/reducer';

// import {reducer as AppReducer} from './App/reducer'
// import {reducer as AdminReducer} from './Admin/reducer'

// Define the shape of your root state
type RootStateType = ReturnType<typeof mainReducer>;

const mainReducer = combineReducers({AuthReducer});

export const store:Store<RootStateType>=createStore(mainReducer,applyMiddleware(thunk as ThunkMiddleware<RootStateType>));

export type { RootStateType };