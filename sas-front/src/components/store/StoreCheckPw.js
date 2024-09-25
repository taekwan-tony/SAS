import { useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./storeCheckPw.css";
import Swal from "sweetalert2";
import axios from "axios";
import StoreChangePw from "./StoreChangePw";

const StoreCheckPw = ({ isPwModalOpen, closePwModal }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const storeNo = params.storeNo;

  const [soPwMsg, setsoPwMsg] = useState("");
  const [newSoPwMsg, setNewSoPwMsg] = useState("");
  const [newSoPwReMsg, setNewSoPwReMsg] = useState("");
  const [isChecked, setIsChecked] = useState(false); // 체크박스 상태 관리

  const [checkSoPwRe, setCheckSoPwRe] = useState(false);
  const [checkNewSoPwRe, setCheckNewSoPwRe] = useState(false);

  const soPwChange = () => {
    axios
      .post(`${backServer}/store/checkPw`, store)
      .then((res) => {
        console.log(res);
        if (res.data) {
          // 이메일과 비밀번호가 일치할 때
          setIsChecked(true);
        } else {
          // 이메일 비밀번호가 일치하지 않을 때
          console.log("불일치");
          setIsChecked(false);
        }
      })
      .catch((err) => {
        console.log(err);
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

  const newSoPwReCheck = (e) => {
    setCheckNewSoPwRe(false);
    if (newSoPwRe !== "") {
      if (newSoPwRe === newSoPwRe) {
        setNewSoPwReMsg("새 비밀번호와 일치합니다.");
        setCheckNewSoPwRe(true);
      } else {
        setNewSoPwReMsg("새 비밀번호와 일치하지 않습니다.");
        setCheckNewSoPwRe(false);
      }
    }
  };

  const [store, setStore] = useState({
    soEmail: "",
    soPw: "",
  });

  const [newSoPw, setNewSoPw] = useState("");
  const [newSoPwRe, setNewSoPwRe] = useState("");

  const changeSoPw = (e) => {
    const name = e.target.name;
    setStore({ ...store, [name]: e.target.value });
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
                                  ></input>
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
                                    type="text"
                                    id="soPw"
                                    name="soPw"
                                    value={store.soPw}
                                    onChange={changeSoPw}
                                    onKeyUp={soPwCheck}
                                  ></input>
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
                                      htmlFor="newSoPw"
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
                                        type="text"
                                        id="newSoPw"
                                        name="newSoPw"
                                        value={newSoPw}
                                        onChange={changeNewSoPw}
                                      ></input>
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
                                        type="text"
                                        id="newSoPwRe"
                                        name="newSoPwRe"
                                        value={newSoPwRe}
                                        onChange={changeNewSoPwRe}
                                        onKeyUp={newSoPwReCheck}
                                      ></input>
                                    </div>
                                    <p
                                      className="storechangePw-msg"
                                      style={{
                                        backgroundImage: newSoPwReMsg
                                          ? `url(${process.env.PUBLIC_URL}/image/icon_check.svg)`
                                          : "none", // 이미지가 없을 때는 none
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "left center",
                                        marginLeft: "10px",
                                        paddingLeft: newSoPwReMsg
                                          ? "10px"
                                          : "0px", // 메시지가 있을 때만 padding
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
