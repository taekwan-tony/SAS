import { useCallback, useEffect, useRef, useState } from "react";
import "./storeView.css";
import Swal from "sweetalert2";
import axios from "axios";
import PostCodeApi from "../utils/PostCodeApi";
import "./modal.css";
import { Link, useNavigate } from "react-router-dom";
import SelectMUI from "../utils/SelectMUI";
import StoreMoodCheckBoxMUI from "../utils/StoreMoodCheckBoxMUI";
import StoreAmenitiesCheckBoxMUI from "../utils/StoreAmenitiesCheckBoxMUI";
import { useRecoilState } from "recoil";
import {
  isStoreLoginState,
  loginStoreIdState,
  loginStoreNoState,
  soNameState,
  soPhoneState,
  storeAddrState,
  storeTypeState,
  storeNameState,
  loginStoreNameState,
} from "../utils/RecoilData";

const StoreViewFrm = (props) => {
  const setActiveIndex = props.setActiveIndex;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginSoEMail, setLoginSoEmail] = useRecoilState(loginStoreIdState);
  const [storeType, setStoreType] = useRecoilState(storeTypeState);
  const [loginstoreNo, setLoginStoreNo] = useRecoilState(loginStoreNoState); // 점주 매장 번호
  const [storeAddr, setStoreAddr] = useRecoilState(storeAddrState); //매장 주소
  const [soPhone, setSoPhone] = useRecoilState(soPhoneState); //점주 전화번호
  const [soName, setSoName] = useRecoilState(soNameState); //점주 이름
  const [storeNumber, setStoreNumber] = useState(null); // 상태로 관리
  const [storeName, setStoreName] = useRecoilState(loginStoreNameState);
  // const { loginstoreNo } = props;
  // //const [store, setStore] = useState({});

  const [store, setStore] = useState({
    storeNo: "",
    storeName: "",
    storePhone: "",
    storeAddr: "",
    StoreDetailAddr: "",
    storeTime: "",
    storeClass: "",
    storeReStart: "",
    storeReEnd: "",
    breakTimeStart: "",
    breakTimeEnd: "",
    deposit: "",
    storeIntroduce: "",
    mapX: "",
    mapY: "",
  });

  // storeNumber가 업데이트될 때마다 실행
  useEffect(() => {
    setActiveIndex(1);
    if (storeNumber !== null) {
      setStore((prevStore) => ({
        ...prevStore,
        storeNo: storeNumber, // storeNumber가 바뀔 때 storeNo 업데이트
      }));
    }
  }, [storeNumber]);

  useEffect(() => {
    if (storeName) {
      console.log("매장 이름:", storeName);
    }
  }, [storeName]);

  const [storeMood, setStoreMood] = useState([]);
  const [storeAmenities, setStoreAmenities] = useState([]);

  const changeStore = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setStore({ ...store, [name]: value });

    // 검증
    if (name === "storeName" && !storeNameRegex.test(value)) {
      if (storeNameRef.current) {
        storeNameRef.current.innerText =
          "한글 20자, 영문 40자 이하로 입력해주세요.";
      }
    } else if (storeNameRef.current) {
      storeNameRef.current.innerText = "";
    }

    if (name === "storePhone" && !storePhoneRegex.test(value)) {
      if (storePhoneRef.current) {
        storePhoneRef.current.innerText = "-을 포함해서 입력해주세요.";
      }
    } else if (storePhoneRef.current) {
      storePhoneRef.current.innerText = "";
    }

    if (name === "storeDetailAddr" && !storeDetailAddrRegex.test(value)) {
      if (storeDetailAddrRef.current) {
        storeDetailAddrRef.current.innerText = "50자 이하로 입력해주세요.";
      }
    } else if (storeDetailAddrRef.current) {
      storeDetailAddrRef.current.innerText = "";
    }

    if (name === "deposit" && !depositRegex.test(value)) {
      if (depositRef.current) {
        depositRef.current.innerText = "숫자만 입력해주세요.";
      }
    } else if (depositRef.current) {
      depositRef.current.innerText = "";
    }

    if (name === "seatCapacity" && !seatRegex.test(value)) {
      if (seatRef.current) {
        seatRef.current.innerText = "99 이하의 숫자만 입력해주세요.";
      }
    } else if (seatRef.current) {
      seatRef.current.innerText = "";
    }

    if (name === "seatAmount" && !seatRegex.test(value)) {
      if (seatRef.current) {
        seatRef.current.innerText = "99 이하의 숫자만 입력해주세요.";
      }
    } else if (seatRef.current) {
      seatRef.current.innerText = "";
    }
  };

  // 정규표현식
  const storeNameRegex = /^[가-힣\s]{1,20}$|^[a-zA-Z0-9\s]{1,40}$/;
  const storePhoneRegex = /^\d{1,4}-\d{3,4}-\d{4}$/;
  const storeDetailAddrRegex = /^.{1,50}$/;
  const depositRegex = /^(100000|[1-9][0-9]{0,4}|0)$/;
  const seatRegex = /^(99|[1-8]?[0-9])$/;

  const storeNameRef = useRef(null);
  const storePhoneRef = useRef(null);
  const storeDetailAddrRef = useRef(null);
  const storeTimeRef = useRef(null);
  const storeReTimeRef = useRef(null);
  const breakTimeRef = useRef(null);
  const depositRef = useRef(null);
  const seatRef = useRef(null);

  //첨부파일
  const [storeFile, setStoreFile] = useState([]); // 실제 업로드용 state
  const [storeThumbnail, setStoreThumbnail] = useState(null);
  const [storeImage, setStoreImage] = useState([]); // 미리보기용

  //메뉴 썸네일 이미지 첨부파일 변경 시 동작 함수
  const changeStoreThumbnail = (e) => {
    const files = Array.from(e.currentTarget.files);
    let urlList = [];

    if (files.length !== 0) {
      setStoreThumbnail(files[0]);

      // 파일을 state에 저장
      setStoreFile((prevFiles) => [...prevFiles, ...files]);

      // 미리보기
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          urlList.push(reader.result);
          if (urlList.length === files.length) {
            setStoreImage((prevImages) => [...prevImages, ...urlList]);
          }
        };
      });
    } else {
      setStoreThumbnail(null);
      setStoreImage([]);
      setStoreFile([]);
    }
  };

  // 이미지 삭제
  const removeImage = (indexToRemove) => {
    // storeImage와 storeFile 둘 다 삭제
    setStoreImage((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setStoreFile((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleHandler = () => {
    setIsModalOpen((prevOpenState) => !prevOpenState);
  };

  // 매장 유형 변경 핸들러
  const handleChange = (event) => {
    const { value } = event.target;
    setStore((prevStore) => ({
      ...prevStore, // 기존 store 값 유지
      storeClass: value, // 선택된 값을 storeClass에 저장
    }));
  };

  const [seatList, setSeatList] = useState([
    { seatCapacity: "", seatAmount: "" },
  ]);

  const changeSeatType = (index, value) => {
    const updatedSeatList = [...seatList];
    updatedSeatList[index].seatCapacity = value;
    setSeatList(updatedSeatList);
  };

  const changeSeatCount = (index, value) => {
    const updatedSeatList = [...seatList];
    updatedSeatList[index].seatAmount = value;
    setSeatList(updatedSeatList);
  };

  const addSeatRow = () => {
    setSeatList([...seatList, { seatCapacity: "", seatAmount: "" }]);
  };

  const removeSeatRow = (index) => {
    const updatedSeatList = seatList.filter((_, i) => i !== index);
    setSeatList(updatedSeatList);
  };

  // 매장 등록
  const storeModify = () => {
    const form = new FormData();

    // 파일 추가
    storeFile.forEach((file) => {
      form.append("storeFile", file);
    });

    // 매장 분위기
    for (let i = 0; i < storeMood.length; i++) {
      form.append("storeMood", storeMood[i]);
    }

    // 매장 편의시설
    for (let i = 0; i < storeAmenities.length; i++) {
      form.append("storeAmenities", storeAmenities[i]);
    }
    // 매장 정보
    axios
      .post(`${backServer}/store/insertStoreFrm/${loginstoreNo}`, store)
      .then((res) => {
        if (res.data) {
          axios
            .get(`${backServer}/store/storeRegist/${loginstoreNo}`)
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
              setLoginSoEmail(res.data.soEmail);
              setStoreType(res.data.storeType);
              setLoginStoreNo(res.data.storeNo);
              setStoreName(res.data.storeName); // 점주 이름 저장

              axios.defaults.headers.common["Authorization"] =
                res.data.accessToken;
              window.localStorage.setItem(
                "storeRefreshToken",
                res.data.refreshToken
              );
            });
          console.log("데이터 : ", res);
          Swal.fire({
            title: "매장 등록 완료.",
            text: "매장 정보가 등록되었습니다.",
            icon: "success",
            confirmButtonColor: "#5e9960",
          })
            .then(() => {
              console.log(store.storeNo);

              navigate("/storeMain");
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {
        console.log("매장 정보 등록 에러 : ", err);
      });

    // 매장 좌석 정보 등록
    axios
      .post(`${backServer}/store/insertSeatList/${loginstoreNo}`, seatList) // seatList를 서버로 전송
      .then((res) => {
        if (res.data) {
          // 좌석 정보 등록 성공 시 처리
        }
      })
      .catch((err) => {
        console.log("좌석 등록 에러 : ", err);
      });

    // 매장 사진
    axios
      .post(`${backServer}/store/insertStoreImg/${loginstoreNo}`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log("매장 사진 등록 에러 : ", err);
      });

    // 매장 분위기
    axios
      .post(`${backServer}/store/insertStoreMood/${loginstoreNo}`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {})
      .catch((err) => {});

    // 매장 편의시설
    axios
      .post(`${backServer}/store/insertStoreAmenities/${loginstoreNo}`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <>
      {/* section */}
      <div className="top-section">
        <div className="storeView-info-card">
          <table className="storeView-table">
            <tbody className="storeView-tbody">
              <tr className="storeView-img-tr">
                <th className="storeView-img-th" colSpan={2}>
                  <div className="storeView-imgDiv-zone">
                    {/* 이미지 미리보기 */}
                    {storeImage.length > 0 ? (
                      <>
                        {storeImage.map((image, index) => (
                          <div key={index} className="storeView-imgContainer">
                            <img
                              key={index}
                              className="storeView-img"
                              src={image}
                              alt={`Preview ${index}`}
                            />
                            <button
                              className="remove-button"
                              onClick={() => removeImage(index)}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </>
                    ) : (
                      <img
                        className="storeView-img"
                        src="/image/s&s로고.png"
                        alt="Default"
                      />
                    )}
                  </div>
                  <div className="storeView-img-div">
                    <label htmlFor="storeFile" className="storeView-img-label">
                      파일 선택
                    </label>
                    <input
                      type="file"
                      id="storeFile"
                      onChange={changeStoreThumbnail}
                      multiple
                      accept="image/*"
                      style={{ display: "none" }} //input 숨김
                    ></input>
                  </div>
                </th>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeName" className="storeView-label">
                    매장 상호명
                  </label>
                </th>
                <td>
                  <div className="storeView-div">
                    <input
                      className="storeView-inputBox"
                      type="text"
                      id="storeName"
                      name="storeName"
                      value={store.storeName}
                      onChange={changeStore}
                    ></input>
                  </div>
                  <p className="storeViewFrm-p" ref={storeNameRef}></p>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storePhone" className="storeView-label">
                    매장 전화번호
                  </label>
                </th>
                <td>
                  <div className="storeView-div">
                    <input
                      className="storeView-inputBox"
                      type="text"
                      id="storePhone"
                      name="storePhone"
                      value={store.storePhone}
                      onChange={changeStore}
                    ></input>
                  </div>
                  <p className="storeViewFrm-p" ref={storePhoneRef}></p>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeIntroduce" className="storeView-label">
                    매장 소개
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">
                    <textarea
                      className="storeView-textarea"
                      id="storeIntroduce"
                      name="storeIntroduce"
                      value={store.storeIntroduce}
                      onChange={changeStore}
                    ></textarea>
                  </div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeAddr" className="storeView-label">
                    매장 위치
                  </label>
                </th>
                <td>
                  <div className="storeView-div">
                    <input
                      className="storeView-inputBox"
                      type="text"
                      id="storeAddr"
                      name="storeAddr"
                      value={store.storeAddr}
                      readOnly
                    ></input>
                  </div>
                  <div className="storeView-div">
                    <input
                      className="storeView-inputBox"
                      type="text"
                      id="storeAddrDetail"
                      name="storeAddrDetail"
                      value={store.storeDetailAddr}
                      onChange={changeStore}
                      placeholder="상세 주소를 입력해주세요."
                    ></input>
                    <button
                      className="storeView-btn"
                      type="button"
                      onClick={toggleHandler}
                    >
                      우편번호 찾기
                    </button>
                  </div>
                  <p className="storeViewFrm-p" ref={storeDetailAddrRef}></p>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeTime" className="storeView-label">
                    영업 시간
                  </label>
                </th>
                <td>
                  <div className="storeView-div">
                    <input
                      className="storeView-inputBox"
                      type="text"
                      id="storeTime"
                      name="storeTime"
                      value={store.storeTime}
                      onChange={changeStore}
                      placeholder="ex) 09:00 - 22:00"
                    ></input>
                  </div>
                  <p className="storeViewFrm-p" ref={storeTimeRef}></p>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeReTime" className="storeView-label">
                    예약 가능 시작 시간
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">
                    <input
                      className="storeView-inputBox"
                      type="text"
                      id="storeReStart"
                      name="storeReStart"
                      value={store.storeReStart}
                      onChange={changeStore}
                      placeholder="ex) 09:00 "
                    ></input>
                  </div>
                  <p className="storeViewFrm-p" ref={storeReTimeRef}></p>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeReTime" className="storeView-label">
                    예약 가능 마감 시간
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">
                    <input
                      className="storeView-inputBox"
                      type="text"
                      id="storeReEnd"
                      name="storeReEnd"
                      value={store.storeReEnd}
                      onChange={changeStore}
                      placeholder="ex) 22:00 "
                    ></input>
                  </div>
                  <p className="storeViewFrm-p" ref={storeReTimeRef}></p>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="breakTime" className="storeView-label">
                    브레이크 타임 시작
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">
                    <input
                      className="storeView-inputBox"
                      type="text"
                      id="breakTimeStart"
                      name="breakTimeStart"
                      value={store.breakTimeStart}
                      onChange={changeStore}
                      placeholder="ex) 15:00 "
                    ></input>
                  </div>
                  <p className="storeViewFrm-p" ref={breakTimeRef}></p>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="breakTime" className="storeView-label">
                    브레이크 타임 마감
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">
                    <input
                      className="storeView-inputBox"
                      type="text"
                      id="breakTimeEnd"
                      name="breakTimeEnd"
                      value={store.breakTimeEnd}
                      onChange={changeStore}
                      placeholder="ex) 17:00 "
                    ></input>
                  </div>
                  <p className="storeViewFrm-p" ref={breakTimeRef}></p>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="deposit" className="storeView-label">
                    예약금
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">
                    <input
                      className="storeView-inputBox"
                      type="text"
                      id="deposit"
                      name="deposit"
                      value={store.deposit}
                      onChange={changeStore}
                    ></input>
                  </div>
                  <p className="storeViewFrm-p" ref={depositRef}></p>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="seatCapacity" className="storeView-label">
                    좌석
                  </label>
                </th>
                <td className="storeView-td">
                  <table className="seatTable">
                    <thead>
                      <tr className="seat-tr">
                        <th className="seat-th">좌석 유형</th>
                        <th className="seat-th">좌석 수</th>
                        <th className="seat-th">삭제</th>
                        <th className="seat-th">
                          {" "}
                          <button className="seat-btn" onClick={addSeatRow}>
                            + 좌석 추가
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {seatList.map((seat, index) => (
                        <tr key={index}>
                          <td className="seat-td">
                            <input
                              className="storeView-inputBox"
                              type="text"
                              name="seatCapacity"
                              placeholder="ex) 2인용"
                              value={seat.seatCapacity}
                              onChange={(e) =>
                                changeSeatType(index, e.target.value)
                              }
                            />
                          </td>
                          <td className="seat-td">
                            <input
                              className="storeView-inputBox"
                              type="text"
                              name="seatAmount"
                              placeholder="ex) 5"
                              value={seat.seatAmount}
                              onChange={(e) =>
                                changeSeatCount(index, e.target.value)
                              }
                            />
                          </td>
                          <td className="seat-td">
                            <button
                              className="seat-remove-button"
                              onClick={() => removeSeatRow(index)}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr className="storePartnership-tr">
                <th className="storePartnership-th">
                  <label
                    htmlFor="storeClass"
                    className="storePartnership-label"
                  >
                    매장 유형
                  </label>
                </th>
                <td>
                  <div className="storePartnership-div">
                    <SelectMUI
                      value={store.storeClass}
                      onChange={handleChange}
                    />
                  </div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeMood" className="storeView-label">
                    매장 분위기
                  </label>
                </th>
                <td>
                  <div className="storeView-div">
                    <StoreMoodCheckBoxMUI setStoreMood={setStoreMood} />
                  </div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeAmenities" className="storeView-label">
                    편의 시설
                  </label>
                </th>
                <td>
                  <div className="storeView-div">
                    <StoreAmenitiesCheckBoxMUI
                      setStoreAmenities={setStoreAmenities}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* PostCodeApi 모달을 상태에 따라 열고 닫기 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <PostCodeApi setStore={setStore} setIsModalOpen={setIsModalOpen} />
            <button className="modal-close" onClick={toggleHandler}>
              닫기
            </button>
          </div>
        </div>
      )}
      <div className="storeView-modifyBtn-zone">
        <button
          type="submit"
          className="storeView-modify-btn"
          onClick={storeModify}
        >
          등록
        </button>
      </div>
    </>
  );
};
export default StoreViewFrm;
