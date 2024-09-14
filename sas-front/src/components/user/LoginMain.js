import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import FindMain from "./FindMain";
import "./login.css";
const LoginMain = () => {
  return (
    <div>
      <div className="logo"></div>
      <Routes>
        <Route path="" element={<Login />}></Route>
        <Route path="find" element={<FindMain />}></Route>
      </Routes>
    </div>
  );
};

const Login = () => {
  const [login, setLogin] = useState({ id: "", pw: "" });
  const changeInputVal = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form
        className="login-wrap"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="login-title">로그인</div>
        <div className="input-item">
          <input
            type="text"
            id="id"
            name="id"
            value={login.id}
            placeholder="아이디"
            onChange={changeInputVal}
          />
        </div>
        <div className="input-item">
          <input
            type="password"
            id="pw"
            name="pw"
            value={login.pw}
            placeholder="비밀번호"
            onChange={changeInputVal}
          />
        </div>
        <div className="login-btn">
          <button type="submit">로그인</button>
        </div>
      </form>
      <div className="link">
        <Link to="find">아이디/비밀번호 찾기</Link>
        <Link to="/join">회원가입</Link>
      </div>
    </>
  );
};

export default LoginMain;
