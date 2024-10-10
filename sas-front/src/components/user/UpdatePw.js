import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePw = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const userNo = params.userNo;
  const [user, setUser] = useState({ userNo: userNo, userPw: "" });
  const [userPwRe, setUserPwRe] = useState("");
  const changePwRe = (e) => {
    setUserPwRe(e.target.value);
  };
  const changeInputVal = (e) => {
    setUser({ ...user, userPw: e.target.value });
  };
  const checkPwRef = useRef(null);
  const [pwReMsg, setPwReMsg] = useState("");
  const [checkPwRe, setCheckPwRe] = useState(false);
  const checkPw = (e) => {
    setCheckPwRe(false);
    setPwReMsg("");
    checkPwRef.current.classList.remove("colorGreen");
    checkPwRef.current.classList.remove("colorRed");
    if (user.userPw !== "") {
      if (user.userPw === e.target.value) {
        setPwReMsg("비밀번호와 일치합니다.");
        setCheckPwRe(true);
        checkPwRef.current.classList.add("colorGreen");
      } else {
        setPwReMsg("비밀번호와 일치하지 않습니다.");
        setCheckPwRe(false);
        checkPwRef.current.classList.add("colorRed");
      }
    }
  };
  const updatePw = () => {
    if (checkPwRe) {
      axios.post(`${backServer}/user/updatePw`, user).then((res) => {
        // console.log(res.data);
        if (res.data) {
          Swal.fire({
            title: "비밀번호 재생성 완료",
            text: "로그인 화면으로 돌아가세요",
            icon: "success",
            confirmButtonColor: "var(--main1)",
            confirmButtonText: "확인",
            customClass: {
              confirmButton: "swal-btn",
            },
          }).then(() => {
            navigate("/usermain/login");
          });
        }
      });
    }
  };
  return (
    <>
      <div className="find-main-zone">
        <div className="findByEmail-result round pw">
          <h3
            style={{
              color: "var(--main1)",
              cursor: "default",
              paddingLeft: "0",
            }}
          >
            비밀번호 재설정
          </h3>
          <div className="find-content active">
            <div className="input-item">
              <span className="input-title">
                <label htmlFor="userPw">새 비밀번호</label>
              </span>
              <input
                type="password"
                id="userPw"
                name="userPw"
                placeholder="새 비밀번호를 입력하세요"
                value={user.userPw}
                onChange={changeInputVal}
              />
            </div>
            <div className="input-item">
              <span className="input-title">
                <label htmlFor="userPwRe">새 비밀번호 확인</label>
              </span>
              <input
                type="password"
                id="userPwRe"
                name="userPwRe"
                placeholder="새 비밀번호를 다시 입력해주세요."
                value={userPwRe}
                onChange={changePwRe}
                onKeyUp={checkPw}
              />
              <p ref={checkPwRef}>{pwReMsg}</p>
            </div>
            <div className="find-btn">
              <button className="btn-main round" onClick={updatePw}>
                비밀번호 재설정
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdatePw;
