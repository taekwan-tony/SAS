import { Link, Route, Routes } from "react-router-dom";
import "./MenuView.css";

const MenuView = () => {
  return (
    <div className="menuview-bigwrap">
      <div className="menuview-wrap">
        <section className="section-menu">
          <div className="menu-image">
            <img src="./image/s&s로고.png" alt="가게 로고" />
          </div>
          <div className="menuview-info">
            <p>가게 이름</p>
            <p>위치</p>
            <p>가게 설명</p>
            <p>영업시간</p>
          </div>
        </section>
      </div>
      <section className="section-menu">
        <ul className="menu-nav">
          <Link to="/menuview">
            <li>홈</li>
          </Link>
          <Link to="/Menunews">
            <li>소식</li>
          </Link>
          <Link to="/menu">
            <li>메뉴</li>
          </Link>
          <Link to="/photo">
            <li>사진</li>
          </Link>
          <Link to="/review">
            <li>리뷰</li>
          </Link>
          <Link to="/info">
            <li>매장정보</li>
          </Link>
        </ul>
      </section>
      <Routes>
        <Route path="" element={<MenuMain />}></Route>
        <Route path="" element={<Menunews />}></Route>
      </Routes>
      <div className="reservation-button">
        <span className="material-icons page-item">bookmark_border</span>
        <span className="material-icons page-item">share</span>
        <button className="reservation-btn">예약하기</button>
      </div>
    </div>
  );
};

const MenuMain = () => {
  return (
    <main className="main-menu">
      <h2>예약</h2>
      <section className="reservation-info">
        <span className="material-icons page-item">
          <span class="material-icons">calendar_today</span>날짜 - 인원 - 시간
        </span>
        <div className="res-time">
          <div>오후 12:00</div>
        </div>
        <Link to="#" className="find-date btn-sub round">
          예약가능날짜찾기
        </Link>
      </section>
      <div className="facilities">
        <h2>편의시설</h2>
        <div className="amenities">편의시설 이미지</div>
      </div>
    </main>
  );
};

const Menunews = () => {
  return (
    <div className="news">
      <h2>가게소식</h2>
    </div>
  );
};

export default MenuView;
