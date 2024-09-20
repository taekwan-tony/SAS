import { Link, Route, Routes } from "react-router-dom";
import "./MenuView.css";

const MenuView = () => {
  return (
    <div className="menuview-bigwrap">
      <div className="menuview-wrap">
        <section className="section-menu">
          <div className="menu-image">
            <img src="/image/s&s로고.png" alt="가게 로고" />
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
          <Link to="menunews">
            <li>소식</li>
          </Link>
          <Link to="menu">
            <li>메뉴</li>
          </Link>
          <Link to="photo">
            <li>사진</li>
          </Link>
          <Link to="review">
            <li>리뷰</li>
          </Link>
          <Link to="info">
            <li>매장정보</li>
          </Link>
        </ul>
      </section>
      <Routes>
        <Route path="" element={<MenuMain />}></Route>
        <Route path="menunews" element={<Menunews />}></Route>
        <Route path="menu" element={<Menu />}></Route>
        <Route path="photo" element={<MenuPhoto />}></Route>
        <Route path="review" element={<MenuReview />}></Route>
        <Route path="info" element={<Menuinfo />}></Route>
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
          <span className="material-icons">calendar_today</span>날짜 - 인원 -
          시간
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
      <p>
        신메뉴 출시: "새로운 맛의 경험! 이번 주부터 신메뉴가 출시됩니다. 많은
        관심 부탁드려요!" 이벤트 안내: "🎉 특별 이벤트 소식! 이번 주말,
        방문하시는 모든 분께 할인 혜택을 드립니다!" 운영 시간 변경: "📅 운영
        시간이 변경되었습니다. 새로운 시간표를 확인해 주세요!"
      </p>
    </div>
  );
};

const Menu = () => {
  return (
    <div className="menu">
      <h2>메뉴</h2>
      <img
        src="/image/youtube.png"
        alt="메뉴"
        style={{ width: "200px", height: "auto" }}
      />
      <p>크림 파스타</p>
      <p>가격: 12,000원</p>
      <p>풍부한 크림 소스와 신선한 채소가 어우러진 고소한 파스타입니다.</p>
      <img
        src="/image/youtube.png"
        alt="메뉴"
        style={{ width: "200px", height: "auto" }}
      />
      <p>불고기 비빔밥 </p>
      <p> 가격: 10,500원 </p>
      <p>
        달콤한 불고기와 신선한 야채, 고소한 참기름이 조화를 이루는 인기
        메뉴입니다.
      </p>
      <img
        src="/image/youtube.png"
        alt="메뉴"
        style={{ width: "200px", height: "auto" }}
      />
      <p>치킨너겟</p>
      <p>가격: 8,000원 </p>
      <p>
        바삭하게 튀긴 치킨너겟과 함께 제공되는 다양한 소스가 매력적인
        메뉴입니다.
      </p>
    </div>
  );
};

const MenuPhoto = () => {
  return (
    <div className="menu-photo">
      <h2>사진</h2>
      <div className="menu-image">
        <img src="/image/youtube.png" alt="가게 로고" />
        <img src="/image/youtube.png" alt="가게 로고" />
        <img src="/image/youtube.png" alt="가게 로고" />
        <img src="/image/youtube.png" alt="가게 로고" />
        <img src="/image/youtube.png" alt="가게 로고" />
      </div>
    </div>
  );
};

const MenuReview = () => {
  return (
    <div className="menu-review">
      <span className="material-icons">star_border</span>
      <div>사용자이름</div>
    </div>
  );
};

const Menuinfo = () => {
  return (
    <div className="menu-info">
      <h2>매장정보</h2>
    </div>
  );
};

export default MenuView;
