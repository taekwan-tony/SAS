import { useEffect, useState } from "react";
import "./storeView.css";
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

const StoreView = (props) => {
  const setActiveIndex = props.setActiveIndex;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLoginStore = useRecoilValue(isStoreLoginState);
  const [check, setCheck] = useState(false);
  const { loginstoreNo } = props;
  const [store, setStore] = useState({});

  //매장 정보 출력
  useEffect(() => {
    if (isLoginStore) {
      axios
        .get(`${backServer}/store/storeView/${loginstoreNo}`)
        .then((res) => {
          console.log("매장 정보 출력 : ", res.data);
          setStore(res.data);
          setCheck(res.data.length);
        })
        .catch((err) => {
          console.log("매장 정보 출력 오류 : ", err);
        });
    }
  }, [loginstoreNo, check, isLoginStore]);

  // storeClass
  const storeClassLabel = (storeClass) => {
    switch (storeClass) {
      case 1:
        return "한식";
      case 2:
        return "중식";
      case 3:
        return "양식";
      case 4:
        return "일식";
      case 5:
        return "분식";
      case 0:
      default:
        return "기타";
    }
  };

  return (
    <div className="storeView-main">
      {/* section */}
      <div className="top-section">
        <div className="storeView-info-card">
          <button className="storeView-updateBtn">수정</button>
          <table className="storeView-table">
            <tbody className="storeView-tbody">
              <tr className="storeView-tr">
                <th className="storeView-th" colSpan={2}>
                  <div className="storeView-imgDiv-zone">
                    <div className="storeView-img-zone">
                      <img
                        className="storeView-img"
                        src="/image/s&s로고.png"
                        alt="Default"
                      />
                    </div>
                  </div>
                </th>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeName" className="storeView-label">
                    매장 상호명
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">{store.storeName}</div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storePhone" className="storeView-label">
                    매장 전화번호
                  </label>
                </th>
                <td>
                  <div className="storeView-div">{store.storePhone}</div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeIntroduce" className="storeView-label">
                    매장 소개
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">{store.storeIntroduce}</div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeAddr" className="storeView-label">
                    매장 위치
                  </label>
                </th>
                <td>
                  <div className="storeView-div">{store.storeAddr}</div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeTime" className="storeView-label">
                    영업 시간
                  </label>
                </th>
                <td>
                  <div className="storeView-div">{store.storeTime}</div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeReTime" className="storeView-label">
                    예약 가능 시작 시간
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">{store.storeReStart}</div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeReTime" className="storeView-label">
                    예약 가능 마감 시간
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">{store.storeReEnd}</div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="breakTime" className="storeView-label">
                    브레이크 타임 시작
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">{store.breakTimeStart}</div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="breakTime" className="storeView-label">
                    브레이크 타임 마감
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">{store.breakTimeEnd}</div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="deposit" className="storeView-label">
                    예약금
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">{store.deposit}</div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="seatCapacity" className="storeView-label">
                    좌석 수용 인원
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">{store.seatCapacity}</div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="seatAmount" className="storeView-label">
                    총 좌석 수
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">{store.seatAmount}</div>
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
                  <div className="storeView-div">
                    {storeClassLabel(store.storeClass)}
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
                    {store.storeMoodList
                      ?.map((moodItem) => moodItem.mood)
                      .filter(
                        (mood, index, self) => self.indexOf(mood) === index
                      )
                      .join(" / ")}{" "}
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
                    {store.storeAmenityList
                      ?.map((amenityItem) => amenityItem.amenities)
                      .filter(
                        (amenities, index, self) =>
                          self.indexOf(amenities) === index
                      )
                      .join(" / ")}
                    {""}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default StoreView;
