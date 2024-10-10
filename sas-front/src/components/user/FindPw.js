import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FindPw = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ userId: "", userEmail: "", userNo: 0 });
  const changeInputVal = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const backServer = process.env.REACT_APP_BACK_SERVER;
  //인증번호 만료 시간
  let intervalId = null;
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState("00");
  const [timer, setTimer] = useState(180);
  useEffect(() => {
    // console.log(timer);
    if (!checkCode && user.userNo !== 0) {
      intervalId = setInterval(function () {
        // console.log(2);
        setTimer(timer - 1);
        if (sec == "00") {
          //0초 다음은 분을 내려야 하므로
          if (min === 0) {
            //0분0초=>멈춰야함
            clearInterval(intervalId);
            setCode(null);
            setEmailMsg("인증시간이 만료되었습니다.");
            codeCheckRef.current.classList.add("colorRed");
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
  }, [sec, timer, user.userNo]);

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
    setCodeNumber("");
    setUser({ ...user, userNo: 0 });
    setEmailMsg("");
    setCheckCode(false);
    codeCheckRef.current.classList.remove("colorGreen");
    codeCheckRef.current.classList.remove("colorRed");
    setCode("");
    if (user.userId !== "" && user.userEmail !== "") {
      axios.post(`${backServer}/user/findPw`, user).then((res) => {
        if (res.data === 0) {
          Swal.fire({
            title: "조회 실패",
            text: "해당 회원정보가 존재하지 않습니다",
            icon: "warning",
            iconColor: "var(--main1)",
            confirmButtonColor: "var(--main1)",
          });
        } else {
          setUser({ ...user, userNo: res.data });
          axios
            .post(`${backServer}/user/sendCode`, { userEmail: user.userEmail })
            .then((res) => {
              setCode(res.data);
              // console.log(res.data);
              setMin(3);
              setSec("00");
              setTimer(180);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    } else {
      Swal.fire({
        title: "필요한 정보를 모두 입력해주세요",
        icon: "warning",
        confirmButtonColor: "var(--main1)",
        iconColor: "var(--main1)",
      });
    }
  };
  const checkCodeRight = () => {
    setCheckCode(false);
    codeCheckRef.current.classList.remove("colorGreen");
    codeCheckRef.current.classList.remove("colorRed");
    if (
      user.userEmail != null &&
      user.userEmail !== "" &&
      code != "" &&
      codeNumber != ""
    ) {
      if (code === codeNumber) {
        setCheckCode(true);
        setEmailMsg("인증이 완료되었습니다.");
        codeCheckRef.current.classList.add("colorGreen");
      } else {
        setEmailMsg("인증번호가 옳지 않습니다.");
        codeCheckRef.current.classList.add("colorRed");
      }
    }
  };

  const changePw = () => {
    if (user.userNo !== 0 && checkCode) {
      navigate(`/userMain/login/updatePw/${user.userNo}`);
    }
  };
  return (
    <>
      <div className="find-main-zone">
        <div className="findByEmail round findPw">
          <h3
            style={{
              color: "var(--main1)",
              cursor: "default",
              paddingLeft: "0",
            }}
          >
            회원정보로 등록된 아이디, 이메일로 본인인증
          </h3>
          <div className="find-content active">
            <div className="input-item flex-start">
              <span className="input-title">
                <label htmlFor="userId">아이디</label>
              </span>
              <input
                type="text"
                id="userId"
                name="userId"
                placeholder="회원 아이디"
                value={user.userId}
                onChange={changeInputVal}
              />
            </div>
            <div className="input-item">
              <span className="input-title">
                <label htmlFor="userEmail">이메일</label>
              </span>
              <input
                type="text"
                id="userEmail"
                name="userEmail"
                placeholder="회원 이메일"
                value={user.userEmail}
                onChange={changeInputVal}
              />
              <button className="btn-main round" onClick={sendCode}>
                인증번호 받기
              </button>
            </div>
            <div className="input-item findPw-number">
              <span className="input-title">
                <label htmlFor="number">인증번호</label>
              </span>
              <input
                type="text"
                id="number"
                name="number"
                placeholder="인증번호 입력"
                value={codeNumber}
                onChange={changeCode}
              />
              <span
                className={
                  "auth-time msg" + (checkCode ? " colorGreen" : " colorRed")
                }
              >
                {code !== "" ? min + ":" + sec : ""}
              </span>
              <button className="btn-sub round" onClick={checkCodeRight}>
                인증번호 확인
              </button>
            </div>
            <p className="msg email-msg" ref={codeCheckRef}>
              {code === "" ? "" : emailMsg}
            </p>
            <div className="find-btn">
              <button className="btn-main round" onClick={changePw}>
                비밀번호 재설정
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FindPw;
