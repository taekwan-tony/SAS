import React, { useState, useEffect } from "react";
import "./usermain.css"; // CSS 파일을 임포트합니다.
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 컴포넌트
import { Navigation, Pagination, Autoplay, Mousewheel } from "swiper/modules"; // 네비게이션 및 페이지네이션 모듈
import "swiper/css"; // 기본 CSS
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import {
  isUserLoginState,
  loginUserIdState,
  loginUserNoState,
  userTypeState,
} from "../utils/RecoilData";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Join from "./Join";
import LoginMain from "./LoginMain";
import Mypage from "./Mypage";
import MenuView from "../menu/MenuView";
import "../menu/menuview.css";
import SearchList from "../menu/SearchList";
import ReservationMain from "../reservation/ReservationMain";

function UserMain() {
  // 일반회원 로그인 지속 구현-수진(문제 생기면 말씀해주세요..)

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const [userType, setUserType] = useRecoilState(userTypeState);
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  const isUserLogin = useRecoilValue(isUserLoginState);
  useEffect(() => {
    refreshLogin();
    window.setInterval(refreshLogin, 60 * 60 * 1000); //한시간이 지나면 로그인 정보 자동으로 refresh 될수 있게
  }, []);
  //로그인 재요청
  const refreshLogin = () => {
    //최초화면 접속하면 LocalStorage에 저장된 refreshToken을 가져와서 자동으로 로그인 처리
    const userRefreshToken = window.localStorage.getItem("userRefreshToken");
    // console.log(userRefreshToken);
    // 한번도 로그인하지 않았거나, 로그아웃을 했으면 refreshToken은 존재하지 않음==>아무행동도 하지 않을것
    if (userRefreshToken != null) {
      //존재하면 해당 토큰으로 다시 로그인 처리
      axios.defaults.headers.common["Authorization"] = userRefreshToken;
      axios
        .post(`${backServer}/user/refresh`)
        .then((res) => {
          console.log(res);
          //refresh 토큰을 전송해서 로그인 정보를 새로 갱신해옴
          setLoginUserId(res.data.loginId);
          setUserType(res.data.userType);
          setLoginUserNo(res.data.userNo);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem(
            "userRefreshToken",
            res.data.refreshToken
          );
        })
        .catch((err) => {
          console.log(err);
          setLoginUserId("");
          setUserType(0);
          setLoginUserNo(0);
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("userRefreshToken");
        });
    }
  };

  //일반회원 로그인 지속 구현-수진 끝

  // 로그아웃-수진
  const logout = () => {
    setLoginUserId("");
    setUserType(0);
    setLoginUserNo(0);
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("userRefreshToken");
  };
  // 로그아웃 -수진 끝

  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // 검색창 확장 여부 상태
  const [activeTab, setActiveTab] = useState("below-30");
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 여부 상태
  // 서브메뉴를 열고 닫는 함수
  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  // 검색 버튼 클릭 시 input과 button의 클래스를 토글하는 함수
  const expandSearch = () => {
    setIsExpanded(!isExpanded); // 상태 변경으로 클래스 토글
  };

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // 스크롤 이벤트 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 검색창 구현중..
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const changeInputVal = (e) => {
    setSearchInput(e.target.value);
  };
  const search = () => {
    navigate(`searchlist/${searchInput}`);
    setSearchInput("");
  };

  return (
    /* 페이지헤더 */
    <div className="all-page-wrap">
      <div className={`page-header ${isScrolled ? "scrolled-header" : ""}`}>
        <a href="/usermain">
          <h1 className={`logo-text ${isScrolled ? "scrolled-logo-text" : ""}`}>
            Spoon & Smiles
          </h1>
        </a>
        <div className="header-search-form">
          <form
            className={`search-form ${isScrolled ? "scrolled-form" : ""}`}
            onSubmit={(e) => {
              e.preventDefault();
              search();
            }}
          >
            <input
              type="text"
              name="page-header-input"
              className={`page-header-input ${isExpanded ? "square" : ""} ${
                isScrolled ? "scrolled-input" : ""
              }`}
              value={searchInput}
              onChange={changeInputVal}
            />

            <button
              type="button"
              className={`page-header-search ${isExpanded ? "close" : ""} ${
                isScrolled ? "scrolled-button" : ""
              }`}
              onClick={expandSearch}
            />
          </form>
        </div>
        <div className="user-main-login-button">
          {isUserLogin ? (
            <button className="user-main-login-btn" onClick={logout}>
              로그아웃
            </button>
          ) : (
            <Link to="/usermain/login">
              <button className="user-main-login-btn">로그인</button>
            </Link>
          )}
        </div>

        <div className="user-box-bell">
          <div className="user-page-box">
            <div className="bellWrapper">
              <i className="fas fa-bell my-bell"></i>
            </div>

            <div className="circle first"></div>
            <div className="circle second"></div>
            <div className="circle third"></div>
          </div>
        </div>
      </div>

      {/* 사이드바 */}
      <div className="navigation-wrap">
        <div className="naviwrap">
          <input type="checkbox" id="check-navi" />
          <label htmlFor="check-navi">
            <i
              className={`fa fa-bars ${isScrolled ? "scrolled-bars" : ""}`}
              id="btn-navi"
            ></i>
            <i
              className={`fa fa-times ${isScrolled ? "scrolled-times" : ""}`}
              id="cancle-navi"
            ></i>
          </label>
          <div className="user-sidebar">
            <header className="header-user">
              <img src="/image/IMG_3238.jpg" alt="User" />
              <p>{loginUserId}</p>
            </header>
            <div className="sidebar-user-page">
              <ul>
                <li className={`has-submenu ${submenuOpen ? "open" : ""}`}>
                  <Link
                    to="mypage"
                    className="toggle-submenu"
                    onClick={toggleSubmenu}
                  >
                    <i className="fa-solid fa-image-portrait"></i>마이페이지
                  </Link>
                  <ul class="user-navi-submenu">
                    <li>
                      <a href="#">
                        <i class="fa-solid fa-user-pen"></i>내 정보 수정
                      </a>
                    </li>
                    <li>
                      <Link to="mypage/myreview">
                        <i class="fa-solid fa-comment"></i>나의 리뷰
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    <i class="fa-solid fa-magnifying-glass"></i>검색하기
                  </a>
                </li>
                <li>
                  <Link to="mypage/resview">
                    <i class="fa-solid fa-calendar-week"></i>예약보기
                  </Link>
                </li>
                <li>
                  <a href="#">
                    <i class="fa-solid fa-bookmark"></i>즐겨찾기
                  </a>
                </li>
              </ul>
            </div>
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
      <Routes>
        <Route path="join" element={<Join />} />
        <Route path="login/*" element={<LoginMain />} />
        <Route path="mypage/*" element={<Mypage />}></Route>
        <Route path="menuview/*" element={<MenuView />} />
        <Route path="searchlist/:searchItem" element={<SearchList />} />
        <Route
          path=""
          element={
            <UserMainView activeTab={activeTab} setActiveTab={setActiveTab} />
          }
        ></Route>
        <Route path="/reservationMain/*" element={<ReservationMain />}></Route>
      </Routes>
    </div>
  );
}

const UserMainView = (props) => {
  const activeTab = props.activeTab;
  const setActiveTab = props.setActiveTab;
  // 탭 클릭 시 해당 탭을 활성화하는 함수
  const handleTabClick = (bestSectionTab) => {
    setActiveTab(bestSectionTab);
  };
  return (
    <>
      {/* 메인배너 스와이프 */}
      <div className="swiper-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Mousewheel]} // 모듈 설정
          navigation={true} // 네비게이션 활성화
          pagination={{ clickable: true }} // 페이지네이션 활성화
          spaceBetween={30}
          slidesPerView={1}
          loop={true} // 슬라이드 무한 루프 활성화
          autoplay={{
            delay: 5000, // 5초마다 자동 재생
            disableOnInteraction: false, // 상호작용 후에도 자동 재생 유지
          }}
          mousewheel={true} // 마우스 휠로 슬라이드 이동 가능
          centeredSlides={true} // 슬라이드를 중앙 정렬
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/image/bg-mobile-dark.jpg" alt="Slide 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/image/bg-mobile-dark.jpg" alt="Slide 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/image/bg-mobile-dark.jpg" alt="Slide 3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/image/bg-mobile-light.jpg" alt="Slide 4" />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/image/bg-mobile-dark.jpg"
              className="kenburns-top"
              alt="Slide 5"
            />
          </SwiperSlide>
        </Swiper>

        {/* 메뉴 섹션 추가 */}
        <section className="user-menu-wrapper">
          <section className="user-menu-section">
            <div className="user-menu-item">
              <img src="/image/facebook.png" alt="웨이팅 TOP" />
              <p>웨이팅TOP</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/insta.png" alt="데이트 맛집" />
              <p>데이트 맛집</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/LinkedIn.png" alt="히든플레이스" />
              <p>히든플레이스</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/Newsletter.png" alt="온라인웨이팅" />
              <p>온라인웨이팅</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/LinkedIn.png" alt="위스키픽업" />
              <p>위스키픽업</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/insta.png" alt="스시오마카세" />
              <p>스시오마카세</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/facebook.png" alt="우마카세" />
              <p>우마카세</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/LinkedIn.png" alt="밀키트" />
              <p>밀키트</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/facebook.png" alt="이달의 맛집" />
              <p>이달의 맛집</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/insta.png" alt="호텔다이닝" />
              <p>호텔다이닝</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/insta.png" alt="케이크" />
              <p>케이크</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/facebook.png" alt="모임예약" />
              <p>모임예약</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/LinkedIn.png" alt="레드리본맛집" />
              <p>레드리본맛집</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/facebook.png" alt="팝업스토어" />
              <p>팝업스토어</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/insta.png" alt="스페셜혜택" />
              <p>스페셜혜택</p>
            </div>
          </section>
        </section>

        <div className="dining-deal-section">
          <div className="dining-deal-header">
            <div>
              <h2>웨이팅 핫플레이스 BEST</h2>
              <p>핫 한 웨이팅 라인업, 이젠 스푼앤스마일스에서!</p>
            </div>
            <a href="#" className="view-all">
              모두 보기 →
            </a>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, Mousewheel]}
            pagination={{ clickable: true }}
            navigation={true}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            mousewheel={true}
            centeredSlides={true}
            className="diningSwiper"
          >
            <SwiperSlide>
              <div className="dining-deal-content">
                <img src="/image/youtube.png" alt="Slide 5" />
                <div className="dining-deal-info">
                  <p>서울 | 오마카세</p>
                  <h3>다마레스시</h3>
                  <p>
                    <span className="original-price">400,000원</span>
                    <span className="discount">30% 할인</span>
                  </p>
                  <p className="price">280,000원부터</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="dining-deal-content">
                <img src="/image/youtube.png" alt="Slide 6" />
                <div className="dining-deal-info">
                  <p>서울 | 스테이크하우스</p>
                  <h3>루비노 스테이크</h3>
                  <p>
                    <span className="original-price">300,000원</span>
                    <span className="discount">20% 할인</span>
                  </p>
                  <p className="price">240,000원부터</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="dining-deal-content">
                <img src="/image/insta.png" alt="Slide 7" />
                <div className="dining-deal-info">
                  <p>서울 | 양식</p>
                  <h3>아웃백</h3>
                  <p>
                    <span className="original-price">150,000원</span>
                    <span className="discount">20% 할인</span>
                  </p>
                  <p className="price">120,000원부터</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {/* 가격대별 BEST 섹션 */}
        <section className="price-best-section">
          <h2>가격대별 BEST</h2>
          <div className="best-section-tabs">
            <button
              className={`best-section-tab ${
                activeTab === "below-30" ? "active" : ""
              }`}
              onClick={() => handleTabClick("below-30")}
            >
              3만원 이하
            </button>
            <button
              className={`best-section-tab ${
                activeTab === "30-50" ? "active" : ""
              }`}
              onClick={() => handleTabClick("30-50")}
            >
              3-5만원
            </button>
            <button
              className={`best-section-tab ${
                activeTab === "50-100" ? "active" : ""
              }`}
              onClick={() => handleTabClick("50-100")}
            >
              5-10만원
            </button>
            <button
              className={`best-section-tab ${
                activeTab === "above-100" ? "active" : ""
              }`}
              onClick={() => handleTabClick("above-100")}
            >
              10만원 이상
            </button>
          </div>

          <div className="best-list-container">
            {/* 3만원 이하 섹션 */}
            {activeTab === "below-30" && (
              <ul className="best-list">
                <li>
                  <img src="/image/youtube.png" alt="식당1" />
                  <div className="restaurant-info">
                    <h3>속성도 노형본관</h3>
                    <p>돼지고기구이 · 제주 제주시</p>
                    <p className="rating">4.6 (2037)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/youtube.png" alt="식당2" />
                  <div className="restaurant-info">
                    <h3>속성도 노형본관</h3>
                    <p>돼지고기구이 · 제주 제주시</p>
                    <p className="rating">4.6 (2037)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/youtube.png" alt="식당3" />
                  <div className="restaurant-info">
                    <h3>속성도 노형본관</h3>
                    <p>돼지고기구이 · 제주 제주시</p>
                    <p className="rating">4.6 (2037)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/youtube.png" alt="식당4" />
                  <div className="restaurant-info">
                    <h3>속성도 노형본관</h3>
                    <p>돼지고기구이 · 제주 제주시</p>
                    <p className="rating">4.6 (2037)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/youtube.png" alt="식당5" />
                  <div className="restaurant-info">
                    <h3>속성도 노형본관</h3>
                    <p>돼지고기구이 · 제주 제주시</p>
                    <p className="rating">4.6 (2037)</p>
                  </div>
                </li>
              </ul>
            )}

            {/* 3-5만원 섹션 */}
            {activeTab === "30-50" && (
              <ul className="best-list">
                <li>
                  <img src="/image/Newsletter.png" alt="식당6" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/Newsletter.png" alt="식당7" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/Newsletter.png" alt="식당8" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/Newsletter.png" alt="식당9" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/Newsletter.png" alt="식당10" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
              </ul>
            )}

            {/* 5-10만원 섹션 */}
            {activeTab === "50-100" && (
              <ul className="best-list">
                <li>
                  <img src="/image/insta.png" alt="식당11" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/insta.png" alt="식당12" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/insta.png" alt="식당13" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/insta.png" alt="식당14" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/insta.png" alt="식당15" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
              </ul>
            )}

            {/* 10만원 이상 섹션 */}
            {activeTab === "above-100" && (
              <ul className="best-list">
                <li>
                  <img src="/image/facebook.png" alt="식당16" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/facebook.png" alt="식당17" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/facebook.png" alt="식당18" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/facebook.png" alt="식당19" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
                <li>
                  <img src="/image/facebook.png" alt="식당20" />
                  <div className="restaurant-info">
                    <h3>아이노가든키친</h3>
                    <p>백반/가정식 · 광화문</p>
                    <p className="rating">4.5 (1015)</p>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </section>

        {/* footer */}
        <footer>
          <div className="footer-container">
            <div className="footer-section social-media">
              <div className="footer-logo">
                <img src="/image/s&s로고.png" alt="S&S Logo" />
                <span className="footer-logo-text">Spoon & Smiles</span>
              </div>
              <ul className="social-link">
                <li>
                  <a href="#">
                    <img src="../image/facebook.png" alt="Facebook" /> Facebook
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="../image/insta.png" alt="Instagram" /> Instagram
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="../image/youtube.png" alt="YouTube" /> YouTube
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="../image/blog.png" alt="Blog" /> Blog
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="../image/LinkedIn.png" alt="LinkedIn" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="../image/Newsletter.png" alt="Newsletter" />{" "}
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Section */}
            <div className="footer-section links">
              <h4>Spoon & Smiles</h4>
              <ul>
                <li>
                  <a href="#">고객센터</a>
                </li>
                <li>
                  <a href="#">기타문의</a>
                </li>
                <li>
                  <a href="#">제휴문의</a>
                </li>
                <li>
                  <a href="#">헬프센터</a>
                </li>
                <li>
                  <a href="#">사업자확인</a>
                </li>
              </ul>
            </div>

            <div className="footer-section links">
              <h4>이용약관</h4>
              <ul>
                <li>
                  <a href="#">이용약관</a>
                </li>
                <li>
                  <a href="#">개인정보보호정책</a>
                </li>
                <li>
                  <a href="#">연락하기</a>
                </li>
                <li>
                  <a href="#">점주등록안내</a>
                </li>
                <li>
                  <a href="#">이용안내</a>
                </li>
              </ul>
            </div>

            <div className="footer-section links">
              <h4>S&S Lab, Inc.</h4>
              <ul>
                <li>
                  <a href="#">회사소개</a>
                </li>
                <li>
                  <a href="#">채용</a>
                </li>
                <li>
                  <a href="#">S&S 블로그</a>
                </li>
                <li>
                  <a href="#">파트너</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider"></div>

          {/* Legal Section */}
          <div className="footer-legal">
            <div className="legal-text">
              <p>개인정보처리방침 | 이용약관</p>
              <p>
                (주)KH랩 | 대표이사: 누구게? | 서울특별시 선유동2로 57
                양평동4가, 이레빌딩 19층 A-Class | 이메일: khclass@kr.co.iei.com
                <br />
                사업자등록번호: 116-82-00640 | 통신판매업신고번호:
                2024-서울영등포구-00237 | © 1992-2024 KH Lab, Inc.
              </p>
            </div>

            {/* Language Selection */}
            <div className="language-selection">
              <span className="material-icons">language</span>
              <select>
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default UserMain;
