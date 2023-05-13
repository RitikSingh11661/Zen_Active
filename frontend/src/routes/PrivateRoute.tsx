import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootStateType } from '../redux/store';

export const PrivateRoute = ({children}:{children:any}) => {
    const isAuth = useSelector((store:RootStateType)=>store.AuthReducer.isAuth);
    const location=useLocation();
  return !isAuth?<Navigate to='/login' state={location.pathname} replace/>:children;
}