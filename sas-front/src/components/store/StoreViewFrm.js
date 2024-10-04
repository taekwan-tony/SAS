import { useCallback, useEffect, useRef, useState } from "react";
import "./storeView.css";
import Swal from "sweetalert2";
import axios from "axios";
import PostCodeApi from "../utils/PostCodeApi";
import "./modal.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import SelectMUI from "../utils/SelectMUI";
import StoreMoodCheckBoxMUI from "../utils/StoreMoodCheckBoxMUI";
import StoreAmenitiesCheckBoxMUI from "../utils/StoreAmenitiesCheckBoxMUI";
import { useRecoilState } from "recoil";
import { loginStoreIdState, storeTypeState } from "../utils/RecoilData";

const StoreViewFrm = (props) => {
  const setActiveIndex = props.setActiveIndex;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginSoEMail, setLoginSoEmail] = useRecoilState(loginStoreIdState);
  const [storeType, setStoreType] = useRecoilState(storeTypeState);
  const [storeNumber, setStoreNumber] = useState(null); // 상태로 관리

  useEffect(() => {
    setActiveIndex(0);
    storeRefreshLogin();
    const interval = window.setInterval(storeRefreshLogin, 60 * 60 * 1000); // 한 시간

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  const storeRefreshLogin = () => {
    const storeRefreshToken = window.localStorage.getItem("storeRefreshToken");
    if (storeRefreshToken != null) {
      axios.defaults.headers.common["Authorization"] = storeRefreshToken;
      axios
        .post(`${backServer}/store/storeRefresh`)
        .then((res) => {
          setLoginSoEmail(res.data.soEmail);
          setStoreType(res.data.storeType);
          console.log("storeNo :", res.data.storeNo); // storeNo 값 출력
          setStoreNumber(res.data.storeNo); // storeNumber 상태 업데이트
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem(
            "storeRefreshToken",
            res.data.refreshToken
          );
        })
        .catch((err) => {
          console.log(err);
          setLoginSoEmail("");
          setStoreType(2);
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("storeRefreshToken");
        });
    }
  };

  const [store, setStore] = useState({
    storeNo: null,
    storeName: "",
    storePhone: "",
    storeAddr: "",
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
    if (storeNumber !== null) {
      setStore((prevStore) => ({
        ...prevStore,
        storeNo: storeNumber, // storeNumber가 바뀔 때 storeNo 업데이트
      }));
      setSeat((prevSeat) => ({
        ...prevSeat,
        storeNo: storeNumber,
      }));
    }
  }, [storeNumber]);

  const [storeMood, setStoreMood] = useState([]);
  const [storeAmenities, setStoreAmenities] = useState([]);

  const [seat, setSeat] = useState({
    storeNo: null,
    seatCapacity: 0,
    seatAmount: 0,
  });

  const changeStore = (e) => {
    const name = e.target.name;
    setStore({ ...store, [name]: e.target.value });
    setSeat({ ...seat, [name]: e.target.value });
  };

  //첨부파일
  const [fileList, setFileList] = useState([]);
  const [storeFile, setStoreFile] = useState([]); // 실제 업로드용 state
  const [showStoreFile, setShowStoreFile] = useState([]); // 매장 사진 URL
  const [delStoreFileNo, setDelStoreFileNo] = useState("");
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

    // 데이터 확인
    console.log("FormData (Store):", store);
    console.log("FormData (Files):", storeFile);
    console.log("FormData (mood):", storeMood);
    console.log("FormData (amenities):", storeAmenities);

    // 매장 정보
    axios.post(`${backServer}/store/insertStore`, store).then((res) => {
      console.log(res.data);
      if (res.data) {
        Swal.fire({
          title: "매장 등록 완료.",
          text: "매장 정보가 등록되었습니다.",
          icon: "success",
          confirmButtonColor: "#5e9960",
        })
          .then(() => {
            navigate("/storeMain");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    // 매장 좌석 수
    axios
      .post(`${backServer}/store/insertSeat`, seat)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          console.log("매장 좌석수 등록 완료");
        }
      })
      .catch((err) => {
        console.log("좌석 에러 :", err);
      });

    // 매장 사진
    axios
      .post(`${backServer}/store/insertStoreImg/${store.storeNo}`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // 매장 분위기
    axios
      .post(`${backServer}/store/insertStoreMood/${store.storeNo}`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        console.log("매장 분위기 등록 완료");
        console.log(res);
      })
      .catch((err) => {
        console.log("매장 분위기 등록 오류");
        console.log(err);
      });

    // 매장 편의시설
    axios
      .post(`${backServer}/store/insertStoreAmenities/${store.storeNo}`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        console.log("매장 편의시설 등록 완료");
        console.log(res);
      })
      .catch((err) => {
        console.log("매장 분위기 등록 오류");
        console.log(err);
      });
  };

  return (
    <div className="storeView-main">
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>MY STORE</h1>
          <Link to="/usermain">
            <button className="button-bell">
              <div className="user-box-bell">
                <div className="user-page-box">
                  <div className="bellWrapper">
                    <i className="fas fa-bell my-bell"></i>
                  </div>

                  <div className="circle first"></div>
                  <div className="circle second"></div>
                  <div className="circle third"></div>
                </div>
              </div>
            </button>
          </Link>
        </header>
      </div>
      <div className="dashboard">
        <div className="owner-background">
          <img src="/image/238.jpg" alt="back" />
        </div>
        {/* section */}
        <div className="top-section">
          <div className="info-card">
            <table className="storeView-table">
              <tbody className="storeView-tbody">
                <tr className="storeView-tr">
                  <th className="storeView-th" colSpan={2}>
                    <div className="storeView-imgDiv-zone">
                      <div className="storeView-img-zone">
                        {/* 이미지 미리보기 */}
                        {storeImage.length > 0 ? (
                          <div className="storeView-imgDiv">
                            {storeImage.map((image, index) => (
                              <div
                                key={index}
                                className="storeView-imgContainer"
                              >
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
                          </div>
                        ) : (
                          <img
                            className="storeView-img"
                            src="/image/s&s로고.png"
                            alt="Default"
                          />
                        )}
                      </div>
                    </div>
                    <div className="storeView-div">
                      <label htmlFor="storeFile" className="storeView-label">
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
                        value={detailAddress}
                        onChange={inputChangeHandler}
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
                      ></input>
                    </div>
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
                      ></input>
                    </div>
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
                      ></input>
                    </div>
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
                      ></input>
                    </div>
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
                  </td>
                </tr>
                <tr className="storeView-tr">
                  <th className="storeView-th">
                    <label htmlFor="seatCapacity" className="storeView-label">
                      좌석 수용 인원
                    </label>
                  </th>
                  <td className="storeView-td">
                    <div className="storeView-div">
                      <input
                        className="storeView-inputBox"
                        type="text"
                        id="seatCapacity"
                        name="seatCapacity"
                        value={seat.seatCapacity}
                        onChange={changeStore}
                      ></input>
                    </div>
                  </td>
                </tr>
                <tr className="storeView-tr">
                  <th className="storeView-th">
                    <label htmlFor="seatAmount" className="storeView-label">
                      총 좌석 수
                    </label>
                  </th>
                  <td className="storeView-td">
                    <div className="storeView-div">
                      <input
                        className="storeView-inputBox"
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
    </div>
  );
};
export default StoreViewFrm;
