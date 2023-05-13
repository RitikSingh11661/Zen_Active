import React, { useEffect, useRef, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../redux/store';
import { Button, Input, Select } from '@chakra-ui/react';
import { updateUser } from '../redux/Auth/actions';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

interface ProfilePageProps {
// Add any necessary props
}
interface HealthInformation { bloodGroup: string; weight: string; height: string }
interface FitnessGoals { weightLoss: boolean; muscleGain: boolean; improvedCardio: boolean }

export const Profile: React.FC<ProfilePageProps> = () => {
  const user = useSelector((store: RootStateType) => store.AuthReducer.user);
  const [detail,setDetail] = useState({name:'',email:'',password:'',city:'',_id:''})
  console.log('user',user)
  let userRef = useRef(user)
  const dispatch = useDispatch();
  const [healthInfo, setHealthInfo] = useState<HealthInformation>({ bloodGroup: '', weight: '', height: '' });
  const [fitnessGoals, setFitnessGoals] = useState<FitnessGoals>({ weightLoss: false, muscleGain: false, improvedCardio: false });
  
  const handleHealthInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHealthInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleFitnessGoalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFitnessGoals((prevGoals) => ({ ...prevGoals, [name]: value === 'true' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setDetail({...detail,healthInfo,fitnessGoals});
    const details = {...detail,...healthInfo,...fitnessGoals}
    console.log('details',details);
    (dispatch as ThunkDispatch<any, any, AnyAction>)(updateUser(details));
  };

  useEffect(() => {
    userRef.current = user;
    if(userRef.current.healthInfo && userRef.current.fitnessGoals){
       setDetail({name:userRef.current.name,email:userRef.current.email,password:userRef.current.password,city:userRef.current.city,_id:userRef.current._id})
       setHealthInfo(userRef.current.healthInfo);
       setFitnessGoals(userRef.current.fitnessGoals);
    }
  }, [user]);
  console.log('healthInfo',healthInfo)
  console.log('fitnessGoals',fitnessGoals)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-lg font-semibold">Name:</label>
          <p>{user.name}</p>
        </div>
        <div>
          <label className="text-lg font-semibold">Email:</label>
          <p>{user.email}</p>
        </div>
        <div>
          <label htmlFor="bloodGroup" className="text-lg font-semibold">
            Blood Group:
          </label>
          <Input
            id="bloodGroup"
            name="bloodGroup"
            placeholder="Enter your blood group"
            value={healthInfo.bloodGroup}
            onChange={handleHealthInfoChange}
          />
        </div>
        <div>
          <label htmlFor="weight" className="text-lg font-semibold">
            Weight (kg):
          </label>
          <Input
            id="weight"
            name="weight"
            type="number"
            placeholder="Enter your weight in kg"
            value={healthInfo.weight}
            onChange={handleHealthInfoChange}
          />
        </div>
        <div>
          <label htmlFor="height" className="text-lg font-semibold">
            Height (cm):
          </label>
          <Input
            id="height"
            name="height"
            type="number"
            placeholder="Enter your height in cm"
            value={healthInfo.height}
            onChange={handleHealthInfoChange}
          />
        </div>
        <div>
          <label htmlFor="weightLoss" className="text-lg font-semibold">
            Fitness Goals - Weight Loss:
          </label>
          <Select
            id="weightLoss"
            name="weightLoss"
            value={fitnessGoals.weightLoss.toString()}
            onChange={handleFitnessGoalChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </div>
        <div>
          <label htmlFor="muscleGain" className="text-lg font-semibold">
            Fitness Goals - Muscle Gain:
          </label>
          <Select
            id="muscleGain"
            name="muscleGain"
            value={fitnessGoals.muscleGain.toString()}
            onChange={handleFitnessGoalChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </div>
        <div>
          <label htmlFor="improvedCardio" className="text-lg font-semibold">
            Fitness Goals - Improved Cardiovascular Health:
          </label>
          <Select
            id="improvedCardio"
            name="improvedCardio"
            value={fitnessGoals.improvedCardio.toString()}
            onChange={handleFitnessGoalChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </div>
        <Button colorScheme="blue" type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

