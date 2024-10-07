import { Route, Routes, useNavigate } from "react-router-dom";
import {
  loginStoreNoState,
  loginUserIdState,
  loginUserNicknameState,
  loginUserNoState,
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
  const [loginUserNickname, setLoginUserNickname] = useRecoilState(
    loginUserNicknameState
  );
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
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
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginUserNo, checkUpdate]);
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
              setLoginUserNickname(user.userNickname);
              setCheckUpdate(!checkUpdate);
              setCheckMsg({ ...checkMsg, checkNickname: "" });
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
