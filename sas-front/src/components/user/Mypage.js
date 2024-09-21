import { Route, Routes } from "react-router-dom";
import "../menu/menuview.css";
const Mypage = () => {
  return (
    <Routes>
      <Route path="resview" element={<ReservationView />}></Route>
    </Routes>
  );
};

const ReservationView = () => {
  return (
    <div className="res-view">
      <section>
        <div className="res-history">
          <h2>예약내역</h2>
          <div className="res-btn">
            <button
              className="btn-main
            "
            >
              방문예정
            </button>
            <button
              className="btn-main
            "
            >
              방문완료
            </button>
          </div>
          <div className="res-content">
            <img
              src="/image/IMG_3238.jpg"
              alt="프사"
              className="profile-image"
            />
            <div className="res-menu">
              <h2>매장이름</h2>
              <h2>결제정보</h2>
              <p>인원수</p>
              <p>예약시간</p>
            </div>
          </div>
          <div className="res-btn2">
            <button className="btn-main">D-Day</button>
            <button className="btn-main">예약취소</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mypage;
