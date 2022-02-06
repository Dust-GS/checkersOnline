import './App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginOrRegister from './ui/homePage/LoginOrRegister';
import Login from './ui/homePage/Login';
import Register from './ui/homePage/Register';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginOrRegister />}/>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
