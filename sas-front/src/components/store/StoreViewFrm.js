import { useRef, useState } from "react";
import "./storeView.css";
import Swal from "sweetalert2";
import axios from "axios";
import PostCodeApi from "../utils/PostCodeApi";
import "./modal.css";
import { useNavigate } from "react-router-dom";
import StoreMoodCheckBoxMUI from "../utils/StoreMoodCheckBoxMUI";
import StoreAmenitiesCheckBoxMUI from "../utils/StoreAmenitiesCheckBoxMUI";

const StoreViewFrm = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  const [store, setStore] = useState({
    storeName: "",
    storePhone: "",
    storeAddr: "",
    storeTime: "",
    storeClass: "",
    storeReStart: "",
    breakTimeStart: "",
    deposit: "",
  });

  const [storeMood, setStoreMood] = useState("");
  const [storeAmenities, setStoreAmenities] = useState("");

  const [storeThumb, setStoreThumb] = useState("");

  const storeImgRef = useRef(null);

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
    setStoreMood({ ...storeMood, [name]: e.target.value });
    setStoreAmenities({ ...storeAmenities, [name]: e.target.value });
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

  const storeModify = () => {
    axios
      .get(`${backServer}/store`, store)
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            title: "수정 완료",
            icon: "success",
            text: "매장 정보가 수정되었습니다.",
            confirmButtonColor: "#5e9960",
          }).then(() => {
            //navigate("/storeMain");
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                    <div className="storePartnership-btn-zone">
                      <button
                        className="storePartnership-storeImg-btn"
                        onClick={storeThumbnail}
                      >
                        매장 사진 수정
                      </button>
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
                    <label htmlFor="storeNews" className="storeView-label">
                      매장 소식
                    </label>
                  </th>
                  <td className="storeView-td">
                    <div className="storeView-div">
                      <textarea className="storeView-textarea"></textarea>
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
                      예약 가능 시간
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
                    <label htmlFor="breakTime" className="storeView-label">
                      브레이크 타임
                    </label>
                  </th>
                  <td className="storeView-td">
                    <div className="storeView-div">
                      <input
                        className="storeView-inputBox"
                        type="text"
                        id="breakTime"
                        name="breakTime"
                        value={store.breakTimeStart}
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
                    <label htmlFor="storeMood" className="storeView-label">
                      매장 분위기
                    </label>
                  </th>
                  <td>
                    <div className="storeView-div">
                      <StoreMoodCheckBoxMUI value={storeMood} />
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
                      <StoreAmenitiesCheckBoxMUI value={storeAmenities} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="storeView-modifyBtn-zone">
        <button
          type="submit"
          className="storeView-modify-btn"
          onClick={storeModify}
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default StoreViewFrm;
