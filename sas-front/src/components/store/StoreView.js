import { useEffect, useState } from "react";
import "./storeView.css";
import axios from "axios";
import "./modal.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { isStoreLoginState } from "../utils/RecoilData";

const StoreView = (props) => {
  const setActiveIndex = props.setActiveIndex;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLoginStore = useRecoilValue(isStoreLoginState);
  const [check, setCheck] = useState(false);
  const { loginstoreNo, handleEditClick } = props;
  const [store, setStore] = useState({});

  useEffect(() => {
    storeRefreshLogin();
    window.setInterval(storeRefreshLogin, 60 * 60 * 1000); // 한 시간
  }, [isLoginStore]);

  const storeRefreshLogin = () => {
    const storeRefreshToken = window.localStorage.getItem("storeRefreshToken");
    if (storeRefreshToken != null) {
      axios.defaults.headers.common["Authorization"] = storeRefreshToken;
      axios
        .post(`${backServer}/store/storeRefresh`)
        .then((res) => {
          console.log("로그인 유지 :", res);
          console.log("storeNo :", res.data.storeNo); // storeNo 값 출력
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem(
            "storeRefreshToken",
            res.data.refreshToken
          );
        })
        .catch((err) => {
          console.log(err);
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("storeRefreshToken");
        });
    }
  };

  const [seatList, setSeatList] = useState([{ seatAmount: "", seatCount: "" }]);

  const [storeSiFilepathList, setStoreSiFilepathList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스 상태

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
                <td className="storeView-td">{store.storeName}</td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storePhone" className="storeView-label">
                    매장 전화번호
                  </label>
                </th>
                <td className="storeView-td">{store.storePhone}</td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeIntroduce" className="storeView-label">
                    매장 소개
                  </label>
                </th>
                <td className="storeView-td">{store.storeIntroduce}</td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeAddr" className="storeView-label">
                    매장 위치
                  </label>
                </th>
                <td className="storeView-td">
                  {store.storeAddr} {store.storeDetailAddr}
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeTime" className="storeView-label">
                    영업 시간
                  </label>
                </th>
                <td className="storeView-td">{store.storeTime}</td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeReTime" className="storeView-label">
                    예약 가능 시작 시간
                  </label>
                </th>
                <td className="storeView-td">{store.storeReStart}</td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeReTime" className="storeView-label">
                    예약 가능 마감 시간
                  </label>
                </th>
                <td className="storeView-td">{store.storeReEnd}</td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="breakTime" className="storeView-label">
                    브레이크 타임 시작
                  </label>
                </th>
                <td className="storeView-td">{store.breakTimeStart}</td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="breakTime" className="storeView-label">
                    브레이크 타임 마감
                  </label>
                </th>
                <td className="storeView-td">{store.breakTimeEnd}</td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="deposit" className="storeView-label">
                    예약금
                  </label>
                </th>
                <td className="storeView-td">{store.deposit}</td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="seatType" className="storeView-label">
                    좌석
                  </label>
                </th>
                <td className="storeView-td">
                  <table className="seat-view-table">
                    <thead>
                      <tr className="seat-view-tr">
                        <th className="seat-view-th">좌석 유형</th>
                        <th className="seat-view-th">좌석 수</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seatList.map((seat, index) => (
                        <tr key={index}>
                          <td className="seat-view-td">
                            <input
                              className="storeView-inputBox"
                              type="text"
                              name="seatType"
                              value={seat.seatCapacity}
                            />
                          </td>
                          <td className="seat-td">
                            <input
                              className="storeView-inputBox"
                              type="text"
                              name="seatCount"
                              value={seat.seatAmount}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeClass" className="storeView-label">
                    매장 유형
                  </label>
                </th>
                <td className="storeView-td">
                  {storeClassLabel(store.storeClass)}
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeMood" className="storeView-label">
                    매장 분위기
                  </label>
                </th>
                <td className="storeView-td">
                  {store.storeMoodList
                    ?.map((moodItem) => moodItem.mood)
                    .filter((mood, index, self) => self.indexOf(mood) === index)
                    .join(" / ")}
                </td>
              </tr>
              <tr className="storeView-tr">
                <th className="storeView-th">
                  <label htmlFor="storeAmenities" className="storeView-label">
                    편의 시설
                  </label>
                </th>
                <td className="storeView-td">
                  {store.storeAmenityList
                    ?.map((amenityItem) => amenityItem.amenities)
                    .filter(
                      (amenities, index, self) =>
                        self.indexOf(amenities) === index
                    )
                    .join(" / ")}
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
