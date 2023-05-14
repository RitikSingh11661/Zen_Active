import axios from "axios";
import {GET_USER_FAILURE,GET_USER_REQUEST,GET_USER_SUCCESS,GET_WORKOUTS_SUCCESS,POST_SIGNIN_FAILURE,POST_SIGNIN_REQUEST,POST_SIGNIN_SUCCESS,SET_LOGIN_REQUEST,SET_LOGOUT_REQUEST, UPDATE_USER_SUCCESS} from "./actionTypes";
import { AnyAction, Dispatch } from "redux";
import jwtDecode from "jwt-decode";
import { ThunkDispatch } from "redux-thunk";

// signup actions
export const signupRequestAction=()=>({type:POST_SIGNIN_REQUEST})
export const signupSuccessAction = () => ({ type: POST_SIGNIN_SUCCESS });
export const signupFailureAction = () => ({ type: POST_SIGNIN_FAILURE });

// login actions
export const userRequestAction = () => ({ type: GET_USER_REQUEST });
export const userSuccessAction = (payload: object) => ({ type: GET_USER_SUCCESS, payload });
export const userFailureAction = () => ({ type: GET_USER_FAILURE });
export const setLoginAction = (payload:object) => ({ type: SET_LOGIN_REQUEST,payload});
export const setLogoutAction = () => ({ type: SET_LOGOUT_REQUEST });

export const updateUserAction = (payload:any) => ({ type: UPDATE_USER_SUCCESS,payload});

export const getWorkoutsAction =(payload:any)=>({type:GET_WORKOUTS_SUCCESS,payload});

interface UserSignup {name: string;email: string;password: string;city: string}
interface UserLogin {email: string;password: string}

export const signup = (user:UserSignup) => async (dispatch: (action:AnyAction) => void) => {
  dispatch(signupRequestAction());
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_AI}/users/register`, JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' }
    });
    dispatch(signupSuccessAction());
    return res;
  } catch (error) {
    dispatch(signupFailureAction());
    throw error;
  }
};

export const setLogin = (user:UserLogin) => async(dispatch: any) => {
  const userType = user?.email?.includes('admin') ? 'admins' : 'users';
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_AI}/${userType}/login`, JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' },
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem("isAuth", 'yes');
    dispatch(setLoginAction(data.data));   
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const setLogout = (dispatch: Dispatch) => {
  dispatch(setLogoutAction());
  localStorage.clear();
};

export const getUserDetails=async(dispatch: Dispatch)=>{
  const token = localStorage.getItem('token');
  if(token){
    const {userId}: any = jwtDecode(token);
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_AI}/users/${userId}`);
      dispatch(userSuccessAction(data.data))         
    } catch (error) {console.log('error',error)}
  }
}

export const updateUser=(user:any)=>async(dispatch: Dispatch)=>{
  try {
    const { data } = await axios.patch(`${process.env.REACT_APP_API_AI}/users/update/${user._id}`, JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json',token:localStorage.getItem('token') }
    });
    dispatch(updateUserAction(user));
    alert(data.msg)
  } catch (error:any) {
  console.log('error',error)
  alert(error.msg)
  }
}

export const getWorkouts=async(dispatch:any)=>{
  try {
    const {data}= await axios.get(`${process.env.REACT_APP_API_AI}/workouts`);
    dispatch(getUserDetails(data.data))
    console.log('data',data);
     return data;
   } catch (error) {console.log('error',error)}
};
