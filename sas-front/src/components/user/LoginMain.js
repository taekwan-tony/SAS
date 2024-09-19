import { useRef, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import FindMain from "./FindMain";
import "./login.css";
import axios from "axios";
import { RecoilState, useRecoilState } from "recoil";
import { loginUserIdState, userTypeState } from "../utils/RecoilData";
import FindId from "./FindId";

const LoginMain = () => {
  return (
    <div className="user-login-main">
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/image/s&s로고.png`} alt="" />
      </div>
      <div className="login-content">
        <Routes>
          <Route path="" element={<Login />}></Route>
          <Route path="find" element={<FindMain />}></Route>
          <Route path="findId" element={<FindId />}></Route>
        </Routes>
      </div>
    </div>
  );
};

const Login = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  console.log(backServer);
  const [user, setUser] = useState({ userId: "", userPw: "" });
  const navigate = useNavigate();
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const [userType, setUserType] = useRecoilState(userTypeState);
  const changeInputVal = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const login = () => {
    idRef.current.innerText = "";
    pwRef.current.innerText = "";
    axios
      .post(`${backServer}/user/login`, user)
      .then((res) => {
        console.log(res.data);
        switch (res.data.result) {
          case 1:
            setLoginUserId(res.data.loginId);
            setUserType(res.data.userType);
            //로그인 이후 axios 요청 시 발급받은 토큰 값을 자동으로 axios에 추가하는 설정 (이 작업을 하지 않으면 매번 header에 token값을 보내줘야함)==>이제ㅡ Authorization을 키값으로 해서 token값을 받을 수 있음
            axios.defaults.headers.common["Authorization"] =
              res.data.accessToken;
            //로그인 이후 상태를 지속적으로 유지시키기 위해 발급받은 refreshToken을 브라우저에 저장==>이제 새로고침을 해도 로그인이 풀리지 않도록 작업할것임 & 자동로그인까지
            window.localStorage.setItem(
              "userRefreshToken",
              res.data.refreshToken
            );
            navigate("/userMain");
            break;
          case 2:
            idRef.current.innerText = "존재하지 않는 아이디입니다.";
            break;
          case 3:
            pwRef.current.innerText = "비밀번호를 잘못 입력하셨습니다.";
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form
        className="login-wrap"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <div className="login-title">로그인</div>
        <div className="input-item">
          <input
            type="text"
            id="id"
            name="userId"
            value={user.userId}
            placeholder="아이디"
            onChange={changeInputVal}
          />
          <p className="msg" ref={idRef}></p>
        </div>
        <div className="input-item">
          <input
            type="password"
            id="pw"
            name="userPw"
            value={user.userPw}
            placeholder="비밀번호"
            onChange={changeInputVal}
          />
          <p className="msg" ref={pwRef}></p>
        </div>
        <div className="login-btn">
          <button className="btn-main round" type="submit">
            로그인
          </button>
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
