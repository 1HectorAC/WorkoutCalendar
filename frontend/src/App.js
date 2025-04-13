import './App.css';
import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <MyNavbar />
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
