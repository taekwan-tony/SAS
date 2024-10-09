import { useRef, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import FindMain from "./FindMain";
import "./login.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  loginUserIdState,
  userTypeState,
  loginUserNoState,
  loginUserNicknameState,
} from "../utils/RecoilData";
import FindId from "./FindId";
import FindPw from "./FindPw";
import FindResult from "./FindResult";
import UpdatePw from "./UpdatePw";

const LoginMain = () => {
  return (
    <div className="user-login-main">
      <div className="logo">
        <img src={"/image/s&s로고.png"} alt="" />
      </div>
      <div className="login-content">
        <Routes>
          <Route path="" element={<Login />}></Route>
          <Route path="find" element={<FindMain />}></Route>
          <Route path="findId" element={<FindId />}></Route>
          <Route path="findPw" element={<FindPw />}></Route>
          <Route path="findResult/:userId" element={<FindResult />}></Route>
          <Route path="updatePw/:userNo" element={<UpdatePw />}></Route>
        </Routes>
      </div>
    </div>
  );
};

const Login = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  // console.log(backServer);
  const [user, setUser] = useState({ userId: "", userPw: "" });
  const navigate = useNavigate();
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const [userType, setUserType] = useRecoilState(userTypeState);
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  const [loginUserNickname, setLoginUserNickname] = useRecoilState(
    loginUserNicknameState
  );
  const changeInputVal = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const login = () => {
    idRef.current.innerText = "";
    pwRef.current.innerText = "";
    if (user.userId === "" || user.userPw === "") {
    } else {
      axios
        .post(`${backServer}/user/login`, user)
        .then((res) => {
          // console.log(res.data);
          switch (res.data.result) {
            case 1:
              setLoginUserId(res.data.loginId);
              setUserType(res.data.userType);
              setLoginUserNo(res.data.userNo);
              setLoginUserNickname(res.data.userNickname);
              //로그인 이후 axios 요청 시 발급받은 토큰 값을 자동으로 axios에 추가하는 설정 (이 작업을 하지 않으면 매번 header에 token값을 보내줘야함)==>이제ㅡ Authorization을 키값으로 해서 token값을 받을 수 있음
              axios.defaults.headers.common["Authorization"] =
                res.data.accessToken;
              //로그인 이후 상태를 지속적으로 유지시키기 위해 발급받은 refreshToken을 브라우저에 저장==>이제 새로고침을 해도 로그인이 풀리지 않도록 작업할것임 & 자동로그인까지
              window.localStorage.setItem(
                "userRefreshToken",
                res.data.refreshToken
              );
              navigate("/usermain");
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
    }
  };

  // 소셜 로그인 도전~
  const goToNaverLogin = () => {
    const client_id = process.env.REACT_APP_NAVER_ID;
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const state = "spoon_smiles_naver_login_test";
    const redirectUrl = process.env.REACT_APP_REDIRECT_URI;
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${redirectUrl}`;
    // )
    // .then((res) => {
    //   console.log(res);
    //   console.log("일단 갔음");
    // })
    // .catch((err) => {
    //   console.log(err);
    //   console.log("뭔가 이상함");
    // });
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
        <Link to="/usermain/join">회원가입</Link>
      </div>
      <div className="social-btn">
        <p className="tag-msg">소셜 계정으로 로그인</p>
        <button className="round" onClick={goToNaverLogin}>
          <img src="/image/btnG_아이콘사각.png" />
          <span>네이버로 로그인</span>
        </button>
      </div>
    </>
  );
};

export default LoginMain;
