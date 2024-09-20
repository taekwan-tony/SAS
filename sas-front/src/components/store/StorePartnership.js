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
    <div className="storeRegist-bottom-main">
      <div className="storeRegist-bottom-wrap">
        <table className="storeRegist-bottom-table">
          <tbody className="storeRegist-bottom-tbody">
            <tr className="storeRegist-bottom-tr">
              <th className="storeRegist-bottom-th" colSpan={2}>
                <div className="storeRegist-bottom-div">
                  <div className="storeRegist-imgDiv">
                    {storeImage ? (
                      <img
                        className="storeRegist-img"
                        src={storeImage}
                        onClick={() => {
                          storeImgRef.current.click();
                        }}
                      />
                    ) : (
                      <img
                        className="storeRegist-img"
                        src="/image/s&s로고.png"
                        onClick={() => {
                          storeImgRef.current.click();
                        }}
                      />
                    )}
                  </div>
                </div>
                <button className="storeRegist-storeImg-btn">
                  매장 사진 등록
                </button>
              </th>
            </tr>
            <tr className="storeRegist-bottom-tr">
              <th className="storeRegist-bottom-th">
                <label htmlFor="storeName">매장 상호명</label>
              </th>
              <td>
                <div className="storeRegist-bottom-div">
                  <input
                    className="storeRegist-bottom-inputBox"
                    type="text"
                    id="storeName"
                    name="storeName"
                    value={store.storeName}
                    onChange={changeStore}
                  ></input>
                </div>
              </td>
            </tr>
            <tr className="storeRegist-bottom-tr">
              <th className="storeRegist-bottom-th">
                <label htmlFor="storePhone">매장 전화번호</label>
              </th>
              <td>
                <div className="storeRegist-bottom-div">
                  <input
                    className="storeRegist-bottom-inputBox"
                    type="text"
                    id="storePhone"
                    name="storePhone"
                    value={store.storePhone}
                    onChange={changeStore}
                  ></input>
                </div>
              </td>
            </tr>
            <tr className="storeRegist-bottom-tr">
              <th className="storeRegist-bottom-th">
                <label htmlFor="storeAddr">매장 위치</label>
              </th>
              <td>
                <div className="storeRegist-bottom-div">
                  <input
                    className="storeRegist-bottom-inputBox"
                    type="text"
                    id="storeAddr"
                    name="storeAddr"
                    value={store.storeAddr}
                    onChange={changeStore}
                  ></input>
                </div>
              </td>
            </tr>
            <tr className="storeRegist-bottom-tr">
              <th className="storeRegist-bottom-th">
                <label htmlFor="storeTime">영업 시간</label>
              </th>
              <td>
                <div className="storeRegist-bottom-div">
                  <input
                    className="storeRegist-bottom-inputBox"
                    type="text"
                    id="storeTime"
                    name="storeTime"
                    value={store.storeTime}
                    onChange={changeStore}
                  ></input>
                </div>
              </td>
            </tr>
            <tr className="storeRegist-bottom-tr">
              <th className="storeRegist-bottom-th">
                <label htmlFor="storeClass">매장 유형</label>
              </th>
              <td>
                <div className="storeRegist-bottom-div">
                  <input
                    className="storeRegist-bottom-inputBox"
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
