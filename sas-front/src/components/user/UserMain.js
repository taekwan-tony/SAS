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
  loginUserNicknameState,
  loginUserNoState,
  userTypeState,
} from "../utils/RecoilData";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Join from "./Join";
import LoginMain from "./LoginMain";
import Mypage from "./Mypage";
import { MenuView } from "../menu/MenuView";
import "../menu/menuview.css";
import SearchList from "../menu/SearchList";
import ReservationMain from "../reservation/ReservationMain";
import UserNoticeList from "./UserNoticeList";
import UserNoticeDetail from "./UserNoticeDetail";
import ReportMain from "../report/ReportMain";

import LoginNaverCallback from "./LoginNaverCallback";

function UserMain() {
  // 일반회원 로그인 지속 구현-수진(문제 생기면 말씀해주세요..)

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const [userType, setUserType] = useRecoilState(userTypeState);
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  const isUserLogin = useRecoilValue(isUserLoginState);
  const [loginUserNickname, setLoginUserNickname] = useRecoilState(
    loginUserNicknameState
  );

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
          setLoginUserNickname(res.data.userNickname);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem(
            "userRefreshToken",
            res.data.refreshToken
          );
        })
        .catch((err) => {
          console.log(err, "자동로그인 안됨");
          setLoginUserId("");
          setUserType(0);
          setLoginUserNo(0);
          setLoginUserNickname("");
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("userRefreshToken");
        });
    }
  };

  //일반회원 로그인 지속 구현-수진 끝
  //프로필 사진 용
  const [userPhoto, setuserPhoto] = useState(null);
  const [checkPhotoUpdate, setCheckPhotoUpdate] = useState(false); //프로필 업데이트 될때마다 다시 가져오기
  useEffect(() => {
    //프로필 사진 가져오기
    if (isUserLogin) {
      axios
        .get(`${backServer}/user/userId/${loginUserId}/userPhoto`)
        .then((res) => {
          console.log(res);
          setuserPhoto(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loginUserId, checkPhotoUpdate]);
  // 로그아웃-수진
  const logout = () => {
    setLoginUserId("");
    setUserType(0);
    setLoginUserNo(0);
    setLoginUserNickname("");
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

  // 검색창 구현중.. 여기서부터 시작해야하나 ?
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const changeInputVal = (e) => {
    setSearchInput(e.target.value);
  };
  const search = () => {
    if (searchInput !== "") {
      navigate(`searchlist/${searchInput}`);
      setSearchInput("");
    }
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
            <button
              className="btn-a"
              style={{ outline: "none" }}
              onClick={logout}
            >
              로그아웃
            </button>
          ) : (
            <Link to="/usermain/login">
              <button className="btn-a" style={{ outline: "none" }}>
                로그인
              </button>
            </Link>
          )}
        </div>

        <div className="user-box-bell">
          <Link to="noticeList">
            <div className="user-page-box">
              <div className="bellWrapper">
                <i className="fas fa-bell my-bell"></i>
              </div>

              <div className="circle first"></div>
              <div className="circle second"></div>
              <div className="circle third"></div>
            </div>
          </Link>
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
            {isUserLogin ? (
              <>
                <header className="header-user">
                  <img
                    src={
                      userPhoto
                        ? `${backServer}/userProfile/${userPhoto}`
                        : "/image/IMG_3238.jpg"
                    }
                    alt="User"
                  />
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
                      <ul className="user-navi-submenu">
                        <li>
                          <Link
                            to={
                              userType === 1
                                ? "mypage/update/checkPw"
                                : "mypage/update/updateForm"
                            }
                          >
                            <i className="fa-solid fa-user-pen"></i>내 정보 수정
                          </Link>
                        </li>
                        <li>
                          <Link to="mypage/myreview">
                            <i className="fa-solid fa-comment"></i>나의 리뷰
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to={`searchList`}>
                        <i className="fa-solid fa-magnifying-glass"></i>검색하기
                      </Link>
                    </li>
                    <li>
                      <Link to="mypage/resview">
                        <i className="fa-solid fa-calendar-week"></i>예약보기
                      </Link>
                    </li>
                    <li>
                      <Link to="mypage/favorite">
                        <i className="fa-solid fa-bookmark"></i>즐겨찾기
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="user-social-links">
                  <a href="#" className="twitter">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#" className="facebook">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href="#" className="instagram">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#" className="google-plus">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </div>
                {/* 로그아웃 버튼 */}
                <div className="user-navi-logout-button">
                  <Link to="" onClick={logout}>
                    <i className="fa fa-sign-out"></i>Logout
                  </Link>
                </div>
              </>
            ) : (
              <div
                className="sidebar-user-page"
                style={{ textAlign: "center" }}
                onClick={() => {
                  navigate("login");
                }}
              >
                <button className="btn-a">로그인</button>
              </div>
            )}
          </div>
          <section></section>
        </div>
      </div>
      <Routes>
        {/* 소셜로그인용 페이지 */}
        <Route path="login-naver" element={<LoginNaverCallback />}></Route>
        <Route path="join" element={<Join />} />
        <Route path="login/*" element={<LoginMain />} />
        <Route
          path="mypage/*"
          element={
            <Mypage
              checkPhotoUpdate={checkPhotoUpdate}
              setCheckPhotoUpdate={setCheckPhotoUpdate}
            />
          }
        ></Route>
        <Route path="menuview/:storeNo/*" element={<MenuView />} />
        <Route path="searchlist/:searchItem" element={<SearchList />} />
        <Route path="searchlist" element={<SearchList search={"all"} />} />
        <Route path="noticeList" element={<UserNoticeList />} />
        <Route
          path="noticeDetail/:noticeNo/:userNickname"
          element={<UserNoticeDetail />}
        />
        <Route
          path=""
          element={
            <UserMainView activeTab={activeTab} setActiveTab={setActiveTab} />
          }
        ></Route>
      </Routes>
    </div>
  );
}

const UserMainView = (props) => {
  const [store, setStore] = useState([]);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const activeTab = props.activeTab;
  const setActiveTab = props.setActiveTab;
  const navigate = useNavigate("");
  const handleTabClick = (bestSectionTab) => {
    setActiveTab(bestSectionTab);
  };
  useEffect(() => {
    axios
      .get(`${backServer}/store/storeList/view`)
      .then((res) => {
        console.log(res);
        setStore(res.data.list);
      })
      .catch((err) => {
        console.log("왜에러임");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${backServer}/store/storeList/view/best`)
      .then((res) => {
        console.log(res);
        setStore(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            <img src="/image/8.png" alt="Slide 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/image/9.png" alt="Slide 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/image/10.png" alt="Slide 3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/image/11.png" alt="Slide 4" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/image/12.png" className="kenburns-top" alt="Slide 5" />
          </SwiperSlide>
        </Swiper>

        {/* 메뉴 섹션 추가 */}
        <section className="user-menu-wrapper">
          <section className="user-menu-section">
            <div className="user-menu-item">
              <img src="/image/badge.png" alt="웨이팅 TOP" />
              <p>웨이팅TOP</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/datetable.png" alt="데이트 맛집" />
              <p>데이트 맛집</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/hidden.png" alt="히든플레이스" />
              <p>히든플레이스</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/waitingticket.png" alt="온라인웨이팅" />
              <p>온라인웨이팅</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/whisky.png" alt="위스키픽업" />
              <p>위스키</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/sushi.png" alt="스시오마카세" />
              <p>스시오마카세</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/meat.png" alt="우마카세" />
              <p>우마카세</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/b&w.png" alt="밀키트" />
              <p>화제의예능</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/favorite.png" alt="이달의 맛집" />
              <p>이달의 맛집</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/hoteldining.png" alt="호텔다이닝" />
              <p>호텔다이닝</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/cake.png" alt="케이크" />
              <p>케이크</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/person123.png" alt="모임예약" />
              <p>모임예약</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/vegan.png" alt="레드리본맛집" />
              <p>비건식당</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/popuppng.png" alt="팝업스토어" />
              <p>팝업스토어</p>
            </div>
            <div className="user-menu-item">
              <img src="/image/gift.png" alt="스페셜혜택" />
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
            <a
              href="#"
              className="view-all"
              onClick={() => navigate("/userMain/searchList")}
            >
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
                <img
                  src={
                    store[0]
                      ? `${backServer}/store/storeList/view/${store[0].siFilepath}`
                      : ""
                  }
                  alt="Slide 5"
                />
                <div className="dining-deal-info">
                  <div className="store-item">
                    <span>{store && store[0] ? store[0].storeAddr : ""}</span>
                    <h3>{store && store[0] ? store[0].storeName : ""}</h3>
                    <p>
                      <span className="original-price">
                        {store && store[0] ? `${store[0].menuPrice} 원` : ""}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="dining-deal-content">
                <img
                  src={
                    store[1]
                      ? `${backServer}/store/storeList/view/${store[1].siFilepath}`
                      : ""
                  }
                  alt="Slide 6"
                />
                <div className="dining-deal-info">
                  <div className="store-item">
                    <span>{store && store[1] ? store[1].storeAddr : ""}</span>
                    <h3>{store && store[1] ? store[1].storeName : ""}</h3>
                    <p>
                      <span className="original-price">
                        {store && store[1] ? `${store[1].menuPrice} 원` : ""}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="dining-deal-content">
                <img
                  src={
                    store[2]
                      ? `${backServer}/store/storeList/view/${store[2].siFilepath}`
                      : ""
                  }
                  alt="Slide 7"
                />
                <div className="dining-deal-info">
                  <div className="store-item">
                    <span>{store && store[2] ? store[2].storeAddr : ""}</span>
                    <h3>{store && store[2] ? store[2].storeName : ""}</h3>
                    <p>
                      <span className="original-price">
                        {store && store[2] ? `${store[2].menuPrice} 원` : ""}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {/* 가격대별 BEST 섹션 */}
        <section className="price-best-section">
          <h2>종류별 BEST</h2>
          <div className="best-section-tabs">
            <button
              className={`best-section-tab ${
                activeTab === "below-30" ? "active" : ""
              }`}
              onClick={() => handleTabClick("below-30")}
            >
              한식
            </button>
            <button
              className={`best-section-tab ${
                activeTab === "30-50" ? "active" : ""
              }`}
              onClick={() => handleTabClick("30-50")}
            >
              중식
            </button>
            <button
              className={`best-section-tab ${
                activeTab === "50-100" ? "active" : ""
              }`}
              onClick={() => handleTabClick("50-100")}
            >
              일식
            </button>
            <button
              className={`best-section-tab ${
                activeTab === "above-100" ? "active" : ""
              }`}
              onClick={() => handleTabClick("above-100")}
            >
              양식
            </button>
          </div>

          <div className="best-list-container">
            {/* 3만원 이하 섹션 */}
            {activeTab === "below-30" && (
              <ul className="best-list">
                <div className="dining-deal-content">
                  {store.map((item, index) => (
                    <div className="store-item" key={index}>
                      <img
                        src={
                          item
                            ? `${backServer}/store/storeList/view/${item.siFilepath}`
                            : ""
                        }
                      />
                      <div className="dining-deal-info">
                        <span>{item ? item.storeAddr : ""}</span>
                        <h3>{item ? item.storeName : ""}</h3>
                        <p>
                          <span className="original-price">
                            {item ? `${item.menuPrice} 원` : ""}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ul>
            )}

            {/* 3-5만원 섹션 */}
            {activeTab === "30-50" && (
              <ul className="best-list">
                <div className="dining-deal-content">
                  {store.map((item, index) => (
                    <div className="store-item" key={index}>
                      <img
                        src={
                          item
                            ? `${backServer}/store/storeList/view/${item.siFilepath}`
                            : ""
                        }
                      />
                      <div className="dining-deal-info">
                        <span>{item ? item.storeAddr : ""}</span>
                        <h3>{item ? item.storeName : ""}</h3>
                        <p>
                          <span className="original-price">
                            {item ? `${item.menuPrice} 원` : ""}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ul>
            )}

            {/* 5-10만원 섹션 */}
            {activeTab === "50-100" && (
              <ul className="best-list">
                <div className="dining-deal-content">
                  {store.map((item, index) => (
                    <div className="store-item" key={index}>
                      <img
                        src={
                          item
                            ? `${backServer}/store/storeList/view/${item.siFilepath}`
                            : ""
                        }
                      />
                      <div className="dining-deal-info">
                        <span>{item ? item.storeAddr : ""}</span>
                        <h3>{item ? item.storeName : ""}</h3>
                        <p>
                          <span className="original-price">
                            {item ? `${item.menuPrice} 원` : ""}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ul>
            )}

            {/* 10만원 이상 섹션 */}
            {activeTab === "above-100" && (
              <ul className="best-list">
                <div className="dining-deal-content">
                  {store.map((item, index) => (
                    <div className="store-item" key={index}>
                      <img
                        src={
                          item
                            ? `${backServer}/store/storeList/view/${item.siFilepath}`
                            : ""
                        }
                      />
                      <div className="dining-deal-info">
                        <span>{item ? item.storeAddr : ""}</span>
                        <h3>{item ? item.storeName : ""}</h3>
                        <p>
                          <span className="original-price">
                            {item ? `${item.menuPrice} 원` : ""}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
      {/* <Routes>
        <Route
          path="menuview/:storeNo/*"
          element={<MenuView store={store} />}
        />
      </Routes> */}
    </>
  );
};
export default UserMain;
