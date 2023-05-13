import { useDispatch } from 'react-redux';
import './App.css';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { MainRoutes } from './routes/MainRoutes';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useEffect } from 'react';
import { getUserDetails } from './redux/Auth/actions';

function App() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    (dispatch as ThunkDispatch<any, any, AnyAction>)(getUserDetails)
 },[])

  return (
    <div className="App">
      {/* <h1 className='text-3xl font-bold underline text-red-200'>Revision Project</h1> */}
      <Navbar/>
      <MainRoutes/>
      <Footer/>
    </div>
  );
}

export default App;
