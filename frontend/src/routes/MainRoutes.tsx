import { Route, Routes } from 'react-router-dom'
import { Homepage } from '../pages/Homepage'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { NotFound } from '../pages/NotFound'
import { Profile } from '../pages/Profile'
import { PrivateRoute } from './PrivateRoute'

export const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>     
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>     
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}