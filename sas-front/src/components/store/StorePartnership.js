import { useRef, useState } from "react";
import "./storePartnership.css";
import Swal from "sweetalert2";
import axios from "axios";
import PostCodeApi from "../utils/PostCodeApi";
import "./modal.css";
import SelectMUI from "../utils/SelectMUI";
import { Link, useNavigate } from "react-router-dom";

const StorePartnership = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [store, setStore] = useState({
    storeName: "",
    storePhone: "",
    storeAddr: "",
    storeTime: "",
    storeClass: "",
  });

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

  const storeRegist = () => {
    axios
      .get(`${backServer}/store`, store)
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            title: "등록 완료",
            icon: "success",
            text: "매장이 등록되었습니다.",
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
    <div className="storePartnership-main">
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>매장 등록</h1>
          <Link to="/storecheck/storeNoticeList">
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
            <div className="info-header">
              <h3 className="info-header-h3"></h3>
            </div>

            <table className="storePartnership-table">
              <tbody className="storePartnership-tbody">
                <tr className="storePartnership-tr">
                  <th className="storePartnership-th" colSpan={2}>
                    <div className="storePartnership-imgdiv-zone">
                      <div className="storePartnership-imgDiv">
                        {storeImage ? (
                          <img
                            className="storePartnership-img"
                            src={storeImage}
                          />
                        ) : (
                          <img
                            className="storePartnership-img"
                            src="/image/s&s로고.png"
                          />
                        )}
                      </div>
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
                <tr className="storePartnership-tr">
                  <th className="storePartnership-th">
                    <label
                      htmlFor="businessNumber"
                      className="storePartnership-label"
                    >
                      사업자등록번호
                    </label>
                  </th>
                  <td>
                    <div className="storePartnership-div">
                      <input
                        className="storePartnership-inputBox"
                        type="text"
                        id="businessNumber"
                        name="businessNumber"
                        value={store.businessNumber}
                        onChange={changeStore}
                      ></input>
                    </div>
                  </td>
                </tr>
                <tr className="storePartnership-tr">
                  <th className="storePartnership-th">
                    <label
                      htmlFor="storeName"
                      className="storePartnership-label"
                    >
                      매장 상호명
                    </label>
                  </th>
                  <td>
                    <div className="storePartnership-div">
                      <input
                        className="storePartnership-inputBox"
                        type="text"
                        id="storeName"
                        name="storeName"
                        value={store.storeName}
                        onChange={changeStore}
                      ></input>
                    </div>
                  </td>
                </tr>
                <tr className="storePartnership-tr">
                  <th className="storePartnership-th">
                    <label
                      htmlFor="storePhone"
                      className="storePartnership-label"
                    >
                      매장 전화번호
                    </label>
                  </th>
                  <td>
                    <div className="storePartnership-div">
                      <input
                        className="storePartnership-inputBox"
                        type="text"
                        id="storePhone"
                        name="storePhone"
                        value={store.storePhone}
                        onChange={changeStore}
                      ></input>
                    </div>
                  </td>
                </tr>
                <tr className="storePartnership-tr">
                  <th className="storePartnership-th">
                    <label
                      htmlFor="storeAddr"
                      className="storePartnership-label"
                    >
                      매장 위치
                    </label>
                  </th>
                  <td>
                    <div className="storePartnership-div">
                      <input
                        className="storePartnership-inputBox"
                        type="text"
                        id="storeAddr"
                        name="storeAddr"
                        value={store.storeAddr}
                        readOnly
                      ></input>
                    </div>
                    <div className="storePartnership-div">
                      <input
                        className="storePartnership-inputBox"
                        type="text"
                        id="storeAddrDetail"
                        name="storeAddrDetail"
                        value={detailAddress}
                        onChange={inputChangeHandler}
                        placeholder="상세 주소를 입력해주세요."
                      ></input>
                      <button
                        className="storePartnership-btn"
                        type="button"
                        onClick={toggleHandler}
                      >
                        우편번호 찾기
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="storePartnership-tr">
                  <th className="storePartnership-th">
                    <label
                      htmlFor="storeTime"
                      className="storePartnership-label"
                    >
                      영업 시간
                    </label>
                  </th>
                  <td>
                    <div className="storePartnership-div">
                      <input
                        className="storePartnership-inputBox"
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
      <div className="storePartnership-btn-zone">
        <button
          type="submit"
          className="store-regist-btn"
          onClick={storeRegist}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default StorePartnership;
