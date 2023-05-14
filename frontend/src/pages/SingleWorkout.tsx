import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../redux/store';
import { getWorkouts, updateUser } from '../redux/Auth/actions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface Workout {_id: string;name: string;image: string;description: string;instructions: string[]}

export const SingleWorkout: React.FC = () => {
  const [workouts,setWorkouts]  = useState<Workout[]>([]);
  const user = useSelector((store: RootStateType) => store.AuthReducer.user);
  const [workoutStatuses,setWorkoutStatuses] = useState<any>({})
  const dispatch = useDispatch();
  const location = useLocation(),lastPathname = location.pathname.split('/').pop();
  const wStatuses = `${lastPathname}Statuses`;
  const handleWorkoutComplete = (workoutName: string) => {
    const updatedWorkoutStatuses = {...user.fitnessGoals[lastPathname!].wStatuses,
      [workoutName]: !user.fitnessGoals[lastPathname!].wStatuses[workoutName],
    };
    setWorkoutStatuses((prev:any)=>prev=updatedWorkoutStatuses);                                                       
    const updatedUser={...user,fitnessGoals:{...user.fitnessGoals,[lastPathname!]:{...user.fitnessGoals[lastPathname!],wStatuses:updatedWorkoutStatuses}}};
    (dispatch as ThunkDispatch<any, any, AnyAction>)(updateUser(updatedUser));
  };
  console.log('wStatuses',wStatuses)
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_AI}/workouts`).then((res)=>{
      const data = res.data.data[0],workout = lastPathname?data[lastPathname]:null;
      setWorkouts(workout);
    })
    const s = user.fitnessGoals[lastPathname!].wStatuses;
    setWorkoutStatuses(s);

    (dispatch as ThunkDispatch<any, any, AnyAction>)(getWorkouts)
  },[])
  console.log('workoutStatuses',workoutStatuses)

  return (
    <div className="container mx-auto py-8 bg-gradient-to-r from-teal-500 to-blue-500">
      <h1 className="text-4xl font-bold text-white mb-8">Weight Gain Workouts</h1>
      <div className="flex flex-col gap-6">
        {workouts.length>0 && workouts.map((workout) => (
          <div
            key={workout._id}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={() => handleWorkoutComplete(workout.name)}
          >
            <div className="flex items-center justify-center mb-4">
              <img
                src={workout.image}
                alt={workout.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-blue-700 mb-2">{workout.name}</h2>
            <p className="text-gray-600 mb-4">{workout.description}</p>
            <h3 className="text-lg font-bold text-blue-700 mb-2">Instructions:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {workout.instructions && workout.instructions.map((instruction, index) => (
                <li key={index} className="mb-2">
                  {instruction}
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              {workoutStatuses && [workout.name]?(
                <span className="text-green-500 font-bold">Completed</span>
              ) : (
                <span className="text-gray-500">Not Completed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
