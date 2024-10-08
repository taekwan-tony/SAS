import { Route, Routes, useNavigate } from "react-router-dom";
import {
  loginStoreNoState,
  loginUserIdState,
  loginUserNicknameState,
  loginUserNoState,
  userTypeState,
} from "../utils/RecoilData";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import "./mypageUpdate.css";
import axios from "axios";
import Swal from "sweetalert2";
const MypageUpdate = (props) => {
  const checkUpdate = props.checkUpdate;
  const setCheckUpdate = props.setCheckUpdate;
  return (
    <div className="update-main">
      <div className="update-content round">
        <h1>회원 정보 수정</h1>
        <Routes>
          <Route path="checkPw" element={<CheckPw />}></Route>
          <Route
            path="updateForm"
            element={
              <Update
                checkUpdate={checkUpdate}
                setCheckUpdate={setCheckUpdate}
              />
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

const CheckPw = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  const [user, setUser] = useState({ userNo: loginUserNo, userPw: "" });
  useEffect(() => {
    setUser({ ...user, userNo: loginUserNo });
  }, [loginUserNo]);
  const [pwMsg, setPwMsg] = useState("");
  const checkUserPw = () => {
    console.log(user);
    console.log(loginUserNo);
    setPwMsg("");
    axios
      .post(`${backServer}/user/checkUser`, user)
      .then((res) => {
        if (res.data) {
          navigate("/usermain/mypage/update/updateForm");
        } else {
          setPwMsg("비밀번호가 옳지 않습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="checkPw-wrap">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          checkUserPw();
        }}
      >
        <label htmlFor="checkPw">회원 비밀번호 : </label>
        <input
          type="password"
          id="checkPw"
          value={user.userPw}
          onChange={(e) => {
            setUser({ ...user, userPw: e.target.value });
          }}
        />
      </form>
      <p className="msg colorRed">{pwMsg}</p>
    </div>
  );
};

const Update = (props) => {
  const { checkUpdate, setCheckUpdate } = props;
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const [userType, setUserType] = useRecoilState(userTypeState);
  const [loginUserNickname, setLoginUserNickname] = useRecoilState(
    loginUserNicknameState
  );
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    console.log(userType);
    axios
      .get(`${backServer}/user/userNo/${loginUserNo}/update`)
      .then((res) => {
        setUser({
          ...res.data,
          userNo: loginUserNo,
          userNickname: loginUserNickname,
          userId: loginUserId,
          userPw: "",
          exNickname: loginUserNickname,
          userType: userType,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginUserNickname, checkUpdate]);
  const changeInputVal = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // 정규식 위한 체크
  const [checkBeforeUpdate, setCheckBeforeUpdate] = useState({
    checkNickname: true,
    checkPw: true,
    checkPhone: true,
    checkEmail: true,
  });
  const [checkMsg, setCheckMsg] = useState({ checkNickname: "" });
  // 닉네임 중복 체크
  const checkNickname = () => {
    setCheckBeforeUpdate({ ...checkBeforeUpdate, checkNickname: false });
    setCheckMsg({ ...checkMsg, checkNickname: "" });
    axios
      .get(`${backServer}/user/userNickname/${user.userNickname}`)
      .then((res) => {
        if (res.data) {
          setCheckBeforeUpdate({ ...checkBeforeUpdate, checkNickname: true });
          setCheckMsg({
            ...checkMsg,
            checkNickname: "사용 가능한 닉네임입니다.",
          });
        } else {
          setCheckBeforeUpdate({ ...checkBeforeUpdate, checkNickname: false });
          setCheckMsg({ ...checkMsg, checkNickname: "중복된 닉네임입니다." });
        }
      });
  };
  // //비밀번호 정규식
  // const [checkPwMsg, setCheckPwMsg] = useState("");
  // const checkPwReg = () => {
  //   setCheckBeforeUpdate({ ...checkBeforeUpdate, checkPw: false });
  //   setCheckPwMsg("");
  //   const pwReg = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/;
  //   if (user.userPw !== "" && pwReg.test(user.userPw)) {
  //     setCheckJoin({ ...checkJoin, checkPw: true });
  //     setCheckJoinMsg({
  //       ...checkJoinMsg,
  //       checkPw: "사용가능한 비밀번호 입니다.",
  //     });
  //   } else if (user.userPw !== "") {
  //     setCheckJoinMsg({
  //       ...checkJoinMsg,
  //       checkPw:
  //         "영소문자, 숫자, @$!%*?& 를 1개 이상 포함한 8자 이상의 문자여야합니다.",
  //     });
  //   }
  // };

  //휴대폰 번호 정규식
  const checkPhone = () => {
    const phoneReg = /^01[016789]-\d{3,4}-\d{4}$/;
    setCheckBeforeUpdate({ ...checkBeforeUpdate, checkPhone: false });
    if (phoneReg.test(user.userPhone)) {
      setCheckBeforeUpdate({ ...checkBeforeUpdate, checkPhone: true });
    }
  };
  //이메일 정규식
  const checkEmail = () => {
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setCheckBeforeUpdate({ ...checkBeforeUpdate, checkEmail: false });
    if (emailReg.test(user.userEmail)) {
      setCheckBeforeUpdate({ ...checkBeforeUpdate, checkEmail: true });
    }
  };

  // 업데이트 버튼
  const update = () => {
    if (
      user.userNickname !== "" &&
      user.userPhone != "" &&
      user.userEmail != ""
    ) {
      axios
        .patch(`${backServer}/user`, user)
        .then((res) => {
          if (res.data) {
            Swal.fire({
              title: "회원 정보 수정 성공",
              icon: "success",
              confirmButtonText: "확인",
              confirmButtonColor: "var(--main1)",
            }).then(() => {
              setCheckUpdate(!checkUpdate);
              setCheckMsg({ ...checkMsg, checkNickname: "" });
              console.log(userType);
              axios
                .post(`${backServer}/user/refreshToken`, {
                  userId: loginUserId,
                  userNo: loginUserNo,
                  userNickname: user.userNickname,
                  loginType: userType,
                })
                .then((res) => {
                  console.log(res);
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
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="update-frm">
      <div className="update-content-frm">
        <div className="input-box">
          <label htmlFor="userId">아이디</label>
          <div className="input-item">
            <input type="text" id="userId" readOnly value={user.userId} />
          </div>
        </div>
        <div className="input-box">
          <label htmlFor="userNickname">닉네임</label>
          <div className="input-item">
            <input
              type="text"
              id="userNickname"
              name="userNickname"
              value={user.userNickname}
              onChange={changeInputVal}
              onBlur={checkNickname}
              className="update"
            />
            <p
              className={
                checkBeforeUpdate.checkNickname
                  ? "msg colorGreen"
                  : "msg colorRed"
              }
            >
              {checkMsg.checkNickname}
            </p>
          </div>
        </div>
        <div className="input-box">
          <label htmlFor="userPw">비밀번호</label>
          <div className="input-item">
            <input
              type="text"
              id="userPw"
              name="userPw"
              value={user.userPw}
              onChange={changeInputVal}
              className="update"
            />
          </div>
        </div>
        <div className="input-box">
          <label htmlFor="userName">이름</label>
          <div className="input-item">
            <input type="text" id="userName" readOnly value={user.userName} />
          </div>
        </div>
        <div className="input-box">
          <label htmlFor="userGender">성별</label>
          <div className="input-item">
            <input
              type="text"
              id="userGender"
              readOnly
              value={user.userGender}
            />
          </div>
        </div>
        <div className="input-box">
          <label htmlFor="userBirth">생년월일</label>
          <div className="input-item">
            <input type="text" readOnly id="userBirth" value={user.userBirth} />
          </div>
        </div>
        <div className="input-box">
          <label htmlFor="userPhone">전화번호</label>
          <div className="input-item">
            <input
              type="text"
              id="userPhone"
              name="userPhone"
              value={user.userPhone}
              onChange={changeInputVal}
              className="update"
            />
          </div>
        </div>
        <div className="input-box">
          <label htmlFor="userEmail">이메일</label>
          <div className="input-item">
            <input
              type="text"
              id="userEmail"
              name="userEmail"
              value={user.userEmail}
              onChange={changeInputVal}
              className="update"
            />
          </div>
        </div>
      </div>
      <div className="update-footer">
        <button
          className="btn-sub round"
          onClick={() => {
            navigate("/usermain/mypage");
          }}
        >
          취 소
        </button>
        <button className="btn-main round" onClick={update}>
          수 정
        </button>
      </div>
    </div>
  );
};

export default MypageUpdate;
