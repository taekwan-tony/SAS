import { Link, Route, Routes } from "react-router-dom";
import "../menu/menuview.css";
import "./mypage.css";
import {
  MypageFavorite,
  Profile,
  ReserveContent,
  ReviewContent,
} from "./MypageContent";
const Mypage = () => {
  return (
    <div className="mypage-main">
      <Routes>
        <Route path="" element={<MypageMain />}></Route>
        <Route path="resview" element={<ReservationView />}></Route>
      </Routes>
    </div>
  );
};
const MypageMain = () => {
  return (
    <>
      <Profile />
      <section className="reserve-list mypage-list-wrap">
        <Link to="#">더보기</Link>
        <h3 className="title">
          나의 예약 <span className="count">4</span>
        </h3>
        <div className="reserve-content-wrap list-content">
          <ReserveContent />
          <ReserveContent />
          <ReserveContent />
        </div>
      </section>
      <section className="mypage-list-wrap favorite-list">
        <Link to="#">더보기</Link>
        <h3 className="title">
          즐겨찾기 <span className="count">4</span>
        </h3>
        <MypageFavorite />
      </section>
      <section className="mypage-list-wrap review-list">
        <Link to="#">더보기</Link>
        <h3 className="title">
          나의 리뷰 <span className="count">4</span>
        </h3>
        <div className="list-content review-content-wrap">
          <ReviewContent />
        </div>
      </section>
    </>
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
