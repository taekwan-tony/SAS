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
  const { loginstoreNo, handleEditClick } = props;
  const [store, setStore] = useState({});
  const [storeSeatCapacity, setStoreSeatCapacity] = useState("");
  const [storeSeatAmount, setStoreSeatAmount] = useState("");
  const [seat, setSeat] = useState({
    seatCapacity: "",
    seatAmount: "",
  });

  const [storeSiFilepathList, setStoreSiFilepathList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스 상태

  useEffect(() => {
    if (store.seatList && store.seatList.length > 0) {
      setStoreSeatCapacity(store.seatList[0].seatCapacity);
      setStoreSeatAmount(store.seatList[0].seatAmount);
    }
  }, [store]);

  useEffect(() => {
    if (storeSeatCapacity && storeSeatAmount) {
      setSeat({
        seatCapacity: storeSeatCapacity,
        seatAmount: storeSeatAmount,
      });
    }
  }, [storeSeatCapacity, storeSeatAmount]);

  useEffect(() => {
    setActiveIndex(1);
    if (isLoginStore) {
      axios
        .get(`${backServer}/store/storeView/${loginstoreNo}`)
        .then((res) => {
          setStore(res.data);
          setCheck(res.data.length);
          if (res.data.storeSiFilepathList) {
            setStoreSiFilepathList(res.data.storeSiFilepathList);
          }
        })
        .catch((err) => {
          console.log(
            "에러 응답 데이터 : ",
            err.response ? err.response.data : err.message
          );
        });
    }
  }, [loginstoreNo, check, isLoginStore]);

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

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? storeSiFilepathList.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === storeSiFilepathList.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="storeView-main">
      <div className="top-section">
        <div className="storeView-info-card">
          <button className="storeView-updateBtn" onClick={handleEditClick}>
            수정
          </button>
          <table className="storeView-table">
            <tbody className="storeView-tbody">
              <tr className="storeView-tr">
                <th className="storeView-th" colSpan={2}>
                  <div className="storeView-imgDiv-zone">
                    <div className="storeView-img-zone">
                      {storeSiFilepathList.length > 0 && (
                        <img
                          className="storeView-img"
                          src={`${backServer}/store/${storeSiFilepathList[currentImageIndex]?.siFilepath}`}
                          alt={`Store Image ${currentImageIndex + 1}`}
                        />
                      )}
                    </div>
                    {/* 화살표 버튼 추가 */}
                    {storeSiFilepathList.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="storeView-slider-btn"
                        >
                          ◀
                        </button>
                        <button
                          onClick={nextImage}
                          className="storeView-slider-btn"
                        >
                          ▶
                        </button>
                      </>
                    )}
                  </div>
                </th>
              </tr>
              {/* 매장 정보 출력 */}
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
                  <div className="storeView-div">
                    {store.storeAddr} {store.storeDetailAddr}
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
                  <div className="storeView-div">{seat.seatCapacity}</div>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="seatAmount" className="storeView-label">
                    총 좌석 수
                  </label>
                </th>
                <td className="storeView-td">
                  <div className="storeView-div">{seat.seatAmount}</div>
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
                      .join(" / ")}
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
