import { useState } from "react";
import { useParams } from "react-router-dom";
import "./storeCheckPw.css";
import Swal from "sweetalert2";
import axios from "axios";

const StoreCheckPw = ({ isPwModalOpen, closePwModal }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const storeNo = params.storeNo;

  const [soPwMsg, setsoPwMsg] = useState("");
  const [newSoPwMsg, setNewSoPwMsg] = useState("");
  const [newSoPwReMsg, setNewSoPwReMsg] = useState("");

  const [checkSoPwRe, setCheckSoPwRe] = useState(false);

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

  const [store, setStore] = useState({
    soEmail: "",
    soPw: "",
    storeNo: storeNo,
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
      <div className="storeChangePw-wrap">
        <div className="storeChangePw-dashboard">
          <div>
            {/*모달 창 */}
            {isPwModalOpen && (
              <div className="storePwModal" onClick={handleOutsideClick}>
                <div className="storePwModal-content">
                  <span className="storePwModal-close" onClick={closePwModal}>
                    &times;
                  </span>
                  <div className="storechangePw-main">
                    <input
                      type="checkbox"
                      id="chk"
                      aria-hidden="true"
                      className="storechangePw-input"
                    />

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
                                  htmlFor="soEmail"
                                  className="storechangePw-pw-label"
                                >
                                  이메일 입력
                                </label>
                              </th>
                              <td className="storechangePw-td">
                                <div className="storechangePw-div">
                                  <input
                                    className="storechangePw-inputBox"
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
                            <tr className="storechangePw-tr">
                              <th className="storechangePw-th">
                                <label
                                  htmlFor="soPw"
                                  className="storechangePw-pw-label"
                                >
                                  기존 비밀번호 입력
                                </label>
                              </th>
                              <td className="storechangePw-td">
                                <div className="storechangePw-div">
                                  <input
                                    className="storechangePw-inputBox"
                                    placeholder="기존 비밀번호를 입력해주세요."
                                    type="text"
                                    id="soPw"
                                    name="soPw"
                                    value={store.soPw}
                                    onChange={changeSoPw}
                                    onKeyUp={soPwCheck}
                                  ></input>
                                </div>
                                <p
                                  className="storechangePw-msg"
                                  style={{
                                    backgroundImage: soPwMsg
                                      ? `url(${process.env.PUBLIC_URL}/image/icon_check.svg)`
                                      : "none", // 이미지가 없을 때는 none
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "left center",
                                    marginLeft: "10px",
                                    paddingLeft: soPwMsg ? "10px" : "0px", // 메시지가 있을 때만 padding
                                  }}
                                >
                                  {soPwMsg}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="storechangePw-btn-zone">
                          <button type="submit" className="storechangePw-btn">
                            비밀번호 변경
                          </button>
                        </div>
                      </div>
                    </div>
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
