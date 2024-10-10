import { useRef, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./storeCheckPw.css";
import Swal from "sweetalert2";
import axios from "axios";
import StoreChangePw from "./StoreChangePw";

const StoreCheckPw = ({ isPwModalOpen, closePwModal, props }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const storeNo = params.storeNo;
  const [soPwMsg, setsoPwMsg] = useState("");
  const [newSoPwReMsg, setNewSoPwReMsg] = useState("");
  const [isChecked, setIsChecked] = useState(false); // 체크박스 상태 관리

  const [checkSoPwRe, setCheckSoPwRe] = useState(false);
  const [checkNewSoPwRe, setCheckNewSoPwRe] = useState(false);

  const [newSoPw, setNewSoPw] = useState("");
  const [newSoPwRe, setNewSoPwRe] = useState("");

  const [store, setStore] = useState({
    storeNo: storeNo,
    soEmail: "",
    soPw: "",
  });

  const soEmailRef = useRef(null);
  const soPwRef = useRef(null);

  const changeStorePw = () => {
    if (store.soPw === newSoPwRe) {
      axios.post(`${backServer}/store/changePw`, store).then((res) => {
        if (res.data) {
          Swal.fire({
            title: "비밀번호가 변경되었습니다.",
            text: "로그인 페이지로 이동합니다.",
            icon: "success",
            confirmButtonColor: "#5e9960",
          })
            .then(() => {
              closePwModal(true);
              navigate("/");
            })
            .catch((err) => {});
        }
      });
    }
  };

  const soPwChange = () => {
    axios
      .post(`${backServer}/store/checkPw`, store)
      .then((res) => {
        if (res.status === 200) {
          // 이메일과 비밀번호가 일치할 때
          Swal.fire({
            title: "회원정보가 일치합니다.",
            icon: "success",
            text: "비밀번호 변경 페이지로 이동합니다.",
            confirmButtonColor: "#5e9960",
          }).then(() => {
            setIsChecked(true);
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          Swal.fire({
            title: "회원정보가 일치하지 않습니다.",
            icon: "error",
            text: "다시 입력해주세요.",
            confirmButtonColor: "#5e9960",
          }).then(() => {
            setIsChecked(false);
          });
        } else {
        }
      });
  };

  const soPwCheck = (e) => {
    setCheckSoPwRe(false);
    if (store.soPw !== "") {
      if (store.soPw === e.target.value) {
        setsoPwMsg("기존 비밀번호와 일치합니다.");
        setCheckSoPwRe(true);
      } else {
        setsoPwMsg("기존 비밀번호와 일치하지 않습니다.");
        setCheckSoPwRe(false);
      }
    }
  };

  const newSoPwReCheck = () => {
    setCheckNewSoPwRe(false);
    if (newSoPwRe !== "") {
      if (newSoPw === newSoPwRe) {
        setNewSoPwReMsg("새 비밀번호와 일치합니다.");
        setCheckNewSoPwRe(true);

        // newSoPw와 newSoPwRe가 동일할 때 store의 soPw에 newSoPw를 저장
        setStore({ ...store, soPw: newSoPw });
      } else {
        setNewSoPwReMsg("새 비밀번호와 일치하지 않습니다.");
        setCheckNewSoPwRe(false);
      }
    }
  };

  const changeSoPw = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStore({ ...store, [name]: e.target.value });
    //비밀번호 검증
    if (name === "soPw" && !passwordRegex.test(value)) {
      soPwRef.current.innerText = "비밀번호는 최대 12자까지 입력 가능합니다.";
    } else {
      soPwRef.current.innerText = "";
    }
  };

  const changeNewSoPw = (e) => {
    setNewSoPw(e.target.value);
  };

  const changeNewSoPwRe = (e) => {
    setNewSoPwRe(e.target.value);
  };

  // 모달 외부 클릭 시 모달 닫기
  const handleOutsideClick = (event) => {
    if (event.target.className === "storePwModal") {
      closePwModal();
    }
  };

  if (!isPwModalOpen) {
    return null; // 모달이 열리지 않았을 경우 null을 반환하여 아무것도 렌더링하지 않음
  }

  const handleKeyDown = (e) => {
    const { name, value } = e.target;

    if (e.key === "Enter") {
      e.preventDefault(); // 기본 폼 제출 방지
      soPwChange(); // 로그인 함수 호출
    }

    // 비밀번호 길이 제한
    if (name === "soPw" && value.length > 12) {
      soPwRef.current.innerText = "비밀번호는 12자 이하로 입력해주세요.";
      return;
    }
  };

  //정규표현식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex = /^.{1,12}$/;

  return (
    <>
      <div className="storeCheckPw-wrap">
        <div className="storeCheckPw-dashboard">
          <div>
            {/*모달 창 */}
            {isPwModalOpen && (
              <div className="storePwModal" onClick={handleOutsideClick}>
                <div className="storePwModal-content">
                  <span className="storePwModal-close" onClick={closePwModal}>
                    &times;
                  </span>
                  <div className="storeCheckPw-main">
                    <input
                      type="checkbox"
                      id="chk"
                      aria-hidden="true"
                      className="storeCheckPw-input"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />

                    <div className="storeCheckPw-signup">
                      <div className="storeCheckPw-regist">
                        <label
                          htmlFor="chk"
                          aria-hidden="true"
                          className="storeCheckPw-label"
                        >
                          비밀번호 변경
                        </label>
                        <table className="storeCheckPw-table">
                          <tbody className="storeCheckPw-tbody">
                            <tr className="storeCheckPw-tr">
                              <th className="storeCheckPw-th">
                                <label
                                  htmlFor="soEmail"
                                  className="storeCheckPw-pw-label"
                                >
                                  이메일 입력
                                </label>
                              </th>
                              <td className="storeCheckPw-td">
                                <div className="storeCheckPw-div">
                                  <input
                                    className="storeCheckPw-inputBox"
                                    placeholder="가입 시 작성한 이메일을 입력해주세요."
                                    type="text"
                                    id="soEmail"
                                    name="soEmail"
                                    value={store.soEmail}
                                    onChange={changeSoPw}
                                    onBlur={(e) => {
                                      // 입력 후 포커스를 잃을 때도 정규표현식 검증
                                      if (!emailRegex.test(e.target.value)) {
                                        soEmailRef.current.innerText =
                                          "유효한 이메일 형식을 입력해주세요.";
                                      } else {
                                        soEmailRef.current.innerText = "";
                                      }
                                    }}
                                  ></input>
                                  <p
                                    className="storeLogin-p"
                                    ref={soEmailRef}
                                  ></p>
                                </div>
                              </td>
                            </tr>
                            <tr className="storeCheckPw-tr">
                              <th className="storeCheckPw-th">
                                <label
                                  htmlFor="soPw"
                                  className="storeCheckPw-pw-label"
                                >
                                  기존 비밀번호 입력
                                </label>
                              </th>
                              <td className="storeCheckPw-td">
                                <div className="storeCheckPw-div">
                                  <input
                                    className="storeCheckPw-inputBox"
                                    placeholder="기존 비밀번호를 입력해주세요."
                                    type="password"
                                    id="soPw"
                                    name="soPw"
                                    value={store.soPw}
                                    onChange={changeSoPw}
                                    onKeyUp={soPwCheck}
                                    onKeyDown={handleKeyDown} // Enter 키 감지
                                  ></input>
                                  <p className="storeLogin-p" ref={soPwRef}></p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="storeCheckPw-btn-zone">
                          <button
                            type="submit"
                            className="storeCheckPw-btn"
                            onClick={soPwChange}
                          >
                            정보 확인
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 비밀번호 변경 */}
                    {isChecked ? (
                      <div className="storechangePw-up">
                        <div className="storechangePw-signup">
                          <div className="storechangePw-regist">
                            <label
                              htmlFor="chk"
                              aria-hidden="true"
                              className="storechangePw-label"
                            >
                              비밀번호 변경
                            </label>
                            <table className="storechangePw-table">
                              <tbody className="storechangePw-tbody">
                                <tr className="storechangePw-tr">
                                  <th className="storechangePw-th">
                                    <label
                                      htmlFor="soPw"
                                      className="storechangePw-pw-label"
                                    >
                                      새 비밀번호 입력
                                    </label>
                                  </th>
                                  <td className="storechangePw-td">
                                    <div className="storechangePw-div">
                                      <input
                                        className="storechangePw-inputBox"
                                        placeholder="새 비밀번호를 입력해주세요."
                                        type="password"
                                        id="soPw"
                                        name="soPw"
                                        value={newSoPw}
                                        onChange={changeNewSoPw}
                                        onKeyDown={handleKeyDown} // Enter 키 감지
                                      ></input>
                                      <p
                                        className="storeLogin-p"
                                        ref={soPwRef}
                                      ></p>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="storechangePw-tr">
                                  <th className="storechangePw-th">
                                    <label
                                      htmlFor="newSoPw"
                                      className="storechangePw-pw-label"
                                    >
                                      새 비밀번호 확인
                                    </label>
                                  </th>
                                  <td className="storechangePw-td">
                                    <div className="storechangePw-div">
                                      <input
                                        className="storechangePw-inputBox"
                                        placeholder="새 비밀번호를 다시 입력해주세요."
                                        type="password"
                                        id="newSoPwRe"
                                        name="newSoPwRe"
                                        value={newSoPwRe}
                                        onChange={changeNewSoPwRe}
                                        onKeyUp={newSoPwReCheck}
                                        onKeyDown={handleKeyDown} // Enter 키 감지
                                      ></input>
                                      <p
                                        className="storeLogin-p"
                                        ref={soPwRef}
                                      ></p>
                                    </div>
                                    <p
                                      className="storechangePw-msg"
                                      style={{
                                        backgroundImage:
                                          newSoPwReMsg ===
                                          "새 비밀번호와 일치합니다."
                                            ? `url(${process.env.PUBLIC_URL}/image/icon_check.svg)`
                                            : newSoPwReMsg ===
                                              "새 비밀번호와 일치하지 않습니다."
                                            ? `url(${process.env.PUBLIC_URL}/image/error.svg)` // 아이콘을 다르게 설정
                                            : "none", // 그 외의 경우 아이콘 없음
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "left center",
                                        marginLeft: "10px",
                                        paddingLeft: newSoPwReMsg
                                          ? "10px"
                                          : "0px", // 메시지가 있을 때만 padding
                                        color:
                                          newSoPwReMsg ===
                                          "새 비밀번호와 일치합니다."
                                            ? "#5e9960" // 비밀번호가 일치할 때는 글씨 색을 초록색
                                            : newSoPwReMsg ===
                                              "새 비밀번호와 일치하지 않습니다."
                                            ? "#D16D6A" // 비밀번호가 일치하지 않을 때는 글씨 색을 빨간색
                                            : "#5e9960", // 기본 글씨 색
                                      }}
                                    >
                                      {newSoPwReMsg}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="storechangePw-btn-zone">
                              <button
                                type="submit"
                                className="storechangePw-btn"
                                onClick={changeStorePw}
                              >
                                비밀번호 변경
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreCheckPw;
