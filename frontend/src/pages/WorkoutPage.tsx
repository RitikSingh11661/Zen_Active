import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Workout {id:number,path:string,title: string,description: string,color: string,emoji:string}

const workoutsData: Workout[] = [
  {id: 1,path:'muscleGain',title: 'Muscle Gain',description: 'Workout routine for muscle gain.',color: 'bg-purple-500',emoji: '💪'},
  {id: 2,path:'weightLoss',title: 'Weight Loss',description: 'Workout routine for weight loss.',color: 'bg-blue-500',emoji: '🏋️‍♀️'},
  {id: 3,path:'improvedCardio',title: 'Improved Cardio',description: 'Workout routine for improved cardio.',color: 'bg-red-500',emoji: '🏃‍♂️'},
];

const WorkoutPage: React.FC = () => {
  const navigate = useNavigate();
  const handleWorkoutSelection = (workoutId: string) => {navigate(`/workouts/${workoutId}`)};

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-purple-700">
      <h1 className="text-4xl font-bold mb-8 text-white">Choose a Workout</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {workoutsData.map((workout) => (
          <div
            key={workout.id}
            className={`rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer ${workout.color}`}
            onClick={() => handleWorkoutSelection(workout.path)}
          >
            <div className="p-6 flex flex-col items-center justify-center">
              <span className="text-5xl mb-4">{workout.emoji}</span>
              <h2 className="text-2xl font-bold mb-4 text-white">{workout.title}</h2>
              <p className="text-gray-200">{workout.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPage;
