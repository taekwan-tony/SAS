// 예약 관련 모달창, 즐겨찾기 스낵바 위한 import
import DatePicker from "../utils/DatePicker";
import { format } from "date-fns";
import Modal from "react-modal";
import "../user/etc.css";
import "../reservation/reservationModal.css";
import Swal from "sweetalert2";
// 끝
import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom";
import "./menuview.css";
import { Map } from "react-kakao-maps-sdk";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { PiArrowFatLeft, PiStarFill, PiStarLight } from "react-icons/pi";
import axios from "axios";
import KaKao from "../utils/Kakao";
import {
  loginUserNicknameState,
  loginUserNoState,
  isUserLoginState,
  loginUserIdState,
} from "../utils/RecoilData";
import { useRecoilState, useRecoilValue } from "recoil";
import Snackbar from "@mui/material/Snackbar";
import {
  ReservationModalFirst,
  ReservationModalSecond,
} from "../reservation/ReservationMain";
import { he } from "date-fns/locale";
const { kakao } = window;

const MenuView = () => {
  const params = useParams();
  const storeNo = params.storeNo;
  const [store, setStore] = useState({ storeNo: storeNo });
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  const [isFavoriteChange, setIsFavoriteChange] = useState(false);

  useEffect(() => {
    console.log("userNo:", loginUserNo);
    axios
      .get(`${backServer}/store/storeNo/${store.storeNo}/userNo/${loginUserNo}`)
      .then((res) => {
        // console.log(res.data);
        setStore(res.data);
      })
      .catch((err) => {});
  }, [loginUserNo, isFavoriteChange]);
  const changeFavorite = () => {
    if (loginUserNo !== 0) {
      if (store.favorite) {
        axios
          .delete(
            `${backServer}/favorite/storeNo/${store.storeNo}/userNo/${loginUserNo}`
          )
          .then((res) => {
            // console.log(res);
            if (res.data) {
              // setStore({ ...store, favorite: false });
              setIsFavoriteChange(!isFavoriteChange);
              handleOpen("즐겨찾기가 해제되었습니다.");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(
            `${backServer}/favorite/storeNo/${store.storeNo}/userNo/${loginUserNo}`
          )
          .then((res) => {
            // console.log(res);
            if (res.data) {
              setIsFavoriteChange(!isFavoriteChange);
              handleOpen("즐겨찾기가 기본폴더에 저장되었습니다.", action);
              // setStore({ ...store, favorite: true });
            }
          });
      }
    }
  };

  // 예약 모달창 위한 설정-수진
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const goTOReserve = () => {
    setIsReserveModalOpen(!isReserveModalOpen);
  };
  const isUserLogin = useRecoilValue(isUserLoginState);
  // 모달창?
  const customReserveModal = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.2)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "1000px",
      height: "470px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "hidden",
    },
  };
  const [reservationPage, setReservationPage] = useState(1);
  const [reservation, setReservation] = useState({
    reserveDate: "",
    // 결제여부는 매장 상세에서 가져와야함
    reservePayStatus: 0,
    reservePeople: 1,
    //매장상세, 회원에서 가져와야 할 것들
    storeNo: 0,
    userId: loginUserId,
  });

  // 스낵바 연결-수진
  // 스낵바 설정(상태, 위치)
  const [snackbarState, setSnackbarState] = useState({
    oepn: false,
    vertical: "bottom",
    horizontal: "left",
    message: "",
  });
  //스낵창 열리는 조건=> 즐겨찾기 삭제, 등록 됐을때
  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };
  const handleOpen = (message, action) => {
    console.log(snackbarState);
    setSnackbarState({
      ...snackbarState,
      message: message,
      open: true,
      action: action,
    });
  };
  // 즐겨찾기 등록시 기본 폴더 외에 다른 폴더로 변경하고 자 할때
  // 즐겨찾기 폴더 목록 가져오는 useState
  const [favoriteFolderList, setFavoriteFolderList] = useState({});
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState(false);
  const openChangeFFolderModal = () => {
    setIsFavoriteModalOpen(!isFavoriteModalOpen);
    axios
      .get(
        `${backServer}/favorite/getFavoriteList/userNo/${loginUserNo}/getFavoriteList`
      )
      .then((res) => {
        console.log(res);
        setFavoriteFolderList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //버튼
  const action = (
    <button className="snackbar-btn" onClick={openChangeFFolderModal}>
      변경
    </button>
  );
  //즐겨찾기 모달 설정
  const customFavoriteModal = {
    ...customReserveModal,
    content: {
      ...customReserveModal.content,
      width: "300px",
      height: "400px",
    },
  };
  // 즐겨찾기에서 사용할 즐겨찾기 목록 가져오기
  const [checkAddFolder, setCheckAddFolder] = useState(false);
  useEffect(() => {
    axios
      .get(`${backServer}/favorite/userNo/${loginUserNo}/getFavoriteFolder`)
      .then((res) => {
        console.log(res.data);
        setFavoriteFolderList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginUserNo, checkAddFolder]);
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
        <span className="material-icons page-item" onClick={changeFavorite}>
          {store.favorite ? "bookmark" : "bookmark_border"}
        </span>
        <span className="material-icons page-item">share</span>
        <button className="reservation-btn" onClick={goTOReserve}>
          예약하기
        </button>
      </div>
      {/* 즐겨찾기 스낵바-수진 */}
      <Snackbar
        anchorOrigin={{
          vertical: snackbarState.vertical,
          horizontal: snackbarState.horizontal,
        }}
        autoHideDuration={2000}
        open={snackbarState.open}
        onClose={handleClose}
        message={snackbarState.message}
        action={snackbarState.action}
      />
      {/* 예약 모달창-수진 */}
      {isReserveModalOpen ? (
        <Modal
          isOpen={isUserLogin}
          ariaHideApp={false}
          onRequestClose={() => {
            setIsReserveModalOpen(false);
          }}
          style={customReserveModal}
        >
          {reservationPage === 1 ? (
            <ReservationModalFirst
              reservation={reservation}
              setReservation={setReservation}
              setReservationPage={setReservationPage}
              setIsReserveModalOpen={setIsReserveModalOpen}
            />
          ) : reservationPage === 2 ? (
            <ReservationModalSecond
              reservation={reservation}
              setReservationPage={setReservationPage}
              setIsReserveModalOpen={setIsReserveModalOpen}
              isReserveModalOpen={isReserveModalOpen}
            />
          ) : (
            ""
          )}
        </Modal>
      ) : (
        ""
      )}
      {/* 예약 모달창 끝 */}
      {/* 즐겨찾기 모달창-수진 */}
      {isFavoriteModalOpen ? (
        <Modal
          isOpen={true}
          onRequestClose={() => {
            setIsFavoriteModalOpen(false);
          }}
          style={customFavoriteModal}
        >
          <h2 className="modal-title">즐겨찾기 폴더 이동하기</h2>
          <div className="folder-content"></div>
        </Modal>
      ) : (
        ""
      )}
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
  const navigate = useNavigate();
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

            //리뷰 수정
            const updateReview = (props) => {
              const review = props.review;
              const reviewNo = props.reviewNo;
              const reviewScore = props.reviewScore;
              const reviewContent = props.reviewContent;
              const filePath = props.filePath;

              const form = new FormData();
              form.append("reviewNo", reviewNo);
              form.append("reviewScore", reviewScore);
              form.append("reviewContent", reviewContent);
              form.append("filepath", filePath);

              axios
                .patch(
                  `${backServer}/review/usermain/mypage/myreview/${review.reviewNo}`,
                  form
                )
                .then((res) => {
                  console.log(res);
                  if (res.data > 0) {
                    Swal.fire({
                      title: "리뷰 수정 완료",
                      text: "리뷰를 수정했습니다",
                      icon: "success",
                    }).then(() => {
                      navigate(`/usermain/mypage/myreview`);
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            };
            return (
              <section className="review-box-container">
                <div className="review-content">
                  <p>{review.userNickname}</p>

                  <p>
                    <p
                      dangerouslySetInnerHTML={{ __html: review.reviewContent }}
                      className="reviewContent-text"
                    ></p>
                  </p>
                  <button className="review-manager" onClick={updateReview}>
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
