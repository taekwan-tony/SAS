import { useEffect, useRef, useState } from "react";
import "./join.css";
import NicknameData from "./NicknameData.json";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Join = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userPhone: "",
    userEmail: "",
    userBirth: "",
    userGender: "",
    userNickname: "",
  });
  const changeInputVal = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [pwRe, setPwRe] = useState("");
  const changePwRe = (e) => {
    setPwRe(e.target.value);
  };

  const [agreeAllChecked, setAgreeAllChecked] = useState(false);
  const AllCheckedChange = (e) => {
    setAgreeAllChecked(!agreeAllChecked);
    for (var key in agreeChecked) {
      agreeChecked[key] = !agreeAllChecked;
    }
  };
  const [agreeChecked, setAgreeChecked] = useState({
    useAgreement: false,
    personalInfo: false,
  });
  const changeChecked = (e) => {
    setAgreeChecked({
      ...agreeChecked,
      [e.target.id]: !agreeChecked[e.target.id],
    });
    if (agreeChecked[e.target.id]) {
      setAgreeAllChecked(false);
    }
  };
  // 아이디 체크 //아직 정규식 안씀
  const idRef = useRef(null);
  const [checkIdResult, setCheckIdResult] = useState(false);
  const checkId = () => {
    idRef.current.classList.remove("valid");
    idRef.current.classList.remove("invalid");
    axios
      .get(`${backServer}/user/userId/${user.userId}/checkId`)
      .then((res) => {
        //console.log(res);
        if (res.data) {
          idRef.current.innerText = "사용가능한 아이디 입니다.";
          idRef.current.classList.add("valid");
          setCheckIdResult(true);
        } else {
          idRef.current.innerText = "이미 사용중인 아이디 입니다.";
          idRef.current.classList.add("invalid");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 비밀번호 체크 //아직 정규식 안씀
  const pwReMsgRef = useRef(null);
  const [checkPwResult, setCheckPwResult] = useState(false);
  const checkPw = () => {
    pwReMsgRef.current.classList.remove("valid");
    pwReMsgRef.current.classList.remove("invalid");
    if (pwRe === user.userPw) {
      pwReMsgRef.current.innerText = "비밀번호와 일치합니다.";
      pwReMsgRef.current.classList.add("valid");
      setCheckPwResult(true);
    } else {
      pwReMsgRef.current.innerText = "비밀번호와 일치하지 않습니다.";
      pwReMsgRef.current.classList.add("invalid");
    }
  };
  //인증번호 만료 시간
  let intervalId = null;
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState("00");
  const [timer, setTimer] = useState(180);
  useEffect(() => {
    console.log(timer);
    if (!checkCode) {
      intervalId = setInterval(function () {
        setTimer(timer - 1);
        if (sec == "00") {
          //0초 다음은 분을 내려야 하므로
          if (min === 0) {
            //0분0초=>멈춰야함
            clearInterval(intervalId);
            setCode(null);
            setEmailMsg("인증시간이 만료되었습니다.");
            codeCheckRef.current.classList.add("invalid");
          } else {
            setMin(min - 1);
            setSec("59");
          }
        } else {
          //0초가 아니면 초를 내리면 되므로
          const newSec = Number(sec) - 1;
          if (newSec < 10) {
            setSec("0" + newSec);
          } else {
            setSec(newSec);
          }
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [sec, timer]);

  // 인증번호
  const [emailMsg, setEmailMsg] = useState("");
  const codeCheckRef = useRef(null);
  const [codeNumber, setCodeNumber] = useState("");
  const changeCode = (e) => {
    setCodeNumber(e.target.value);
  };
  const [code, setCode] = useState("");
  const [checkCode, setCheckCode] = useState(false);
  const sendCode = () => {
    if (user.userEmail != null && user.userEmail !== "") {
      axios
        .post(`${backServer}/user/sendCode`, { userEmail: user.userEmail })
        .then((res) => {
          setCode(res.data);
          console.log(res.data);
          setMin(3);
          setSec("00");
          setTimer(180);
          setEmailMsg("");
          setCheckCode(false);
          codeCheckRef.current.classList.remove("valid");
          codeCheckRef.current.classList.remove("invalid");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const checkCodeRight = () => {
    setCheckCode(false);
    codeCheckRef.current.classList.remove("valid");
    codeCheckRef.current.classList.remove("invalid");
    if (
      user.userEmail != null &&
      user.userEmail !== "" &&
      code != "" &&
      codeNumber != ""
    ) {
      if (code === codeNumber) {
        setCheckCode(true);
        setEmailMsg("인증이 완료되었습니다.");
        codeCheckRef.current.classList.add("valid");
      } else {
        setEmailMsg("인증번호가 옳지 않습니다.");
        codeCheckRef.current.classList.add("invalid");
      }
    }
  };
  // 회원가입
  const join = () => {
    let joinReady = true;
    user.userNickname =
      NicknameData.determiners[
        Math.floor(Math.random() * NicknameData.determiners.length)
      ] +
      " " +
      NicknameData.animals[
        Math.floor(Math.random() * NicknameData.animals.length)
      ];
    setUser({ ...user });
    for (var key in user) {
      if (user[key] === null || user[key] === "") {
        joinReady = false;
        break;
      }
    }
    if (joinReady) {
      for (var key in agreeChecked) {
        if (!agreeChecked[key]) {
          joinReady = false;
          break;
        }
      }
    }

    if (joinReady && checkIdResult && checkPwResult && checkCode) {
      axios.post(`${backServer}/user`, user).then((res) => {
        if (res.data) {
          Swal.fire({
            title: "회원가입 완료",
            icon: "success",
          }).then(() => {
            navigate("/usermain/login");
          });
        }
      });
    }
  };
  return (
    <div className="userJoin-main">
      <div className="join-wrap">
        <div className="title">
          <h1>회원가입</h1>
        </div>
        <div className="join-content">
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userId">아이디</label>
            </div>
            <input
              type="text"
              name="userId"
              id="userId"
              placeholder="아이디"
              value={user.userId}
              onChange={changeInputVal}
              onBlur={checkId}
            />
            <p className="msg id-msg" ref={idRef}></p>
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userPw">비밀번호</label>
            </div>
            <input
              type="password"
              name="userPw"
              id="userPw"
              placeholder="비밀번호"
              value={user.userPw}
              onChange={changeInputVal}
            />
            <p className="msg pw-msg"></p>
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userPwRe">비밀번호 확인</label>
            </div>
            <input
              type="password"
              name="userPwRe"
              id="userPwRe"
              placeholder="비밀번호 확인"
              value={pwRe}
              onChange={changePwRe}
              onBlur={checkPw}
            />
            <p className="msg pwRe-msg" ref={pwReMsgRef}></p>
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userName">이름</label>
            </div>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="실명을 입력하세요"
              value={user.userName}
              onChange={changeInputVal}
            />
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userPhone">휴대폰 번호</label>
            </div>
            <input
              type="text"
              name="userPhone"
              id="userPhone"
              placeholder="010-0000-0000 형식으로 입력"
              value={user.userPhone}
              onChange={changeInputVal}
            />
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userEmail">이메일</label>
            </div>
            <input
              type="text"
              name="userEmail"
              id="userEmail"
              placeholder="이메일 주소"
              value={user.userEmail}
              onChange={changeInputVal}
            />
            <button className="btn-sub round" onClick={sendCode}>
              인증번호 전송
            </button>
          </div>
          <div className="input-item join-number">
            <div className="input-title">
              <label htmlFor="number">인증번호</label>
            </div>
            <input
              type="text"
              name="number"
              id="number"
              placeholder="인증번호 입력"
              value={codeNumber}
              onChange={changeCode}
              onBlur={checkCodeRight}
            />
            <span
              className={"auth-time msg" + (checkCode ? " valid" : " invalid")}
            >
              {code !== "" ? min + ":" + sec : ""}
            </span>
            <p className="msg email-msg" ref={codeCheckRef}>
              {code === "" ? "" : emailMsg}
            </p>
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userBirth">생년월일</label>
            </div>
            <input
              type="text"
              name="userBirth"
              id="userBirth"
              placeholder="yyyy-mm-dd 형식으로 입력"
              value={user.userBirth}
              onChange={changeInputVal}
            />
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userGender">성별</label>
            </div>
            <div className="input-content">
              <div className="radio-box">
                <input
                  type="radio"
                  name="userGender"
                  id="female"
                  value="여"
                  onChange={changeInputVal}
                />
                <label htmlFor="female">여자</label>
              </div>
              <div className="radio-box">
                <input
                  type="radio"
                  name="userGender"
                  id="male"
                  value="남"
                  onChange={changeInputVal}
                />
                <label htmlFor="male">남자</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="agree-wrap">
        <h2>
          <input
            type="checkbox"
            name="agreeAll"
            id="agreeAll"
            checked={agreeAllChecked}
            onChange={AllCheckedChange}
          />
          <label htmlFor="agreeAll">모두 동의합니다</label>
        </h2>
        <div className="agree-content">
          <input
            type="checkbox"
            name="useAgreement"
            id="useAgreement"
            onChange={changeChecked}
            checked={agreeChecked.useAgreement}
          />
          <label htmlFor="useAgreement">이용약관 동의</label>
          <button>
            보기 <span className="material-icons">chevron_right</span>
          </button>
        </div>
        <div className="agree-content">
          <input
            type="checkbox"
            name="agree"
            id="personalInfo"
            onChange={changeChecked}
            checked={agreeChecked.personalInfo}
          />
          <label htmlFor="personalInfo">개인정보 취급방침 동의</label>
          <button>
            보기 <span className="material-icons">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="btn-zone">
        <button className="btn-main round" onClick={join}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Join;
