import {
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_WORKOUTS_SUCCESS,
    POST_SIGNIN_FAILURE,
    POST_SIGNIN_REQUEST,
    POST_SIGNIN_SUCCESS,
    SET_LOGIN_REQUEST,
    SET_LOGOUT_REQUEST,
    UPDATE_USER_SUCCESS,
  } from "./actionTypes";
  
  let key = localStorage.getItem("isAuth");
  const initialState = {user:{},users: [],workouts:{},isAuth: key || false,isLoading: false,isError: false};
  
  export const reducer = (state = initialState,{type, payload}:{type:string,payload:any}) => {
    switch (type) {
      case POST_SIGNIN_REQUEST:
        return { ...state, isLoading: true };
      case POST_SIGNIN_SUCCESS:
        return { ...state, isLoading: false, isError: false };
      case POST_SIGNIN_FAILURE:
        return { ...state, isLoading: false, isError: true };
      case GET_USER_REQUEST:
        return { ...state, isLoading: true };
      case GET_USER_SUCCESS:
        return { ...state, isLoading: false, isError: false, user: payload };
      case GET_USER_FAILURE:
        return { ...state, isLoading: false, isError: true };
      case SET_LOGIN_REQUEST:
        return { ...state, isAuth: true,user:payload};
      case SET_LOGOUT_REQUEST:
        return { ...state, isAuth: false };
      case UPDATE_USER_SUCCESS:
        return {...state,user:payload}  
      case GET_WORKOUTS_SUCCESS:
        return {...state,workouts: payload};  
      default:
        return state;
    }
  };
  