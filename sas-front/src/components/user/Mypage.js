import { Route, Routes } from "react-router-dom";
import "../menu/menuview.css";
import "./mypage.css";
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
    </>
  );
};
const Profile = () => {
  return (
    <div className="profile-wrap">
      <div className="img">{/* 버튼 이안에 */}</div>
      <div className="user-info">
        <h2 className="user-nickName">회원 닉네임</h2>
        <h3 className="user-Id">회원아이디</h3>
        <div className="user-info-other">
          <span>여</span>
          <span>1997.05.17</span>
          <span>010-0000-0000</span>
          <span>user01@gmail.com</span>
        </div>
      </div>
      <div className="user-page-info"></div>
    </div>
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
