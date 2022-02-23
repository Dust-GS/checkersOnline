import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginOrRegister from "./ui/homePage/LoginOrRegister";
import Login from "./ui/homePage/Login";
import Register from "./ui/homePage/Register";
import Menu from "./ui/menu/Menu";
import CreateRoom from "./ui/menu/CreateRoom";
import OneRoom from "./ui/game/OneRoom";
import FindRoom from "./ui/menu/FindRoom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginOrRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* sprawdza czy jestes zalogowany przy odswierzeniu */}
          <Route path="/menu" element={<Menu />} />
          {/* sprawdza czy jestes zalogowany przy odswierzeniu */}
          <Route path="/createRoom" element={<CreateRoom />} />

          <Route path="/findRoom" element={<FindRoom />} />
          <Route path="/oneRoom/:roomId" element={<OneRoom />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
