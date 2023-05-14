import { Route, Routes } from 'react-router-dom'
import { Homepage } from '../pages/Homepage'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { NotFound } from '../pages/NotFound'
import { Profile } from '../pages/Profile'
import { PrivateRoute } from './PrivateRoute'
import { SingleWorkout } from '../pages/SingleWorkout'
import WorkoutPage from '../pages/WorkoutPage'

export const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>     
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>     
        <Route path='/workouts' element={<WorkoutPage/>}/> 
        <Route path='/workouts/:id' element={<SingleWorkout/>}/> 
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}