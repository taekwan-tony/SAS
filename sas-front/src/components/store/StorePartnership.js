import { useRef, useState } from "react";
import "./storePartnership.css";
import Swal from "sweetalert2";
import axios from "axios";

const StorePartnership = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [bnMsg, setBnMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [store, setStore] = useState({
    soName: "",
    businessNumber: "",
    soPhone: "",
    soEmail: "",
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

  return (
    <div className="storePartnership-main">
      <div className="storePartnership-wrap">
        <table className="storePartnership-table">
          <tbody className="storePartnership-tbody">
            <tr className="storePartnership-tr">
              <th className="storePartnership-th" colSpan={2}>
                <div className="storePartnership-div">
                  <div className="storePartnership-imgDiv">
                    {storeImage ? (
                      <img className="storePartnership-img" src={storeImage} />
                    ) : (
                      <img
                        className="storePartnership-img"
                        src="/image/s&s로고.png"
                      />
                    )}
                  </div>
                </div>
                <div className="storePartnership-btn-zone">
                  <button className="storePartnership-storeImg-btn">
                    매장 사진 등록
                  </button>
                </div>
              </th>
            </tr>
            <tr className="storePartnership-tr">
              <th className="storePartnership-th">
                <label htmlFor="storeName">매장 상호명</label>
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
                <label htmlFor="storePhone">매장 전화번호</label>
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
                <label htmlFor="storeAddr">매장 위치</label>
              </th>
              <td>
                <div className="storePartnership-div">
                  <input
                    className="storePartnership-inputBox"
                    type="text"
                    id="storeAddr"
                    name="storeAddr"
                    value={store.storeAddr}
                    onChange={changeStore}
                  ></input>
                </div>
              </td>
            </tr>
            <tr className="storePartnership-tr">
              <th className="storePartnership-th">
                <label htmlFor="storeTime">영업 시간</label>
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
                  ></input>
                </div>
              </td>
            </tr>
            <tr className="storePartnership-tr">
              <th className="storePartnership-th">
                <label htmlFor="storeClass">매장 유형</label>
              </th>
              <td>
                <div className="storePartnership-div">
                  <input
                    className="storePartnership-inputBox"
                    type="text"
                    id="storeClass"
                    name="storeClass"
                    value={store.storeClass}
                    onChange={changeStore}
                  ></input>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StorePartnership;
