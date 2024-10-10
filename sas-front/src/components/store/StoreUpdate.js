import { useCallback, useEffect, useRef, useState } from "react";
import "./storeUpdate.css";
import Swal from "sweetalert2";
import axios from "axios";
import PostCodeApi from "../utils/PostCodeApi";
import "./modal.css";
import { Link, useNavigate } from "react-router-dom";
import SelectMUI from "../utils/SelectMUI";
import StoreMoodCheckBoxMUI from "../utils/StoreMoodCheckBoxMUI";
import StoreAmenitiesCheckBoxMUI from "../utils/StoreAmenitiesCheckBoxMUI";
import { useRecoilState, useRecoilValue } from "recoil";
import { isStoreLoginState, isStoreUpdateState } from "../utils/RecoilData";
import {
  loginStoreIdState,
  loginStoreNoState,
  storeTypeState,
} from "../utils/RecoilData";

const StoreUpdate = (props) => {
  const setActiveIndex = props.setActiveIndex;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLoginStore = useRecoilValue(isStoreLoginState);
  const [check, setCheck] = useState(false);
  const { loginstoreNo, isEditing, setIsEditing } = props;
  const [store, setStore] = useState({});
  const [storeSeatCapacity, setStoreSeatCapacity] = useState(""); // 좌석 수용 인원 상태
  const [storeSeatAmount, setStoreSeatAmount] = useState(""); // 총 좌석 수 상태
  const [seat, setSeat] = useState({
    seatCapacity: "",
    seatAmount: "",
  });

  useEffect(() => {
    setActiveIndex(1);
    if (store.seatList && store.seatList.length > 0) {
      setStoreSeatCapacity(store.seatList[0].seatCapacity);
      setStoreSeatAmount(store.seatList[0].seatAmount);
    }
  }, [store]);

  // storeSeatCapacity와 storeSeatAmount가 변경되었을 때 seat 상태를 업데이트
  useEffect(() => {
    if (storeSeatCapacity && storeSeatAmount) {
      setSeat({
        seatCapacity: storeSeatCapacity,
        seatAmount: storeSeatAmount,
      });
    }
  }, [storeSeatCapacity, storeSeatAmount]);

  //매장 정보 출력
  useEffect(() => {
    if (isLoginStore) {
      axios
        .get(`${backServer}/store/storeUpdate/${loginstoreNo}`)
        .then((res) => {
          setStore(res.data);
          setCheck(res.data.length);

          if (res.data.storeSiFilepathList) {
            setStoreSiFilepathList(res.data.storeSiFilepathList);
          }
        })
        .catch((err) => {
          //console.log("매장 정보 출력 오류 : ", err);
        });
    }
  }, [loginstoreNo, check, isLoginStore]);

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

  //첨부파일
  const [storeFile, setStoreFile] = useState([]); //사진 저장
  const [storeImage, setStoreImage] = useState([]); //미리보기용
  const [storeSiFilepathList, setStoreSiFilepathList] = useState([]); //저장되어 있던 사진 출력용
  // 기존 첨부파일을 삭제하면 삭제한 파일 번호를 저장할 배열
  const [delStoreFileNo, setDelStoreFileNo] = useState([]);

  //메뉴 썸네일 이미지 첨부파일 변경 시 동작 함수
  const changeStoreThumbnail = (e) => {
    const files = Array.from(e.currentTarget.files);
    let urlList = [];

    if (files.length !== 0) {
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
    }
  };

  // 기존 이미지 삭제
  const removeExistingImage = (indexToRemove, imageId) => {
    setStoreSiFilepathList(
      (prevList) => prevList.filter((_, index) => index !== indexToRemove) // UI에서 삭제
    );
    setDelStoreFileNo((prevIds) => [...prevIds, imageId]); // 삭제할 이미지 ID 저장
  };

  // 새로 추가된 이미지 삭제 함수
  const removeNewImage = (indexToRemove) => {
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

  const [seatList, setSeatList] = useState([{ seatType: "", seatCount: "" }]);

  const changeSeatType = (index, value) => {
    const updatedSeatList = [...seatList];
    updatedSeatList[index].seatType = value;
    setSeatList(updatedSeatList);
  };

  const changeSeatCount = (index, value) => {
    const updatedSeatList = [...seatList];
    updatedSeatList[index].seatCount = value;
    setSeatList(updatedSeatList);
  };

  const addSeatRow = () => {
    setSeatList([...seatList, { seatType: "", seatCount: "" }]);
  };

  const removeSeatRow = (index) => {
    const updatedSeatList = seatList.filter((_, i) => i !== index);
    setSeatList(updatedSeatList);
  };

  //매장 수정
  const storeModify = () => {
    const form = new FormData();

    // 새로 추가된 파일들
    if (storeFile.length > 0) {
      storeFile.forEach((file) => {
        form.append("storeFile", file);
      });
    }

    // 삭제할 파일 번호
    if (delStoreFileNo.length > 0) {
      delStoreFileNo.forEach((fileNo) => {
        form.append("delStoreFileNo", fileNo);
      });
    }

    // 매장 분위기
    for (let i = 0; i < storeMood.length; i++) {
      form.append("storeMood", storeMood[i]);
    }

    // 매장 편의시설
    for (let i = 0; i < storeAmenities.length; i++) {
      form.append("storeAmenities", storeAmenities[i]);
    }

    const promises = [
      // 매장 정보 수정
      axios.patch(`${backServer}/store/storeModify/${loginstoreNo}`, store),

      // 매장 좌석 수정
      axios.patch(`${backServer}/store/updateSeat/${loginstoreNo}`, seat),

      // 매장 사진 수정
      axios.patch(`${backServer}/store/updateStoreImg/${loginstoreNo}`, form, {
        headers: {
          contentType: "multipart/form-data",
        },
      }),

      // 매장 분위기 삭제 및 등록
      axios
        .delete(`${backServer}/store/deleteStoreMood/${loginstoreNo}`)
        .then(() =>
          axios.post(
            `${backServer}/store/updateStoreMood/${loginstoreNo}`,
            form,
            {
              headers: {
                contentType: "multipart/form-data",
                processData: false,
              },
            }
          )
        ),

      // 매장 편의시설 삭제 및 등록
      axios
        .delete(`${backServer}/store/deleteStoreAmenities/${loginstoreNo}`)
        .then(() =>
          axios.post(
            `${backServer}/store/updateStoreAmenities/${loginstoreNo}`,
            form,
            {
              headers: {
                contentType: "multipart/form-data",
                processData: false,
              },
            }
          )
        ),
    ];

    // 모든 요청이 끝난 후 navigate 실행
    Promise.all(promises)
      .then(() => {
        Swal.fire({
          title: "매장 정보 수정 완료.",
          text: "매장 정보가 수정되었습니다.",
          icon: "success",
          confirmButtonColor: "#5e9960",
        }).then(() => {
          setIsEditing(!isEditing); // 매장 수정 후 storeViewMain으로 이동
        });
      })
      .catch((err) => {
        console.error("매장 수정 오류", err);
      });
  };

  // 정규표현식
  const storeNameRegex = /^[가-힣]{1,20}$|^[a-zA-Z0-9\s]{1,40}$/;
  const storePhoneRegex = /^\d{1,3}-\d{3,4}-\d{4}$/;
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

  return (
    <>
      {/* section */}
      <div className="top-section">
        <div className="storeUpdate-info-card">
          <table className="storeUpdate-table">
            <tbody className="storeUpdate-tbody">
              <tr className="storeUpdate-img-tr">
                <th className="storeUpdate-img-th" colSpan={2}>
                  <div className="storeUpdate-imgDiv-zone">
                    {/* 이미지 미리보기 */}
                    {storeSiFilepathList.length > 0 &&
                      storeSiFilepathList.map((image, index) => (
                        <div key={index} className="storeUpdate-imgContainer">
                          <img
                            className="storeUpdate-img"
                            src={`${backServer}/store/${image.siFilepath}`}
                            alt={`Existing Preview ${index}`}
                          />
                          <button
                            className="remove-button"
                            onClick={() => {
                              removeExistingImage(index, image.siFileNo); // siFileNo 전달
                            }}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    {/* 새로 추가된 이미지 미리보기 */}
                    {storeImage.length > 0 &&
                      storeImage.map((image, index) => (
                        <div key={index} className="storeUpdate-imgContainer">
                          <img
                            className="storeUpdate-img"
                            src={image}
                            alt={`New Preview ${index}`}
                          />
                          <button
                            className="remove-button"
                            onClick={() => removeNewImage(index)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="storeUpdate-img-div">
                    <label
                      htmlFor="storeFile"
                      className="storeUpdate-img-label"
                    >
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
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeName" className="storeUpdate-label">
                    매장 상호명
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storeName"
                      name="storeName"
                      value={store.storeName}
                      onChange={changeStore}
                    ></input>
                  </div>
                  <p className="storeUpdate-p" ref={storeNameRef}></p>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storePhone" className="storeUpdate-label">
                    매장 전화번호
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storePhone"
                      name="storePhone"
                      value={store.storePhone}
                      onChange={changeStore}
                    ></input>
                  </div>
                  <p className="storeUpdate-p" ref={storePhoneRef}></p>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeIntroduce" className="storeUpdate-label">
                    매장 소개
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <textarea
                      className="storeUpdate-textarea"
                      id="storeIntroduce"
                      name="storeIntroduce"
                      value={store.storeIntroduce}
                      onChange={changeStore}
                    ></textarea>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeAddr" className="storeUpdate-label">
                    매장 위치
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storeAddr"
                      name="storeAddr"
                      value={store.storeAddr}
                      readOnly
                    ></input>
                  </div>
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storeAddrDetail"
                      name="storeAddrDetail"
                      value={store.storeDetailAddr}
                      onChange={changeStore}
                      placeholder="상세 주소를 입력해주세요."
                    ></input>
                    <button
                      className="storeUpdate-btn"
                      type="button"
                      onClick={toggleHandler}
                    >
                      우편번호 찾기
                    </button>
                  </div>
                  <p className="storeUpdate-p" ref={storeDetailAddrRef}></p>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeTime" className="storeUpdate-label">
                    영업 시간
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storeTime"
                      name="storeTime"
                      value={store.storeTime}
                      onChange={changeStore}
                      placeholder="ex) 09:00 - 22:00"
                    ></input>
                  </div>
                  <p className="storeUpdate-p" ref={storeTimeRef}></p>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeReTime" className="storeUpdate-label">
                    예약 가능 시작 시간
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storeReStart"
                      name="storeReStart"
                      value={store.storeReStart}
                      onChange={changeStore}
                      placeholder="ex) 09:00 "
                    ></input>
                  </div>
                  <p className="storeUpdate-p" ref={storeReTimeRef}></p>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeReTime" className="storeUpdate-label">
                    예약 가능 마감 시간
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storeReEnd"
                      name="storeReEnd"
                      value={store.storeReEnd}
                      onChange={changeStore}
                      placeholder="ex) 22:00 "
                    ></input>
                  </div>
                  <p className="storeUpdate-p" ref={storeReTimeRef}></p>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="breakTime" className="storeUpdate-label">
                    브레이크 타임 시작
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="breakTimeStart"
                      name="breakTimeStart"
                      value={store.breakTimeStart}
                      onChange={changeStore}
                      placeholder="ex) 15:00 "
                    ></input>
                  </div>
                  <p className="storeUpdate-p" ref={breakTimeRef}></p>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="breakTime" className="storeUpdate-label">
                    브레이크 타임 마감
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="breakTimeEnd"
                      name="breakTimeEnd"
                      value={store.breakTimeEnd}
                      onChange={changeStore}
                      placeholder="ex) 17:00 "
                    ></input>
                  </div>
                  <p className="storeUpdate-p" ref={breakTimeRef}></p>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="deposit" className="storeUpdate-label">
                    예약금
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="deposit"
                      name="deposit"
                      value={store.deposit}
                      onChange={changeStore}
                    ></input>
                  </div>
                  <p className="storeUpdate-p" ref={depositRef}></p>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="seatType" className="storeView-label">
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
                              name="seatType"
                              placeholder="ex) 2인용"
                              value={seat.seatType}
                              onChange={(e) =>
                                changeSeatType(index, e.target.value)
                              }
                            />
                          </td>
                          <td className="seat-td">
                            <input
                              className="storeView-inputBox"
                              type="text"
                              name="seatCount"
                              placeholder="ex) 5"
                              value={seat.seatCount}
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
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <SelectMUI
                      value={store.storeClass}
                      onChange={handleChange}
                    />
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeMood" className="storeUpdate-label">
                    매장 분위기
                  </label>
                </th>
                <td>
                  <div className="storeUpdate-div">
                    <StoreMoodCheckBoxMUI setStoreMood={setStoreMood} />
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeAmenities" className="storeUpdate-label">
                    편의 시설
                  </label>
                </th>
                <td>
                  <div className="storeUpdate-div">
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
      <div className="storeUpdate-modifyBtn-zone">
        <button
          type="submit"
          className="storeUpdate-modify-btn"
          onClick={storeModify}
        >
          수정
        </button>
      </div>
    </>
  );
};

export default StoreUpdate;
