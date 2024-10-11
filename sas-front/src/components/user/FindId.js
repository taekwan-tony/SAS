import { useRef, useState } from "react";
import UserMain from "./UserMain";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FindId = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const selectNameRef = () => {
    if (!selectName) {
      setSelectName(true);
      setUser({ userName: "", userPhone: "", userEmail: "" });
    }
  };
  const navigate = useNavigate();
  const selectEmailRef = () => {
    if (selectName) {
      setSelectName(false);
      setUser({ userName: "", userPhone: "", userEmail: "" });
    }
  };
  const [user, setUser] = useState({
    userName: "",
    userPhone: "",
    userEmail: "",
  });
  const changeInputVal = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const findIdFunc = () => {
    if (
      user.userName !== "" &&
      (user.userEmail !== "" || user.userPhone !== "")
    ) {
      axios
        .post(`${backServer}/user/findId`, user)
        .then((res) => {
          if (res.data != null && res.data !== "") {
            navigate(`/usermain/login/findResult/${res.data}`);
          } else {
            Swal.fire({
              title: "조회 실패",
              text: "일치하는 회원정보가 존재하지 않습니다",
              icon: "warning",
              confirmButtonColor: "var(--main1)",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [selectName, setSelectName] = useState(true);
  return (
    <>
      <div className="find-main-zone">
        <div className="findByName round">
          <h3 onClick={selectNameRef}>
            <span class={"material-icons" + (selectName ? " colorGreen" : "")}>
              check_circle_outline
            </span>
            회원정보로 등록된 이름, 전화번호로 찾기
          </h3>
          <div className={"find-content" + (selectName ? " active" : "")}>
            <div className="input-item">
              <span className="input-title">
                <label htmlFor="userName">이름</label>
              </span>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="회원이름"
                value={user.userName}
                onChange={changeInputVal}
              />
            </div>
            <div className="input-item">
              <span className="input-title">
                <label htmlFor="userPhone">전화번호</label>
              </span>
              <input
                type="text"
                id="userPhone"
                name="userPhone"
                placeholder="전화번호"
                value={user.userPhone}
                onChange={changeInputVal}
              />
            </div>
            <div className="find-btn">
              <button className="btn-main round" onClick={findIdFunc}>
                아이디 찾기
              </button>
            </div>
          </div>
        </div>
        <div className="findByEmail round">
          <h3 onClick={selectEmailRef}>
            <span class={"material-icons" + (selectName ? "" : " colorGreen")}>
              check_circle_outline
            </span>
            회원정보로 등록된 이름, 이메일로 찾기
          </h3>
          <div className={"find-content" + (selectName ? "" : " active")}>
            <div className="input-item">
              <span className="input-title">
                <label htmlFor="userName">이름</label>
              </span>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="회원이름"
                value={user.userName}
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
            </div>
            <div className="find-btn">
              <button className="btn-main round" onClick={findIdFunc}>
                아이디 찾기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FindId;
