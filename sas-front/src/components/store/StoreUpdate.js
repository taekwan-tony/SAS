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
import { isStoreLoginState } from "../utils/RecoilData";
import {
  loginStoreIdState,
  loginStoreNoState,
  storeTypeState,
} from "../utils/RecoilData";

const StoreUpdate = (props) => {
  const setActiveIndex = props.setActiveIndex;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate;
  const isLoginStore = useRecoilValue(isStoreLoginState);
  const [check, setCheck] = useState(false);
  const { loginstoreNo } = props;
  const [store, setStore] = useState({});
  const [storeSeatCapacity, setStoreSeatCapacity] = useState(""); // 좌석 수용 인원 상태
  const [storeSeatAmount, setStoreSeatAmount] = useState(""); // 총 좌석 수 상태
  const [seat, setSeat] = useState({
    seatCapacity: "",
    seatAmount: "",
  });

  // API로부터 데이터 가져오기 (예시)
  useEffect(() => {
    if (store.seatList && store.seatList.length > 0) {
      // store.seatList가 존재하고 배열이 비어 있지 않으면 첫 번째 좌석의 수용 인원 설정
      setStoreSeatCapacity(store.seatList[0].seatCapacity);
      setStoreSeatAmount(store.seatList[0].seatAmount);
      console.log("총 좌석 수 : ", storeSeatAmount);
      console.log("수용 인원 : ", storeSeatCapacity);
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

  console.log("매장 좌석 수 : ", seat);

  //매장 정보 출력
  useEffect(() => {
    if (isLoginStore) {
      axios
        .get(`${backServer}/store/storeUpdate/${loginstoreNo}`)
        .then((res) => {
          console.log("매장 정보 출력 : ", res.data);
          setStore(res.data);
          setCheck(res.data.length);

          if (res.data.storeSiFilepathList) {
            setStoreSiFilepathList(res.data.storeSiFilepathList);
          }
        })
        .catch((err) => {
          console.log("매장 정보 출력 오류 : ", err);
        });
    }
  }, [loginstoreNo, check, isLoginStore]);

  const [storeMood, setStoreMood] = useState([]);
  const [storeAmenities, setStoreAmenities] = useState([]);

  const changeStore = (e) => {
    const name = e.target.name;
    setStore({ ...store, [name]: e.target.value });
    setSeat({ ...seat, [name]: e.target.value });
  };

  //첨부파일
  const [storeFile, setStoreFile] = useState([]); //사진 저장
  const [storeImage, setStoreImage] = useState([]); //미리보기용
  const [storeSiFilepathList, setStoreSiFilepathList] = useState([]); //저장되어 있던 사진 출력용
  const [delStoreFileIds, setDelStoreFileIds] = useState([]); // 삭제할 이미지 ID 목록

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
    setDelStoreFileIds((prevIds) => [...prevIds, imageId]); // 삭제할 이미지 ID 저장
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

  // 주소
  const [detailAddress, setDetailedAddress] = useState("");

  const inputChangeHandler = (event) => {
    setDetailedAddress(event.target.value);
  };

  // 매장 유형 변경 핸들러
  const handleChange = (event) => {
    const { value } = event.target;
    setStore((prevStore) => ({
      ...prevStore, // 기존 store 값 유지
      storeClass: value, // 선택된 값을 storeClass에 저장
    }));
  };

  // 매장 수정
  const storeModify = () => {
    const form = new FormData();

    // 새로 추가된 파일들
    storeFile.forEach((file) => {
      form.append("storeFile", file);
    });

    // 삭제할 파일 ID를 FormData에 추가
    console.log("삭제할 파일 ID들:", delStoreFileIds); // 삭제할 파일 ID 확인

    // 삭제할 파일
    delStoreFileIds.forEach((fileId) => {
      form.append("delStoreFileIds", fileId);
    });

    // 매장 분위기
    for (let i = 0; i < storeMood.length; i++) {
      form.append("storeMood", storeMood[i]);
    }

    // 매장 편의시설
    for (let i = 0; i < storeAmenities.length; i++) {
      form.append("storeAmenities", storeAmenities[i]);
    }

    // 데이터 확인
    console.log("FormData (Store):", store);
    console.log("FormData (Files):", storeFile);
    console.log("FormData (mood):", storeMood);
    console.log("FormData (amenities):", storeAmenities);

    // 매장 정보
    axios
      .patch(`${backServer}/store/storeModify/${loginstoreNo}`, store)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          Swal.fire({
            title: "매장 정보 수정 완료.",
            text: "매장 정보가 수정되었습니다.",
            icon: "success",
            confirmButtonColor: "#5e9960",
          })
            .then(() => {
              navigate("/storeViewMain");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

    // 매장 좌석 수
    axios
      .patch(`${backServer}/store/updateSeat/${loginstoreNo}`, seat)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          console.log("매장 좌석수 수정 완료");
        }
      })
      .catch((err) => {
        console.log("좌석 수정 에러 :", err);
      });

    // 매장 사진
    axios
      .patch(`${backServer}/store/updateStoreImg/${loginstoreNo}`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        console.log("사진 수정 성공", res);
      })
      .catch((err) => {
        console.error("사진 수정 실패", err);
      });

    // 매장 분위기
    axios
      .delete(`${backServer}/store/deleteStoreMood/${loginstoreNo}`)
      .then((res) => {
        console.log(res);
        //성공 시 매장 분위기 새로 등록
        axios
          .post(`${backServer}/store/updateStoreMood/${loginstoreNo}`, form, {
            headers: {
              contentType: "multipart/form-data",
              processData: false,
            },
          })
          .then((res) => {
            console.log("매장 분위기 수정 완료");
            console.log(res);
          })
          .catch((err) => {
            console.log("매장 분위기 수정 오류");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("매장 분위기 삭제 실패 : ", err);
      });

    // 매장 편의시설
    axios
      .delete(`${backServer}/store/deleteStoreAmenities/${loginstoreNo}`)
      .then((res) => {
        console.log(res);
        //성공 시 매장 편의시설 새로 등록
        axios
          .post(
            `${backServer}/store/updateStoreAmenities/${loginstoreNo}`,
            form,
            {
              headers: {
                contentType: "multipart/form-data",
                processData: false,
              },
            }
          )
          .then((res) => {
            console.log("매장 편의시설 수정 완료");
            console.log(res);
          })
          .catch((err) => {
            console.log("매장 편의시설 수정 오류");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="storeUpdate-main">
      {/* section */}
      <div className="top-section">
        <div className="info-card">
          <table className="storeUpdate-table">
            <tbody className="storeUpdate-tbody">
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th" colSpan={2}>
                  <div className="storeUpdate-imgDiv-zone">
                    <div className="storeUpdate-img-zone">
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
                              onClick={() => removeExistingImage(index)}
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
                  </div>
                  <div className="storeUpdate-div">
                    <label htmlFor="storeFile" className="storeUpdate-label">
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
                <td>
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
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storePhone" className="storeUpdate-label">
                    매장 전화번호
                  </label>
                </th>
                <td>
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
                <td>
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
                      value={detailAddress}
                      onChange={inputChangeHandler}
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
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeTime" className="storeUpdate-label">
                    영업 시간
                  </label>
                </th>
                <td>
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
                    ></input>
                  </div>
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
                    ></input>
                  </div>
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
                    ></input>
                  </div>
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
                    ></input>
                  </div>
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
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="seatCapacity" className="storeUpdate-label">
                    좌석 수용 인원
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="seatCapacity"
                      name="seatCapacity"
                      value={seat.seatCapacity}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="seatAmount" className="storeUpdate-label">
                    총 좌석 수
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="seatAmount"
                      name="seatAmount"
                      value={seat.seatAmount}
                      onChange={changeStore}
                    ></input>
                  </div>
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
    </div>
  );
};
export default StoreUpdate;
