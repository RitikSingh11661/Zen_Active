import axios from "axios";
import {GET_USER_FAILURE,GET_USER_REQUEST,GET_USER_SUCCESS,POST_SIGNIN_FAILURE,POST_SIGNIN_REQUEST,POST_SIGNIN_SUCCESS,SET_LOGIN_REQUEST,SET_LOGOUT_REQUEST} from "./actionTypes";
import { AnyAction } from "redux";

// signup actions
export const signupRequestAction=()=>({type:POST_SIGNIN_REQUEST})
export const signupSuccessAction = () => ({ type: POST_SIGNIN_SUCCESS });
export const signupFailureAction = () => ({ type: POST_SIGNIN_FAILURE });

// login actions
export const userRequestAction = () => ({ type: GET_USER_REQUEST });
export const userSuccessAction = (payload: any) => ({ type: GET_USER_SUCCESS, payload });
export const userFailureAction = () => ({ type: GET_USER_FAILURE });
export const setLoginAction = () => ({ type: SET_LOGIN_REQUEST });
export const setLogoutAction = () => ({ type: SET_LOGOUT_REQUEST });

// signup function
interface UserSignup {name: string;email: string;password: string;city: string}
interface UserLogin {email: string;password: string}
interface UserLogout {name:String}

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
  console.log('user',user)
  const userType = user?.email?.includes('admin') ? 'admins' : 'users';
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_AI}/${userType}/login`, JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' },
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('userrole', data.role);
    localStorage.setItem("isAuth", 'yes');
    dispatch(setLoginAction());   
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const setLogout = (user:UserLogout)=>(dispatch: any) => {
  dispatch(setLogoutAction());
  localStorage.clear();
};

export const getUserDetails=()=>(dispatch: any)=>{
   const token = localStorage.getItem('token')
   
}