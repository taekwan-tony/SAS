import { Link, Route, Routes, useParams } from "react-router-dom";
import "./menuview.css";
import { Map } from "react-kakao-maps-sdk";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { PiArrowFatLeft, PiStarFill, PiStarLight } from "react-icons/pi";
import axios from "axios";
import KaKao from "../utils/Kakao";
import { loginUserNicknameState, loginUserNoState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
const { kakao } = window;

const MenuView = () => {
  const params = useParams();
  const storeNo = params.storeNo;
  const [store, setStore] = useState({ storeNo: storeNo });
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  useEffect(() => {
    console.log("userNo:", loginUserNo);
    axios
      .get(`${backServer}/store/storeNo/${store.storeNo}/userNo/${loginUserNo}`)
      .then((res) => {
        // console.log(res.data);
        setStore(res.data);
      })
      .catch((err) => {});
  }, [loginUserNo]);
  const changeFavorite = () => {
    if (loginUserNo !== 0) {
      if (store.favorite) {
        axios
          .delete(
            `${backServer}/favorite/storeNo/${store.storeNo}/userNo/${loginUserNo}`
          )
          .then((res) => {
            console.log(res);
            if (res.data) {
              setStore({ ...store, favorite: false });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(`${backServer}/favorite/userNo/${loginUserNo}`)
          .then((res) => {
            console.log(res);
            if (res.data) {
              setStore({ ...store, favorite: true });
            }
          });
      }
    }
  };
  return (
    <div className="menuview-bigwrap">
      <div className="menuview-wrap">
        <section className="section-menu">
          <div className="menu-image">
            <img src="/image/국빱.jpg" alt="가게 로고" />
          </div>
          <div className="menuview-info">
            <p>{store.storeName}</p>
            <div className="schedule">
              <span className="material-icons">place</span>
              <p>{store.storeAddr}</p>
            </div>
            <p>{store.storeIntroduce}</p>
            <div className="schedule">
              <span className="material-icons">schedule</span>
              <p>{store.storeTime}</p>
            </div>
          </div>
        </section>
      </div>
      <hr></hr>
      <section className="section-menu">
        <ul className="menu-nav">
          <Link to="menuview">
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
        <hr></hr>
      </section>
      {
        <Routes>
          <Route path="menuview" element={<MenuMain store={store} />}></Route>
          <Route path="menunews" element={<Menunews store={store} />}></Route>
          <Route path="menu" element={<Menu store={store} />}></Route>
          <Route path="photo" element={<MenuPhoto store={store} />}></Route>
          <Route path="review" element={<MenuReview store={store} />}></Route>
          <Route path="info" element={<Menuinfo store={store} />}></Route>
        </Routes>
      }
      <div className="reservation-button">
        <span className="material-icons page-item">
          {store.favorite ? "bookmark" : "bookmark_border"}
        </span>
        <span className="material-icons page-item">share</span>
        <button className="reservation-btn">예약하기</button>
      </div>
    </div>
  );
};

const MenuMain = () => {
  return (
    <main className="main-menu-home">
      <div className="facilities">
        <h2>편의시설</h2>
        <div className="amenities">편의시설 이미지</div>
      </div>
    </main>
  );
};

const Menunews = (props) => {
  const store = props.store;
  return (
    <div className="news">
      <p>{store.storeIntroduce}</p>
    </div>
  );
};

const Menu = () => {
  const [store, setStore] = useState({ storeNo: 73 });
  const [menu, setMenu] = useState([]);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/store/storeNo/${store.storeNo}/menu`)
      .then((res) => {
        setMenu(res.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="menuview-menu">
      <div className="menu-board">
        <h2>메뉴판</h2>
        <div className="menu-board-items">
          {menu.map((menuItem, index) => {
            console.log(index, menuItem);
            return (
              <div className="menu-item">
                <img
                  src={menuItem.menuPhoto}
                  alt="메뉴"
                  style={{ width: "200px", height: "auto" }}
                />
                <p>{menuItem.menuName}</p>
                <p className="price">{menuItem.menuPrice + "원"}</p>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <h2>메뉴</h2>
      <div className="menu-board-items2">
        {menu.map((menuItem, index) => {
          return (
            <div className="menu-item">
              <img
                src={menuItem.menuPhoto}
                alt="메뉴"
                style={{ width: "200px", height: "auto" }}
              />
              <p>{menuItem.menuName}</p>
              <p className="price">{menuItem.menuPrice + "원"}</p>
              <p>{menuItem.menuInfo}</p>
            </div>
          );
        })}
      </div>
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
      <div className="menu-image2">
        <img src="" alt="가게 로고" />
        <img src="/image/youtube.png" alt="가게 로고" />
        <img src="/image/youtube.png" alt="가게 로고" />
        <img src="/image/youtube.png" alt="가게 로고" />
        <img src="/image/youtube.png" alt="가게 로고" />
      </div>
    </div>
  );
};

const MenuReview = (props) => {
  const store = props.store;
  const [userNickname, setUserNickname] = useRecoilState(
    loginUserNicknameState
  );
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    axios
      .get(
        store
          ? `${backServer}/review/storeNo/${store.storeNo}/getReviewList`
          : `${backServer}/review/userNickname/${userNickname}/getReviewList`
      )
      .then((res) => {
        console.log(res);
        res.data.forEach((review, index) => {
          review.isExpanded = false;
        });
        // console.log(res.data);
        setReviewList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="menu-review">
      {reviewList
        ? reviewList.map((review, index) => {
            // const [isExpanded, setIsExpanded] = useState(false);
            // review.isExpanded = false;

            // const isExpanded = false;
            const setIsExpanded = (param) => {
              console.log(param);
              review.isExpanded = param;
              console.log(review.isExpanded);
              // console.log(reviewList);
              setReviewList([...reviewList]);
            };
            const handleToggle = () => {
              console.log(review.isExpanded);
              setIsExpanded(!review.isExpanded);
              // setReviewList([...]);
            };
            const regExp = /[</p>]/;
            const displayText =
              review.isExpanded || review.reviewContent.length <= 50
                ? review.reviewContent
                : `${review.reviewContent.slice(0, 50)}</p>`;
            return (
              <section className="review-box-container">
                <div className="review-content">
                  <p>{review.userNickname}</p>
                  <p>이미지파일</p>
                  <p>
                    <p
                      dangerouslySetInnerHTML={{ __html: displayText }}
                      className="reviewContent-text"
                    ></p>
                    {review.reviewContent.length > 50 && (
                      <span className="toggle-button" onClick={handleToggle}>
                        {review.isExpanded ? "접기" : "더보기"}
                      </span>
                    )}
                  </p>
                  <button className="review-manager" onClick={ReviewModify}>
                    수정
                  </button>
                  <button className="review-manager">삭제</button>
                </div>
              </section>
            );
          })
        : ""}
    </div>
  );
};
const ReviewModify = (props) => {
  const setReview = props.setReview;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/review/usermain/mypage/myrview`)
      .then((res) => {
        console.log(res);
        setReview(res.data.reviewContent);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const Menuinfo = (props) => {
  const store = props.store;
  // const [store, setStore] = useState({ storeNo: 73 });
  // const backServer = process.env.REACT_APP_BACK_SERVER;

  // useEffect(() => {
  //   axios
  //     .get(`${backServer}/user/storeNo/${store.storeNo}`)
  //     .then((res) => {
  //       setStore(res.data);
  //     })
  //     .catch((err) => {});
  // }, []);
  // const
  return (
    <div className="menu-info">
      <div className="menu-intro">
        <h2>매장소개</h2>
        <p>{store.storeIntroduce}</p>
        <hr></hr>
      </div>
      <h2>매장정보</h2>

      {
        <KaKao
          addr={store.storeAddr}
          name={store.storeName}
          center={{ lat: 33.450701, lng: 126.570667 }}
          style={{ width: "400px", height: "232px" }}
          level={3}
        />
      }

      <p>{store.storeAddr}</p>
      <h2>편의시설</h2>
      <div className="facilities">
        <div className="amenities">
          <p>편의시설이미지</p>
        </div>
        <h2>전화번호</h2>
        <p>02-442-5597</p>
      </div>
    </div>
  );
};

export { MenuView, MenuReview };
