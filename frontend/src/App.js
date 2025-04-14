import './App.css';
import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
        <MyNavbar />
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
