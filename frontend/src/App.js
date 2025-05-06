import './App.css';
import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyWorkouts from './pages/MyWorkouts';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
        
        <BrowserRouter>
        <MyNavbar />
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/myWorkouts' />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to='/myWorkouts' />} />
              <Route path='/myWorkouts' element={user ? <MyWorkouts /> : <Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
