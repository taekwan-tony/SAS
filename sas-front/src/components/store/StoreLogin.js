import React, { useRef, useState } from "react";
import "./storeLogin.css";
import { Route, Routes, useParams } from "react-router-dom";
import StoreRegist from "./StoreRegist";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  loginStoreIdState,
  loginStoreNoState,
  storeNameState,
  storeTypeState,
} from "../utils/RecoilData";
import StoreChangePw from "./StoreChangePw";
import StoreCheckPw from "./StoreCheckPw";

const StoreLogin = ({ isModalOpen, closeModal }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const storeNo = params.storeNo;
  const [store, setStore] = useState({
    soName: "",
    businessNumber: "",
    soPhone: "",
    soEmail: "",
    soPw: "",
    storeNo: storeNo,
  });

  const [storeLogin, setStoreLogin] = useState({
    soEmail: "",
    soPw: "",
    storeNo: storeNo,
    storeName: "",
  });

  //이메일 중복 확인
  const [isSoEmailValid, setIsSoEmailValid] = useState(false);

  {
    /* 비밀번호 찾기 / 변경 창 Modal */
  }

  // 모달의 열림/닫힘 상태를 관리하는 useState
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);

  // 모달 열기 함수
  const openPwModal = () => {
    setIsPwModalOpen(true);
  };

  // 모달 닫기 함수
  const closePwModal = () => {
    setIsPwModalOpen(false);
  };

  // 모달 외부 클릭 시 모달 닫기
  const pwHandleOutsideClick = (event) => {
    if (event.target.className === "storeModal") {
      closePwModal();
    }
  };

  {
    /* 로그인 */
  }
  const [loginSoEmail, setLoginSoEmail] = useRecoilState(loginStoreIdState);
  const [storeType, setStoreType] = useRecoilState(storeTypeState);
  const [loginStoreNo, setLoginStoreNo] = useRecoilState(loginStoreNoState);
  const [storeName, setStoreName] = useRecoilState(storeNameState);

  const soEmailRef = useRef(null);
  const soPwRef = useRef(null);

  const login = () => {
    soEmailRef.current.innerText = "";
    soPwRef.current.innerText = "";
    if (store.soEmail === "" || store.soPw === "") {
      console.log("이메일 / 비밀번호가 비어있음");
    } else {
      axios
        .post(`${backServer}/store/storeLogin`, store)
        .then((res) => {
          const {
            result,
            storeType,
            loginSoEmail,
            storeNo,
            accessToken,
            refreshToken,
            storeName,
          } = res.data;
          console.log("매장 로그인 정보 : ", res.data);
          switch (res.data.result) {
            case 1:
              setLoginSoEmail(res.data.soEmail);
              setStoreType(res.data.storeType);
              setLoginStoreNo(res.data.storeNo);

              axios.defaults.headers.common["Authorization"] =
                res.data.accessToken;
              window.localStorage.setItem(
                "storeRefreshToken",
                res.data.refreshToken
              );
              if (storeType === 1) {
                // 판매자 로그인
                console.log("판매자 로그인 성공");
                Swal.fire({
                  title: "로그인 성공",
                  icon: "success",
                  confirmButtonColor: "#5e9960",
                }).then(() => {
                  navigate("/storeMain");
                });
              } else if (storeType === 0) {
                // 관리자 로그인
                Swal.fire({
                  title: "로그인 성공",
                  icon: "success",
                  confirmButtonColor: "#5e9960",
                }).then(() => {
                  navigate("/admin/adminMain");
                });
              } // else
              break;
            case 2:
              console.log("존재하지 않는 아이디");
              soEmailRef.current.innerText = "존재하지 않는 아이디입니다.";
              break;
            case 3:
              console.log("틀린 비밀번호");
              soPwRef.current.innerText = "비밀번호를 잘못 입력하셨습니다.";
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [bnMsg, setBnMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

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
    const emailCheck = storeLogin.soEmail.trim();

    if (!emailCheck) {
      Swal.fire({
        title: "이메일을 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return false;
    }

    console.log("이메일 : ", emailCheck);

    axios
      .get(`${backServer}/store/soEmail/${emailCheck}/checkEmail`)
      .then((res) => {
        console.log("응답 : ", res);
        if (res.data) {
          setEmailMsg("사용 가능한 이메일입니다.");
          setIsSoEmailValid(true); // 이메일이 유효하면 true

          setStore({ ...store, soEmail: storeLogin.soEmail });
        } else {
          setEmailMsg("이미 가입한 이메일입니다.");
          setIsSoEmailValid(false); // 이메일이 중복되면 false
        }
      })
      .catch((err) => {
        console.log("에러 : ", err);
      });
  };

  const storePartnership = () => {
    // 이메일이 유효하지 않으면 함수 실행을 중단
    if (!isSoEmailValid) {
      Swal.fire({
        title: "이미 가입한 이메일입니다.",
        icon: "error",
        text: "이메일을 변경해주세요.",
        confirmButtonColor: "#5e9960",
      });
      return; // 이메일이 중복일 경우 함수 실행 중단
    }
    axios
      .post(`${backServer}/store`, store)
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "제휴 신청 완료",
            icon: "success",
            text: "요청 승인까지 약 1~3일 소요됩니다.",
            confirmButtonColor: "#5e9960",
          }).then(() => {
            closeModal();
            navigate("/");
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
                                    value={store.soEmail}
                                    onChange={changeStore}
                                  ></input>
                                  <p
                                    className="storeLogin-p"
                                    ref={soEmailRef}
                                  ></p>
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
                                  <p className="storeLogin-p" ref={soPwRef}></p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="storeLogin-btn-zone">
                          <button
                            type="submit"
                            className="storeLogin-login-btn"
                            onClick={login}
                          >
                            로그인
                          </button>
                        </div>
                        {/*비밀번호 찾기, 비밀번호 변경 */}
                        <>
                          <div className="storeLogin-find">
                            <button
                              className="storeLogin-find-btn"
                              onClick={openPwModal}
                            >
                              비밀번호 변경
                            </button>
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
                                  placeholder="-을 제외한 번호만 입력해주세요."
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
                                  paddingLeft: bnMsg ? "27px" : "0px", // 메시지가 있을 때만 padding
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
                                점주 이름
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
                                  value={storeLogin.soEmail}
                                  onChange={changeStoreLogin}
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
                                  backgroundImage:
                                    emailMsg === "사용 가능한 이메일입니다."
                                      ? `url(${process.env.PUBLIC_URL}/image/icon_check.svg)` // 성공 아이콘
                                      : emailMsg === "이미 가입한 이메일입니다."
                                      ? `url(${process.env.PUBLIC_URL}/image/error.svg)` // 실패 아이콘
                                      : "none", // 메시지가 없을 때는 아이콘 없음
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "left center",
                                  marginLeft: "10px",
                                  paddingLeft: emailMsg ? "27px" : "0px", // 메시지가 있을 때만 padding
                                  color:
                                    emailMsg === "사용 가능한 이메일입니다."
                                      ? "#5e9960" // 성공 시 글씨 색 초록색
                                      : emailMsg === "이미 가입한 이메일입니다."
                                      ? "#D16D6A" // 실패 시 글씨 색 빨간색
                                      : "black", // 기본 글씨 색
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
                          disabled={!isSoEmailValid} // 이메일이 중복이면 버튼 비활성화
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
        {/*storeChangePw 컴포넌트 렌더링 */}
        {isPwModalOpen && (
          <StoreCheckPw
            isPwModalOpen={isPwModalOpen}
            closePwModal={closePwModal}
          />
        )}
      </div>
    </>
  );
};

export default StoreLogin;
