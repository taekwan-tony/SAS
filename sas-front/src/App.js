import "./default.css"; //기본 색, 폰트 변수
import { Route, Routes } from "react-router-dom";
import LoginMain from "./components/user/LoginMain";
function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Routes>
        <Route path="/login/*" element={<LoginMain />} />
      </Routes>
    </div>
  );
}

export default App;
