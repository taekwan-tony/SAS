import "./default.css"; //기본 색, 폰트 변수
import { Route, Routes } from "react-router-dom";
import LoginMain from "./components/user/LoginMain";
import Main from "./components/main/Main";

import UserMain from "./components/user/UserMain";

import AdminMain from "./components/admin/AdminMain";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login/*" element={<LoginMain />} />
        <Route path="/usermain" element={<UserMain />} />
        <Route path="/admin/*" element={<AdminMain />} />
      </Routes>
    </div>
  );
}

export default App;
