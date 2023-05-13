import './App.css';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { MainRoutes } from './routes/MainRoutes';

function App() {
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
