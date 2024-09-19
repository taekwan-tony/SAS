import React, { useState } from "react";
import "./usermain.css"; // CSS 파일을 임포트합니다.
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 컴포넌트
import { Navigation, Pagination } from "swiper/modules"; // 네비게이션 및 페이지네이션 모듈
import "swiper/css"; // 기본 CSS
import "swiper/css/navigation"; // 네비게이션 CSS
import "swiper/css/pagination"; // 페이지네이션 CSS

function UserMain() {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // 검색창 확장 여부 상태

  // 서브메뉴를 열고 닫는 함수
  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  // 검색 버튼 클릭 시 input과 button의 클래스를 토글하는 함수
  const expandSearch = () => {
    setIsExpanded(!isExpanded); // 상태 변경으로 클래스 토글
  };

  return (
    /* 페이지헤더 */
    <div className="all-page-wrap">
      <div className="page-header">
        <h1 className="logo-text">Spoon & Smiles</h1>
        <div className="header-search-form">
          <form className="search-form">
            {/* content 대신 search-form 사용 */}
            <input
              type="text"
              name="page-header-input"
              className={`page-header-input ${isExpanded ? "square" : ""}`} // 확장 여부에 따라 클래스 적용
            />
            <button
              type="button"
              className={`page-header-search ${isExpanded ? "close" : ""}`} // 확장 여부에 따라 클래스 적용
              onClick={expandSearch} // 버튼 클릭 시 검색창 확장/축소
            />
          </form>
        </div>
        <div className="user-page-box">
          <div className="bellWrapper">
            <i className="fas fa-bell my-bell"></i>
          </div>

          <div className="circle first"></div>
          <div className="circle second"></div>
          <div className="circle third"></div>
        </div>
      </div>

      {/* 메인배너 */}

      <div className="swiper-container">
        <Swiper
          navigation={true} // 네비게이션 활성화
          pagination={{ clickable: true }} // 페이지네이션 활성화
          spaceBetween={30}
          slidesPerView={1}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/img/bg-mobile-dark.jpg" alt="Slide 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/bg-mobile-dark.jpg" alt="Slide 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/bg-mobile-dark.jpg" alt="Slide 3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/bg-mobile-light.jpg" alt="Slide 4" />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/img/bg-mobile-dark.jpg"
              className="kenburns-top"
              alt="Slide 5"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* 사이드바 */}
      <div className="navigation-wrap">
        <div className="naviwrap">
          <input type="checkbox" id="check-navi" />
          <label htmlFor="check-navi">
            <i className="fa fa-bars" id="btn-navi"></i>
            <i className="fa fa-times" id="cancle-navi"></i>
          </label>
          <div className="user-sidebar">
            <header className="header-user">
              <img src="/image/IMG_3238.jpg" alt="User" />
              <p>user-id</p>
            </header>
            <ul>
              <li className={`has-submenu ${submenuOpen ? "open" : ""}`}>
                <a href="#" className="toggle-submenu" onClick={toggleSubmenu}>
                  <i className="fa-solid fa-image-portrait"></i>마이페이지
                </a>
                <ul class="user-navi-submenu">
                  <li>
                    <a href="#">
                      <i class="fa-solid fa-user-pen"></i>내 정보 수정
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa-solid fa-comment"></i>나의 리뷰
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">
                  <i class="fa-solid fa-magnifying-glass"></i>검색하기
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-solid fa-calendar-week"></i>예약보기
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-solid fa-bookmark"></i>즐겨찾기
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-question-circle"></i>About
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-sliders"></i>Service
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-id-card"></i>Contact
                </a>
              </li>
            </ul>
            <div className="user-social-links">
              <a href="#" class="twitter">
                <i class="fa-brands fa-twitter"></i>
              </a>
              <a href="#" class="facebook">
                <i class="fa-brands fa-facebook"></i>
              </a>
              <a href="#" class="instagram">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#" class="google-plus">
                <i class="fa-brands fa-youtube"></i>
              </a>
            </div>
            {/* 로그아웃 버튼 */}
            <div className="user-navi-logout-button">
              <a href="#">
                <i className="fa fa-sign-out"></i>Logout
              </a>
            </div>
          </div>
          <section></section>
        </div>
      </div>
    </div>
  );
}

export default UserMain;
