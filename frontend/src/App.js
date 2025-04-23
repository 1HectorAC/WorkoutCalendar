import './App.css';
import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyWorkouts from './pages/MyWorkouts';

function App() {
  return (
    <div className="App">
        <MyNavbar />
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/myWorkouts' element={<MyWorkouts />} />
          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
