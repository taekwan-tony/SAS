import { useEffect, useRef, useState } from "react";
import "./storeView.css";
import Swal from "sweetalert2";
import axios from "axios";
import PostCodeApi from "../utils/PostCodeApi";
import "./modal.css";
import { useNavigate, useParams } from "react-router-dom";
import SelectMUI from "../utils/SelectMUI";
import StoreMoodCheckBoxMUI from "../utils/StoreMoodCheckBoxMUI";
import StoreAmenitiesCheckBoxMUI from "../utils/StoreAmenitiesCheckBoxMUI";
import { useRecoilState } from "recoil";
import { loginStoreIdState, storeTypeState } from "../utils/RecoilData";

const StoreViewFrm = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginSoEMail, setLoginSoEmail] = useRecoilState(loginStoreIdState);
  const [storeType, setStoreType] = useRecoilState(storeTypeState);
  const [storeNumber, setStoreNumber] = useState(null); // 상태로 관리

  useEffect(() => {
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
    soName: "",
    storeName: "",
    storePhone: "",
    storeAddr: "",
    storeTime: "",
    //storeClass: "",
    storeReStart: "",
    storeReEnd: "",
    breakTimeStart: "",
    breakTimeEnd: "",
    deposit: "",
    storeIntroduce: "",
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

  const [storeMood, setStoreMood] = useState("");
  const [storeAmenities, setStoreAmenities] = useState("");

  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [seat, setSeat] = useState({
    storeNo: null,
    seatCapacity: 0,
    seatAmount: 0,
  });

  const [storeThumb, setStoreThumb] = useState("");

  const storeImgRef = useRef(null);

  //첨부파일
  const [fileList, setFileList] = useState([]);
  const [storeFile, setStoreFile] = useState([]);
  const [showStoreFile, setShowStoreFile] = useState([]);
  const [delStoreFileNo, setDelStoreFileNo] = useState("");

  const addStoreFile = (e) => {
    const files = e.currentTarget.files;
    const fileArr = new Array();
    const filenameArr = new Array();

    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
      filenameArr.push(files[i].name);
    }

    setStoreFile([...storeFile, ...fileArr]);
    setShowStoreFile([...showStoreFile, ...filenameArr]);

    console.log("선택한 파일 :", fileArr); // 디버깅용 로그 추가
  };

  //미리보기
  const [storeImage, setStoreImage] = useState(null);

  //이미지 첨부파일 변경 시 동작 함수
  const changeStoreThumbnail = (e) => {
    const files = e.currentTarget.files;

    if (files.length !== 0 && files[0] !== 0) {
      //파일 객체 값 저장
      setStoreThumb(files[0]);

      //화면에서 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setStoreImage(reader.result);
      };
    } else {
      setStoreThumb(null);
      setStoreImage(null);
    }
  };

  const changeStore = (e) => {
    const name = e.target.name;
    setStore({ ...store, [name]: e.target.value });
    setSeat({ ...seat, [name]: e.target.value });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleHandler = () => {
    setIsModalOpen((prevOpenState) => !prevOpenState);
  };

  const [detailAddress, setDetailedAddress] = useState("");

  const inputChangeHandler = (event) => {
    setDetailedAddress(event.target.value);
  };

  // 매장 유형 변경 핸들러
  const handleChange = (event) => {
    setStore({ ...store, storeClass: event.target.value });
  };

  const handleMoodChange = (event) => {
    const value = event.target.value;
    setSelectedMoods((prevSelectedMoods) => {
      // 이미 선택된 분위기라면 제거하고, 그렇지 않다면 추가
      if (prevSelectedMoods.includes(value)) {
        return prevSelectedMoods.filter((mood) => mood !== value);
      } else {
        return [...prevSelectedMoods, value];
      }
    });
  };

  const handleAmenitiesChange = (event) => {
    const value = event.target.value;
    setSelectedAmenities((prevSelectedAmenities) => {
      // 이미 선택된 편의시설이면 제거하고, 그렇지 않으면 추가
      if (prevSelectedAmenities.includes(value)) {
        return prevSelectedAmenities.filter((amenity) => amenity !== value);
      } else {
        return [...prevSelectedAmenities, value];
      }
    });
  };

  const storeModify = () => {
    const formData = new FormData();

    // store 객체를 문자열로 변환해서 추가
    formData.append("store", JSON.stringify(store));

    // 선택된 파일들을 추가
    storeFile.forEach((file) => {
      formData.append("storeFile", file);
    });

    // 분위기와 편의시설 데이터를 배열로 추가
    selectedMoods.forEach((mood) => {
      formData.append("storeMood", mood); // 배열의 각 요소를 별도로 추가
    });

    selectedAmenities.forEach((amenity) => {
      formData.append("storeAmenities", amenity); // 배열의 각 요소를 별도로 추가
    });

    // 데이터가 올바르게 들어가 있는지 콘솔로 확인
    console.log("FormData (Store):", store);
    console.log("FormData (Files):", storeFile);
    console.log("FormData (Mood):", selectedMoods);
    console.log("FormData (Amenities):", selectedAmenities);

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
  };

  const storeThumbnail = () => {
    axios
      .post(`${backServer}/store`, storeThumb)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="storeView-main">
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>MY STORE</h1>
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
                      <div className="storeView-imgDiv">
                        <img
                          className="storeView-img"
                          src="/image/s&s로고.png"
                        ></img>
                      </div>
                    </div>
                    <div className="storeView-div">
                      <label htmlFor="storeFile" className="storeView-label">
                        파일 선택
                      </label>
                      <input
                        type="file"
                        id="storeFile"
                        onChange={addStoreFile}
                        multiple
                      ></input>
                    </div>
                    <div className="storeView-div">
                      <label
                        htmlFor="storeFileList"
                        className="storeView-label"
                      >
                        파일 목록
                      </label>
                      {fileList
                        ? fileList.map((storeFile, i) => {
                            const deleteFile = () => {
                              const newFileList = fileList.filter((item) => {
                                return item !== storeFile;
                              });
                              setFileList(newFileList);

                              setDelStoreFileNo([
                                ...delStoreFileNo,
                                storeFile.storeFileNo,
                              ]);
                            };

                            return (
                              <p key={"oldFile-" + i}>
                                <span className="filename">
                                  {storeFile.filename}
                                </span>
                                <span
                                  className="material-icons del-file-icon"
                                  onClick={deleteFile}
                                >
                                  delete
                                </span>
                              </p>
                            );
                          })
                        : ""}

                      {showStoreFile.map((filename, i) => {
                        const deleteFile = () => {
                          storeFile.splice(i, 1);
                          setStoreFile([...storeFile]);
                          showStoreFile.splice(i, 1);
                          setShowStoreFile([...showStoreFile]);
                        };

                        return (
                          <p key={"newFile-" + i}>
                            <span className="filename">{filename}</span>
                            <span
                              className="material-icons del-file-icon"
                              onClick={deleteFile}
                            >
                              delete
                            </span>
                          </p>
                        );
                      })}
                    </div>
                    <div className="storePartnership-btn-zone">
                      <button
                        className="storePartnership-storeImg-btn"
                        onClick={storeThumbnail}
                      >
                        매장 사진 등록
                      </button>
                    </div>
                  </th>
                </tr>
                <tr className="storeView-tr">
                  <th className="storeView-th">
                    <label htmlFor="soName" className="storeView-label">
                      점주 이름
                    </label>
                  </th>
                  <td>
                    <div className="storeView-div">
                      <input
                        className="storeView-inputBox"
                        type="text"
                        id="soName"
                        name="soName"
                        value={store.soName}
                        onChange={changeStore}
                      ></input>
                    </div>
                  </td>
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
                    <label htmlFor="storeNews" className="storeView-label">
                      매장 소식
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
                      <StoreMoodCheckBoxMUI
                        selectedMoods={selectedMoods} // 부모 상태를 전달
                        onMoodChange={handleMoodChange} // 부모 핸들러를 전달
                      />
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
                        value={storeAmenities}
                        onAmenitiesChange={handleAmenitiesChange}
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
