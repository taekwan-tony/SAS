import React, { useState } from "react";
import "./storeLogin.css";
import { Route, Routes } from "react-router-dom";
import StoreRegist from "./StoreRegist";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoreLogin = ({ isModalOpen, closeModal }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [bnMsg, setBnMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [store, setStore] = useState({
    soName: "",
    businessNumber: "",
    soPhone: "",
    soEmail: "",
    soPw: "",
  });
  const [storeLogin, setStoreLogin] = useState({
    soEmail: "",
  });

  const changeStore = (e) => {
    const name = e.target.name;
    setStore({ ...store, [name]: e.target.value });
  };

  const changeStoreLogin = (e) => {
    const name = e.target.name;
    setStoreLogin({ ...storeLogin, [name]: e.target.value });
  };

  const storeRegistBusinessNumber = () => {
    // 사업자등록번호 입력 값에서 숫자 외의 문자를 제거하는 부분
    const businessNumberElement = document.getElementById("businessNumber");
    businessNumberElement.value = businessNumberElement.value.replace(
      /[^0-9]/g,
      ""
    );

    const reg_num = businessNumberElement.value;

    if (!reg_num) {
      Swal.fire({
        title: "사업자등록번호를 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return false;
    }

    // 전송할 데이터
    const data = {
      b_no: [reg_num],
    };

    // Fetch API를 사용하여 POST 요청 보내기
    fetch(
      "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=izDvzK%2FsSEz9bDSkKZ2ITpUtPOjeYOTTFEsMUh%2BOKm%2B1SNrCWoYHCLtDCJ1F184rdJo3an8rhug39mJE4F59Xw%3D%3D",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json()) // JSON 응답을 파싱
      .then((result) => {
        console.log(result);
        if (result.match_cnt === 1) {
          // 성공 처리
          console.log("success");
          Swal.fire({
            title: "사업자등록번호 조회 성공",
            icon: "success",
            confirmButtonColor: "#5e9960",
          }).then(setBnMsg("조회에 성공하였습니다."));
        } else {
          // 실패 처리
          console.log("fail");
          Swal.fire({
            title: "사업자등록번호 조회 실패",
            icon: "warning",
            text: "국세청에 등록되지 않은 사업자등록번호입니다.",
            confirmButtonColor: "#5e9960",
          });
          setBnMsg("");
        }
      })
      .catch((error) => {
        // 에러 처리
        console.error("error", error);
        setBnMsg("");
      });
  };

  const storeRegistEmailCheck = () => {
    const soEmailElement = document.getElementById("soEmail");

    const emailCheck = soEmailElement.value;
    if (!emailCheck) {
      Swal.fire({
        title: "이메일을 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return false;
    }
    axios
      .get(`${backServer}/store/soEmail/${store.soEmail}/checkEmail`)
      .then((res) => {
        console.log(res);
        if (res.data) {
          setEmailMsg("사용 가능한 이메일입니다.");
        } else {
          setEmailMsg("이미 가입한 이메일입니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const storePartnership = () => {
    axios
      .post(`${backServer}/store`, store)
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "제휴 신청 완료",
            icon: "success",
            text: "관리자 승인까지 약 1~3일 소요됩니다.",
            confirmButtonColor: "#5e9960",
          }).then(() => {
            navigate("/storeMain");
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 모달 외부 클릭 시 모달 닫기
  const handleOutsideClick = (event) => {
    if (event.target.className === "storeModal") {
      closeModal();
    }
  };

  if (!isModalOpen) {
    return null; // 모달이 열리지 않았을 경우 null을 반환하여 아무것도 렌더링하지 않음
  }

  return (
    <>
      <div className="storeLogin-wrap">
        <div className="storeLogin-dashboard">
          <div>
            {/* 메인 페이지 내용 */}

            {/* 모달 창 */}
            {isModalOpen && (
              <div className="storeModal" onClick={handleOutsideClick}>
                <div className="storeModal-content">
                  <span className="storeLogin-close" onClick={closeModal}>
                    &times;
                  </span>
                  <div className="storeLogin-main">
                    <input
                      type="checkbox"
                      id="chk"
                      aria-hidden="true"
                      className="storeLogin-input"
                    />
                    {/* 로그인 */}
                    <div className="storeLogin-signup">
                      <div className="storeLogin-regist">
                        <label
                          htmlFor="chk"
                          aria-hidden="true"
                          className="storeLogin-label"
                        >
                          로그인
                        </label>
                        <table className="storeLogin-table">
                          <tbody className="storeRegist-tbody">
                            <tr className="storeRegist-tr">
                              <th className="storeRegist-th">
                                <label
                                  htmlFor="soEmail"
                                  className="storeLogin-login-label"
                                >
                                  아이디
                                </label>
                              </th>
                              <td>
                                <div className="storeRegist-div">
                                  <input
                                    className="storeLogin-inputBox"
                                    placeholder="이메일을 입력해주세요."
                                    type="text"
                                    id="soEmail"
                                    name="soEmail"
                                    value={storeLogin.soEmail}
                                    onChange={changeStoreLogin}
                                  ></input>
                                </div>
                              </td>
                            </tr>
                            <tr className="storeRegist-tr">
                              <th className="storeRegist-th">
                                <label
                                  htmlFor="soPw"
                                  className="storeLogin-login-label"
                                >
                                  비밀번호
                                </label>
                              </th>
                              <td>
                                <div className="storeRegist-div">
                                  <input
                                    className="storeLogin-inputBox"
                                    placeholder="비밀번호를 입력해주세요."
                                    type="text"
                                    id="soPw"
                                    name="soPw"
                                    value={store.soPw}
                                    onChange={changeStore}
                                  ></input>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="storeLogin-btn-zone">
                          <button
                            type="submit"
                            className="storeLogin-login-btn"
                            onClick={storePartnership}
                          >
                            로그인
                          </button>
                        </div>
                        {/*비밀번호 찾기, 비밀번호 변경 */}
                        <>
                          <div className="storeLogin-find">
                            <a className="storeLogin-a">
                              비밀번호 찾기 / 비밀번호 변경
                            </a>
                          </div>
                        </>
                      </div>
                    </div>
                    {/* 제휴 신청 */}
                    <div className="storeLogin-login">
                      <label
                        htmlFor="chk"
                        aria-hidden="true"
                        className="storeLogin-regist-label"
                      >
                        제휴 신청
                      </label>
                      <table className="storeRegist-table">
                        <tbody className="storeRegist-tbody">
                          <tr className="storeLogin-storeRegist-tr">
                            <th className="storeRegist-th">
                              <label
                                htmlFor="businessNumber"
                                className="storeLogin-storeRegist-label"
                              >
                                사업자번호
                              </label>
                            </th>
                            <td>
                              <div className="storeRegist-div">
                                <input
                                  className="storeLogin-storeRegist-inputBox"
                                  placeholder="번호만 입력해주세요."
                                  type="text"
                                  id="businessNumber"
                                  name="businessNumber"
                                  value={store.businessNumber}
                                  onChange={changeStore}
                                ></input>
                                <button
                                  className="storeLogin-storeRegist-btn"
                                  onClick={storeRegistBusinessNumber}
                                >
                                  조회
                                </button>
                              </div>
                              <p
                                className="storeLogin-msg"
                                style={{
                                  backgroundImage: bnMsg
                                    ? `url(${process.env.PUBLIC_URL}/image/icon_check.svg)`
                                    : "none", // 이미지가 없을 때는 none
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "left center",
                                  marginLeft: "10px",
                                  paddingLeft: bnMsg ? "10px" : "0px", // 메시지가 있을 때만 padding
                                }}
                              >
                                {bnMsg}
                              </p>
                            </td>
                          </tr>
                          <tr className="storeLogin-storeRegist-tr">
                            <th className="storeRegist-th">
                              <label
                                htmlFor="soName"
                                className="storeLogin-storeRegist-label"
                              >
                                이름
                              </label>
                            </th>
                            <td>
                              <div className="storeRegist-div">
                                <input
                                  className="storeLogin-storeRegist-inputBox"
                                  type="text"
                                  id="soName"
                                  name="soName"
                                  value={store.soName}
                                  onChange={changeStore}
                                ></input>
                              </div>
                            </td>
                          </tr>
                          <tr className="storeLogin-storeRegist-tr">
                            <th className="storeRegist-th">
                              <label
                                htmlFor="soPhone"
                                className="storeLogin-storeRegist-label"
                              >
                                전화번호
                              </label>
                            </th>
                            <td>
                              <div className="storeRegist-div">
                                <input
                                  className="storeLogin-storeRegist-inputBox"
                                  placeholder="010-0000-0000 형태로 입력해주세요."
                                  type="text"
                                  id="sophone"
                                  name="soPhone"
                                  value={store.soPhone}
                                  onChange={changeStore}
                                ></input>
                              </div>
                            </td>
                          </tr>
                          <tr className="storeLogin-storeRegist-tr">
                            <th className="storeRegist-th">
                              <label
                                htmlFor="soEmail"
                                className="storeLogin-storeRegist-label"
                              >
                                이메일
                              </label>
                            </th>
                            <td>
                              <div className="storeRegist-div">
                                <input
                                  className="storeLogin-storeRegist-inputBox"
                                  type="text"
                                  id="soEmail"
                                  name="soEmail"
                                  value={store.soEmail}
                                  onChange={changeStore}
                                ></input>
                                <button
                                  className="storeLogin-storeRegist-btn"
                                  onClick={storeRegistEmailCheck}
                                >
                                  중복 체크
                                </button>
                              </div>
                              <p
                                className="storeLogin-msg"
                                style={{
                                  backgroundImage: emailMsg
                                    ? `url(${process.env.PUBLIC_URL}/image/icon_check.svg)`
                                    : "none", // 이미지가 없을 때는 none
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "left center",
                                  marginLeft: "10px",
                                  paddingLeft: emailMsg ? "27px" : "0px", // 메시지가 있을 때만 padding
                                }}
                              >
                                {emailMsg}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="storeLogin-partnership-btn-zone">
                        <button
                          type="submit"
                          className="storeLogin-partnership-btn"
                          onClick={storePartnership}
                        >
                          제휴 신청
                        </button>
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

export default StoreLogin;
