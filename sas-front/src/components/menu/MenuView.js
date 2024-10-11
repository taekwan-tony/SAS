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
  ReservationMain,
  ReservationModalFirst,
  ReservationModalSecond,
} from "../reservation/ReservationMain";
import { he } from "date-fns/locale";
import { ReviewContent } from "../user/MypageContent";
import QuillEditor from "../utils/QuillEditor";
import { Rating, Stack } from "@mui/material";
import PageNavi from "../utils/PagiNavi";
const { kakao } = window;

const MenuView = () => {
  const params = useParams();
  const storeNo = params.storeNo;
  const [store, setStore] = useState({ storeNo: storeNo });
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  const [isFavoriteChange, setIsFavoriteChange] = useState(false);
  const [sifilePathList, setSifilepathList] = useState([]);
  useEffect(() => {
    //console.log("userNo:", loginUserNo);
    axios
      .get(`${backServer}/store/storeNo/${store.storeNo}/userNo/${loginUserNo}`)
      .then((res) => {
        //console.log(res.data);
        setStore(res.data);
      })
      .catch((err) => {
        console.log(2);
      });
  }, [loginUserNo, isFavoriteChange]);
  const changeFavorite = () => {
    //console.log(loginUserNo);
    if (loginUserNo !== 0) {
      //console.log(1);
      if (store.favorite) {
        // console.log(2);
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
        //console.log(4);
      } else {
        //console.log(3);
        axios
          .post(`${backServer}/favorite`, {
            storeNo: store.storeNo,
            userNo: loginUserNo,
          })
          .then((res) => {
            // console.log(res);
            if (res.data) {
              setIsFavoriteChange(!isFavoriteChange);
              handleOpen("즐겨찾기가 기본폴더에 저장되었습니다.", action);
              // setStore({ ...store, favorite: true });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  // 예약 모달창 위한 설정-수진
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
    //console.log(snackbarState);
    setSnackbarState({
      ...snackbarState,
      message: message,
      open: true,
      action: action,
    });
  };
  // 즐겨찾기 등록시 기본 폴더 외에 다른 폴더로 변경하고자 할때
  // 즐겨찾기 폴더 목록 가져오는 useState
  const [favoriteFolderList, setFavoriteFolderList] = useState({});
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState(false);
  const openChangeFFolderModal = () => {
    setIsFavoriteModalOpen(!isFavoriteModalOpen);
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
        //console.log(res.data);
        setFavoriteFolderList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginUserNo, checkAddFolder]);
  // 변경할 즐겨찾기 목록 정보 가져오기]
  const [changeFolder, setChangeFolder] = useState({
    userNo: loginUserNo,
    favoriteFolderNo: 0,
  });
  useEffect(() => {
    setChangeFolder({ ...changeFolder, userNo: loginUserNo });
  }, [loginUserNo]);
  // 즐겨찾기 목록 폴더 이동
  const changeFavoriteFolder = () => {
    // const form = new FormData();
    // form.append("userNo", changeFolder.userNo);
    // form.append("favoriteFolderNo", changeFolder.favoriteFolderNo);
    axios
      .patch(`${backServer}/favorite/changeFolder`, changeFolder)
      .then((res) => {
        //console.log(res.data);
        if (res.data) {
          setIsFavoriteModalOpen(false);
          handleOpen("즐겨찾기 이동이 완료되었습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 즐겨찾기 폴더 추가
  const [addFolder, setAddFolder] = useState({
    favoriteFolderName: "",
    userNo: loginUserNo,
  });
  const changeInputVal = (e) => {
    setAddFolder({ ...addFolder, [e.target.name]: e.target.value });
  };
  // 즐겨찾기 폴더 추가 폼
  const favoriteRef = useRef(null);
  const showForm = () => {
    favoriteRef.current.classList.add("show");
  };
  const addFavoriteFolder = () => {
    if (
      addFolder.favoriteFolderName !== null &&
      addFolder.favoriteFolderName !== ""
    ) {
      // const form = new FormData();
      // form.append("favoriteFolderName", addFolder.favoriteFolderName);
      // form.append("userNo", addFolder.userNo);
      //console.log(addFolder);
      axios
        .post(`${backServer}/favorite/insertFolder`, addFolder)
        .then((res) => {
          if (res.data) {
            setAddFolder({
              favoriteFolderName: "",
              userNo: loginUserNo,
            });
            setCheckAddFolder(!checkAddFolder);
            favoriteRef.current.classList.remove("show");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="menuview-bigwrap">
      <div className="menuview-wrap">
        <section className="section-menu">
          <div className="menu-image">
            <img
              src={`${backServer}/store/${store.siFilepath}`}
              alt="가게 로고"
            />
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

          <Route path="review" element={<MenuReview store={store} />}></Route>
          <Route path="info" element={<Menuinfo store={store} />}></Route>
        </Routes>
      }
      {/* 덮어쓰기영 */}
      <span></span>
      <div className="reservation-button">
        <span className="material-icons page-item" onClick={changeFavorite}>
          {store.favorite ? "bookmark" : "bookmark_border"}
        </span>
        {/* <span className="material-icons page-item">share</span> */}
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
          <ReservationMain
            setIsReserveModalOpen={setIsReserveModalOpen}
            isReserveModalOpen={isReserveModalOpen}
            storeNo={store.storeNo}
            storeName={store.storeName}
          />
        </Modal>
      ) : (
        ""
      )}
      {/* 예약 모달창 끝 */}
      {/* 즐겨찾기 모달창-수진 */}
      {isFavoriteModalOpen ? (
        <Modal
          isOpen={true}
          ariaHideApp={false}
          onRequestClose={() => {
            setIsFavoriteModalOpen(false);
          }}
          style={customFavoriteModal}
        >
          <div className="favorite-folder-modal">
            <h2 className="modal-title">즐겨찾기 목록</h2>
            <div className="folder-content">
              {favoriteFolderList.map((folder, index) => {
                const changeChecked = () => {
                  setChangeFolder({
                    ...changeFolder,
                    favoriteFolderNo: folder.favoriteFolderNo,
                  });
                  //console.log(changeFolder);
                };
                return (
                  <div className="folder-item-box" key={"folder" + index}>
                    <input
                      className="input-radio-box"
                      type="radio"
                      name="folder-name"
                      id={index}
                      value={folder.favoriteFolderName}
                      onChange={changeChecked}
                    />
                    <label className="radio-box-content" htmlFor={index}>
                      {folder.favoriteFolderName}
                    </label>
                  </div>
                );
              })}
              <form
                ref={favoriteRef}
                action=""
                className="addFolder"
                onSubmit={(e) => {
                  e.preventDefault();
                  addFavoriteFolder();
                }}
              >
                <input
                  type="text"
                  name="favoriteFolderName"
                  value={addFolder.favoriteFolderName}
                  onChange={changeInputVal}
                />
                <input type="hidden" name="userNo" value={addFolder.userNo} />
              </form>
              <button className="add-folder-btn" onClick={showForm}>
                + 새 목록 추가
              </button>
            </div>
            <div className="btn">
              <button className="btn-main" onClick={changeFavoriteFolder}>
                이동
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

const amenitiesImages = {
  "주차 가능": "/image/주차가능.png",
  "반려동물 동반": "/image/반려동물동반.png",
  단체석: "/image/단체석.png",
  키즈존: "/image/키즈존.png",
};

const MenuMain = (props) => {
  const store = props.store;
  //console.log(store);

  return (
    <main className="main-menu-home">
      <div className="facilities">
        <h2>편의시설</h2>
        <div className="amenities">
          {store.storeAmenityList
            ? store.storeAmenityList.map((amenity, index) => {
                return (
                  <div key={"amenity" + index}>
                    {amenity.amenities}
                    {amenitiesImages[amenity.amenities] && (
                      <img
                        src={amenitiesImages[amenity.amenities]}
                        alt={amenity.amenities}
                        style={{
                          width: "50px",
                          height: "auto",
                          marginLeft: "5px",
                        }}
                      />
                    )}
                  </div>
                );
              })
            : ""}
        </div>
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

const Menu = (props) => {
  const store = props.store;
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
            //console.log(index, menuItem);
            return (
              <div className="menu-item">
                <img
                  src={`${backServer}/store/storeMenu/${menuItem.menuPhoto}`}
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
                src={`${backServer}/store/storeMenu/${menuItem.menuPhoto}`}
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
    </div>
  );
};

//리뷰 내역
const MenuReview = (props) => {
  const review = props.review;
  const store = props.store;
  const [userNickname, setUserNickname] = useRecoilState(
    loginUserNicknameState
  );
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reviewList, setReviewList] = useState([]);

  const [changedReview, setChangedReview] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        store
          ? `${backServer}/review/storeNo/${store.storeNo}/getReviewList`
          : `${backServer}/review/userNickname/${userNickname}/getReviewList`
      )
      .then((res) => {
        //console.log(res);
        res.data.forEach((review, index) => {
          review.isExpanded = false;
        });
        // console.log(res.data);
        setReviewList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userNickname, changedReview]);

  return (
    <div className="menu-review">
      {reviewList
        ? reviewList.map((review, index) => {
            // const [isExpanded, setIsExpanded] = useState(false);
            // review.isExpanded = false;
            return (
              <ModifyReview
                key={"review-" + index}
                review={review}
                changedReview={changedReview}
                setChangedReview={setChangedReview}
              />
            );
            // const isExpanded = false;
          })
        : ""}
    </div>
  );
};
//리뷰수정
const ModifyReview = (props) => {
  const [review, setReview] = useState(props.review);
  const store = props.store;
  const { changedReview, setChangedReview } = props;
  const [userNickname, setUserNickname] = useRecoilState(
    loginUserNicknameState
  );
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const update = userNickname === review.userNickname;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [modifyType, setModifyType] = useState(0);
  const [isModify, setIsModify] = useState(true);
  const regExp = /[</p>]/;

  //리뷰삭제
  const deleteReview = () => {
    Swal.fire({
      title: "리뷰를 삭제하시겠습니까 ?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "삭제",
    }).then((result) => {
      //console.log(result);
      if (result.isConfirmed) {
        axios
          .delete(`${backServer}/review/${review.reviewNo}`)
          .then((res) => {
            //console.log(res);
            if (res.data) {
              Swal.fire({
                title: "삭제가 완료되었습니다.",
                text: "리뷰를 삭제했습니다",
                icon: "success",
              });
              setChangedReview(!changedReview);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };
  //의존성배열안에있는 값이 변하면 다시 유즈이펙트가 돈다 .
  const updateReview = () => {
    if (modifyType === 0) {
      setIsModify(false);
      setModifyType(1);
    } else {
      const form = new FormData();
      form.append("reviewContent", editContent);
      form.append("reviewNo", review.reviewNo);
      form.append("reviewScore", review.reviewScore);
      //console.log(review.reviewScore);
      //console.log(editContent);
      axios
        .patch(`${backServer}/review/usermain/mypage/updateReview`, form)
        .then((res) => {
          //console.log(res);
          if (res.data > 0) {
            Swal.fire({
              title: "리뷰 수정 완료",
              text: "리뷰를 수정했습니다",
              icon: "success",
            }).then(() => {
              setModifyType(0);
              setChangedReview(!changedReview);
              setReview({ ...review, reviewContent: editContent });
              navigate(`/usermain/mypage/myreview`);
            });
          }
        })
        .catch((err) => {
          console.log("에러뜸");
        });
    }
  };

  const [editContent, setEditContent] = useState(review.reviewContent);

  return (
    <section className="review-box-container">
      <div className="review-content">
        <div className="review-content-img">
          <img
            src={
              review.userPhoto
                ? `${backServer}/userProfile/${review.userPhoto}`
                : "/image/프로필 기본.png"
            }
            alt=""
          />
        </div>
        <div className="review-information-wrap">
          <div className="review-header">
            {review.userNickname}
            {update ? <div className="review-manager-container"></div> : ""}
          </div>
          <div className="review-name">{review.storeName}</div>
          <Stack spacing={1}>
            <Rating
              name="half-rating-read"
              defaultValue={review.reviewScore}
              precision={0.5}
              readOnly={isModify}
              onChange={(e) => {
                setReview({ ...review, reviewScore: e.target.value });
              }}
            />
          </Stack>
        </div>
        <div className="review-manager-status">
          <button className="review-manager-update" onClick={updateReview}>
            수정
          </button>
          <button className="review-manager-delete" onClick={deleteReview}>
            삭제
          </button>
        </div>
      </div>
      <div className="review-content-one-wrap">
        <p>
          {modifyType === 0 ? (
            <p
              dangerouslySetInnerHTML={{ __html: review.reviewContent }}
              className="reviewContent-text"
            ></p>
          ) : (
            // <input type="text" value={review.reviewContent}></input>
            // {}
            <QuillEditor
              noticeContent={editContent}
              setNoticeContent={setEditContent}
            />
          )}
        </p>
      </div>
    </section>
  );
};

const Menuinfo = (props) => {
  const store = props.store;
  const mood = props.mood;
  return (
    <div className="menu-info">
      <div className="menu-intro">
        <h2>매장소개</h2>
        <p>{store.storeIntroduce}</p>
        <hr></hr>
      </div>
      <h2>매장정보</h2>

      {
        <div className="store-menu-view-kakao">
          {store.storeAddr ? (
            <KaKao
              addr={store.storeAddr}
              name={store.storeName}
              center={{ lat: 33.450701, lng: 126.570667 }}
              style={{ width: "400px", height: "232px" }}
              level={3}
            />
          ) : (
            ""
          )}
        </div>
      }
      <p>{store.storeAddr}</p>
      <h2>전화번호</h2>
      <div className="storephone">
        <p>{store.storePhone}</p>
      </div>
      <div className="store-mood">
        <h1>분위기</h1>
        {store.storeMoodList
          ? store.storeMoodList.map((mood, index) => {
              return <div key={"mood" + index}>{mood.mood}</div>;
            })
          : ""}
      </div>
    </div>
  );
};

export { MenuView, MenuReview };
