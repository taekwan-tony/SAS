import ReactQuill, { Quill } from "react-quill";
import Modal from "react-modal";
import { useState, useEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "../menu/menuview.css";
import "./mypage.css";
import Swal from "sweetalert2";

import {
  EmptyBox,
  MypageFavorite,
  Profile,
  ReserveContent,
  ReviewContent,
} from "./MypageContent";
import {
  isUserLoginState,
  loginUserIdState,
  loginUserNicknameState,
  loginUserNoState,
} from "../utils/RecoilData";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { switchClasses } from "@mui/material";
import { MenuReview } from "../menu/MenuView";
import ImageResize from "@looop/quill-image-resize-module-react";
import QuillEditor from "../utils/QuillEditor";
import PageNavi from "../utils/PagiNavi";
import { CleaningServices } from "@mui/icons-material";
import FavoriteMain from "./FavoriteMain";
import MypageUpdate from "./MypageUpdate";
import ReportModal from "../report/ReportModal";
import { ReservationMain } from "../reservation/ReservationMain";

const Mypage = (props) => {
  // 프로필 업데이트 체크위한 준비
  const { checkPhotoUpdate, setCheckPhotoUpdate } = props;
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  //유저 정보 한번에 가져오기
  const [user, setUser] = useState({});
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [favoriteFolder, setFavoriteFolder] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    // console.log(loginUserId);
    axios
      .get(`${backServer}/user/userNo/${loginUserNo}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setFavoriteFolder(
          res.data.favoriteFolderList &&
            favoriteFolder.favoriteFolderNo &&
            res.data.favoriteFolderList.filter((favorite, index) => {
              return (
                favorite.favoriteFolderNo === favoriteFolder.favoriteFolderNo
              );
            })[0] != null
            ? res.data.favoriteFolderList.filter((favorite, index) => {
                return (
                  favorite.favoriteFolderNo === favoriteFolder.favoriteFolderNo
                );
              })[0]
            : res.data.favoriteFolderList
            ? res.data.favoriteFolderList[0]
            : {}
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginUserNo, checkUpdate]);
  // 즐겨찾기 폴더 추가 위한 모달 구현(즐겨찾기 페이지, 마이페이지 메인에 모두 들어갈것이므로 그냥 여기서 만들고 여는 함수만 보내주겠음)
  console.log(favoriteFolder);
  const [addFolder, setAddFolder] = useState({
    favoriteFolderName: "",
    userNo: loginUserNo,
  });

  useEffect(() => {
    setAddFolder({ ...addFolder, userNo: loginUserNo });
  }, [loginUserNo]);
  const [isAddFolderModal, setIsAddFolderModal] = useState(false);
  const addFolderModalOpen = () => {
    setIsAddFolderModal(true);
  };
  const addFolderModalClose = () => {
    setIsAddFolderModal(false);
    setAddFolder({ favoriteFolderName: "", userNo: loginUserNo });
  };
  const customAddFolderModal = {
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
      width: "500px",
      height: "290px",
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
  return (
    <div className="mypage-main">
      <Routes>
        <Route
          path=""
          element={
            <MypageMain
              addFolderModalOpen={addFolderModalOpen}
              checkAddFolder={checkUpdate}
              user={user}
              setUser={setUser}
              favoriteFolder={favoriteFolder}
              setFavoriteFolder={setFavoriteFolder}
              checkPhotoUpdate={checkPhotoUpdate}
              setCheckPhotoUpdate={setCheckPhotoUpdate}
            />
          }
        ></Route>
        <Route path="resview" element={<ReservationView />}></Route>
        <Route
          path="reviewWrite/:storeNo/:reserveNo"
          element={<ReviewWrite />}
        />
        <Route path="myreview" element={<MenuReview />} />
        <Route
          path="update/*"
          element={
            <MypageUpdate
              checkUpdate={checkUpdate}
              setCheckUpdate={setCheckUpdate}
            />
          }
        />
        <Route
          path="favorite"
          element={
            <FavoriteMain
              addFolderModalOpen={addFolderModalOpen}
              checkAddFolder={checkUpdate}
              setCheckUpdate={setCheckUpdate}
              favoriteFolderList={user.favoriteFolderList}
              favoriteCount={user.favoriteCount}
              favoriteFolder={favoriteFolder}
              setFavoriteFolder={setFavoriteFolder}
            />
          }
        ></Route>
      </Routes>
      {isAddFolderModal ? (
        <Modal
          isOpen={true}
          ariaHideApp={false}
          onRequestClose={() => {
            addFolderModalClose();
          }}
          style={customAddFolderModal}
        >
          <AddFolderModal
            addFolder={addFolder}
            setAddFolder={setAddFolder}
            addFolderModalClose={addFolderModalClose}
            setCheckAddFolder={setCheckUpdate}
            checkAddFolder={checkUpdate}
          />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

const AddFolderModal = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const {
    addFolder,
    setAddFolder,
    addFolderModalClose,
    setCheckAddFolder,
    checkAddFolder,
  } = props;
  const addFavoriteFolder = () => {
    if (
      addFolder.favoriteFolderName != null ||
      addFolder.favoriteFolderName !== ""
    ) {
      axios
        .get(
          `${backServer}/favorite/userNo/${addFolder.userNo}/favoriteFolderName/${addFolder.favoriteFolderName}/checkFolder`
        )
        .then((res) => {
          if (res.data) {
            axios
              .post(`${backServer}/favorite/insertFolder`, addFolder)
              .then((res) => {
                if (res.data) {
                  Swal.fire({
                    title: "즐겨찾기 목록 추가 완료",
                    icon: "success",
                    confirmButtonColor: "var(--main1)",
                  }).then(() => {
                    addFolderModalClose();
                    setCheckAddFolder(!checkAddFolder);
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            Swal.fire({
              title: "즐겨찾기 목록 이름 중복",
              text: "중복된 이름은 사용하실 수 없습니다.",
              icon: "warning",
              confirmButtonColor: "var(--main1)",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="addFavoriteFolder-wrap">
      <div className="addFavoriteFolder-modal-header">
        <h2>즐겨찾기 목록 추가</h2>
      </div>
      <div className="addFavoriteFolder-modal-content">
        <div className="input-box">
          <label htmlFor="favoriteFolderName">새 즐겨찾기 목록 이름 </label>
          <input
            type="text"
            id="favoriteFolderName"
            value={addFolder.favoriteFolderName}
            onChange={(e) => {
              setAddFolder({
                ...addFolder,
                favoriteFolderName: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="addFavoriteFolder-modal-footer">
        <button className="btn-sub round" onClick={addFolderModalClose}>
          취소
        </button>
        <button className="btn-main round" onClick={addFavoriteFolder}>
          확인
        </button>
      </div>
    </div>
  );
};

const MypageMain = (props) => {
  const {
    user,
    setUser,
    addFolderModalOpen,
    checkAddFolder,
    setFavoriteFolder,
    checkPhotoUpdate,
    setCheckPhotoUpdate,
  } = props;
  return (
    <>
      <Profile
        user={user}
        setUser={setUser}
        checkPhotoUpdate={checkPhotoUpdate}
        setCheckPhotoUpdate={setCheckPhotoUpdate}
      />
      <section className="reserve-list mypage-list-wrap">
        <Link to="resview">더보기</Link>
        <h3 className="title">
          나의 예약{" "}
          <span className="count">
            {user.reservationCount ? user.reservationCount : 0}
          </span>
        </h3>
        {user.reservationList ? (
          user.reservationList.length === 0 ? (
            <EmptyBox text={"방문 전인 예약이 존재하지 않습니다"} />
          ) : (
            <div className="reserve-content-wrap list-content">
              {user.reservationList.map((reserve, index) => {
                return (
                  <ReserveContent
                    key={"reserveContent" + index}
                    reserve={reserve}
                  />
                );
              })}
            </div>
          )
        ) : (
          <EmptyBox text={"진행중인 예약이 존재하지 않습니다"} />
        )}
      </section>
      <section className="mypage-list-wrap favorite-list">
        <Link to="favorite">더보기</Link>
        <h3 className="title">
          즐겨찾기 목록{" "}
          <span className="count">
            {user.favoriteFolderList ? user.favoriteFolderList.length : 0}
          </span>
        </h3>
        <MypageFavorite
          favoriteFolderList={user.favoriteFolderList}
          addFolderModalOpen={addFolderModalOpen}
          setFavoriteFolder={setFavoriteFolder}
        />
      </section>
      <section className="mypage-list-wrap review-list">
        <Link to="myreview">더보기</Link>
        <h3 className="title">
          나의 리뷰{" "}
          <span className="count">
            {user.reviewList ? user.reviewList.length : 0}
          </span>
        </h3>
        <div className="list-content review-content-wrap">
          {user.reviewList
            ? user.reviewList.map((review, index) => {
                return <ReviewContent review={review} />;
              })
            : ""}
        </div>
      </section>
    </>
  );
};

const ReservationView = () => {
  const [store, setStore] = useState("");
  const [reservationList, setReservationList] = useState([]);
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [isReservationUpdate, setIsReservationUpdate] = useState(false);
  useEffect(() => {
    console.log(loginUserId);
    axios
      .get(`${backServer}/reservation/view/${reqPage}/${loginUserId}`)
      .then((res) => {
        console.log(res);
        setReservationList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginUserId, reqPage, isReservationUpdate]);
  const navigate = useNavigate();
  // 신고 모달
  const [reserveNo, setReserveNo] = useState(0);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const isUserLogin = useRecoilValue(isUserLoginState);
  const closeReport = () => {
    setReportModalOpen(false);
  };
  const customReportModal = {
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
      width: "500px",
      height: "370px",
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
  // 예약변경 모달 위한 설정
  const [reservationUpdateInfo, setReservationUpdateInfo] = useState({});
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

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

  return (
    <div className="res-view">
      <section>
        <div className="res-history">
          <h1>예약내역</h1>
          <div className="res-list-wrap">
            {reservationList.map((reservation, index) => {
              const reserveDate = reservation.reserveDate
                ? new Date(reservation.reserveDate).getTime()
                : new Date().getTime();
              const today = new Date().getTime();
              const dDay = Math.ceil(
                (reserveDate - today) / (1000 * 60 * 60 * 24)
              );
              const date = reservation.reserveDateString
                ? `${reservation.reserveDateString.substring(
                    0,
                    4
                  )}년 ${reservation.reserveDateString.substring(
                    5,
                    7
                  )}월 ${reservation.reserveDateString.substring(8)}일`
                : "";
              const status =
                reservation.reserveStatus != null
                  ? reservation.reserveStatus === 0
                    ? "예약 완료"
                    : reservation.reserveStatus === 1
                    ? "방문 완료"
                    : "예약 취소"
                  : "";
              const openReport = () => {
                setReserveNo(reservation.reserveNo);
                setReportModalOpen(true);
              };
              // 예약 변경 모달창 열기
              const goTOReserve = () => {
                setReservationUpdateInfo({
                  ...reservation,
                  isUpdate: true,
                });
                setIsReserveModalOpen(!isReserveModalOpen);
              };
              // 예약취소버튼
              const reservationCancel = () => {
                Swal.fire({
                  title: "예약을 취소하시겠습니까 ?",
                  icon: "question",
                  showCancelButton: true,
                  cancelButtonText: "취소",
                  cancelButtonColor: "var(--font2)",
                  confirmButtonText: "확인",
                  confirmButtonColor: "var(--main1)",
                }).then((res) => {
                  if (res.isConfirmed) {
                    let isRefund = false;
                    if (reservation.reservePayStatus !== 0) {
                      //결제 취소 로직(서버에서..)
                      axios
                        .post(
                          `${backServer}/reservation/getRefundInfo`,
                          reservation
                        )
                        .then((res) => {
                          if (res.data != null) {
                            const payment = res.data;
                            Swal.fire({
                              title: "예약금 환불",
                              text: `${payment.payPrice} 원이 환불됩니다`,
                              icon: "info",
                              iconColor: "var(--main1)",
                              confirmButtonText: "확인",
                              confirmButtonColor: "var(--main1)",
                            }).then(() => {
                              axios
                                .post(
                                  `${backServer}/reservation/refund`,
                                  payment
                                )
                                .then((res) => {
                                  if (res.data) {
                                    axios
                                      .patch(
                                        `${backServer}/reservation/cancel/${reservation.reserveNo}`
                                      )
                                      .then((res) => {
                                        console.log(res);
                                        if (res.data > 0) {
                                          Swal.fire({
                                            title: "예약취소 완료",
                                            text: "예약금은 익영업일에 환불 처리됩니다",
                                            icon: "success",
                                          }).then(() => {
                                            setIsReservationUpdate(
                                              !isReservationUpdate
                                            );
                                          });
                                        }
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                      });
                                  } else {
                                    Swal.fire({
                                      title: "시스템 오류",
                                      text: "결제 정보를 찾을 수 없습니다.",
                                      icon: "error",
                                      confirmButtonColor: "var(--main1)",
                                      confirmButtonText: "확인",
                                    });
                                  }
                                })
                                .catch((err) => {
                                  console.log(err);
                                  Swal.fire({
                                    title: "시스템 오류",
                                    text: "결제 정보를 찾을 수 없습니다.",
                                    icon: "error",
                                    confirmButtonColor: "var(--main1)",
                                    confirmButtonText: "확인",
                                  });
                                });
                            });
                          } else {
                            Swal.fire({
                              title: "시스템 오류",
                              text: "결제 정보를 찾을 수 없습니다.",
                              icon: "error",
                              confirmButtonColor: "var(--main1)",
                              confirmButtonText: "확인",
                            });
                          }
                        });
                    } else {
                      axios
                        .patch(
                          `${backServer}/reservation/cancel/${reservation.reserveNo}`
                        )
                        .then((res) => {
                          console.log(res);
                          if (res.data > 0) {
                            Swal.fire({
                              title: "예약취소 완료",
                              icon: "success",
                            }).then(() => {
                              setIsReservationUpdate(!isReservationUpdate);
                            });
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }
                  }
                });
              };
              return (
                <div
                  className="reservation-content"
                  key={"reservation" + index}
                >
                  <div className="res-btn">
                    <span
                      className="reserve-span round
            "
                    >
                      {status}
                    </span>
                    {/* <span
                      className="btn
              -main
            "
                      disabled
                    >
                      방문완료
                    </span> */}
                    <button
                      className="btn-main round"
                      onClick={() => {
                        navigate(
                          `/usermain/mypage/reviewWrite/${reservation.storeNo}/${reservation.reserveNo}`
                        );
                      }}
                    >
                      리뷰쓰기
                    </button>
                    <button
                      className="btn-main round
            "
                      onClick={openReport}
                    >
                      신고
                    </button>
                  </div>
                  <div className="res-content">
                    <img
                      src={`${backServer}/reservation/view/${reservation.storeImage}`}
                      alt="가게 로고"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <div className="res-menu">
                      <h2>{reservation.storeName}</h2>
                      <h2>결제정보</h2>
                      <p>예약인원 : {reservation.reservePeople}명</p>
                      <p>예약 시간 : {`${date} ${reservation.reserveTime}`}</p>
                    </div>
                  </div>
                  <div className="res-btn2">
                    <span className="reserve-span round">
                      {dDay > 0
                        ? `D-${dDay}`
                        : dDay === 0
                        ? "d-day"
                        : `D+${-dDay}`}
                    </span>
                    <button className="btn-main round" onClick={goTOReserve}>
                      예약변경
                    </button>
                    <button
                      className="btn-main round"
                      onClick={reservationCancel}
                    >
                      예약취소
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mypage-paging-wrap">
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </div>
      </section>
      {/* 매장 신고 모달 */}
      {reportModalOpen ? (
        <Modal
          isOpen={isUserLogin} //로그인, 예약한 매장 방문완료시 누를 수 있도록
          ariaHideApp={false}
          onRequestClose={() => {
            setReportModalOpen(false);
          }}
          style={customReportModal}
        >
          <ReportModal closeReport={closeReport} reserveNo={reserveNo} />
        </Modal>
      ) : (
        ""
      )}
      {/* 매장 신고 모달-끝 */}
      {/* 예약 변경 모달 */}
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
            storeNo={reservationUpdateInfo.storeNo}
            storeName={reservationUpdateInfo.storeName}
            reservationUpdateInfo={reservationUpdateInfo}
            isReservationUpdate={isReservationUpdate}
            setIsReservationUpdate={setIsReservationUpdate}
          />
        </Modal>
      ) : (
        ""
      )}
      {/* 예약 모달창 끝 */}
    </div>
  );
};

const labels = {
  1: "최악이에요.",

  2: "별로 추천하고 싶지 않아요.",

  3: "무난해요.",

  4: "맛있었어요, 다시 올 것 같아요.",

  5: "완벽해요, 강력 추천합니다!",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const HoverRating = ({ value, setValue, hover, setHover }) => {
  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.33 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ mt: 1, whiteSpace: "nowrap" }}>
          {labels[hover !== -1 ? hover : value]}
        </Box>
      )}
    </Box>
  );
};
const ReviewWrite = () => {
  const params = useParams();
  const storeNo = params.storeNo;
  const reserveNo = params.reserveNo;
  const navigate = useNavigate();
  const [loginUserNickname, setLoginUserNickname] = useRecoilState(
    loginUserNicknameState
  );
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [review, setReview] = useState({
    reviewContent: "",
    reviewScore: 2,
    userNickname: loginUserNickname,
    storeNo: storeNo,
    reserveNo: reserveNo,
  });
  console.log(review);
  const setContent = (content) => {
    console.log(content);
    setReview({ ...review, reviewContent: content });
  };
  console.log(review.reviewContent);
  const [title, setTitle] = useState("");
  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };
  const changeStarRating = (star) => {
    setReview({ ...review, reviewScore: star });
  };
  // const [ratingValue, setRatingValue] = useState(2);
  const [hover, setHover] = useState(-1);

  const handleSubmit = () => {
    axios
      .post(`${backServer}/review/usermain/mypage/myreview`, review)
      .then((res) => {
        console.log(res);
        if (res.data > 0) {
          Swal.fire({
            title: "감사합니다",
            text: "다음에 또 이용해주세요",
            icon: "success",
          }).then(() => {
            navigate("/usermain/mypage/myreview");
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ size: ["small", false, "large", "huge"] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
        ],
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    };
  }, []);
  return (
    <div className="review-container">
      <label htmlFor="message" className="label1">
        이용하신 매장은 어떠셨나요? 평점을 남겨주세요
      </label>
      <HoverRating
        value={review.reviewScore}
        setValue={changeStarRating}
        hover={hover}
        setHover={setHover}
      />
      <QuillEditor
        style={{ width: "450px", height: "232px", marginTop: "20px" }}
        //modules={{ toolbar: false }}
        value={review.reviewContent || ""}
        modules={modules}
        noticeContent={review.reviewContent}
        setNoticeContent={setContent}
        placeholder="레스토랑과 유저들에게 도움이 되는 따뜻한 리뷰를 작성해주세요."
      />
      <button
        type="submit"
        className="review-submit"
        style={{ marginTop: "80px" }}
        onClick={handleSubmit}
      >
        등록
      </button>
    </div>
  );
};

export default Mypage;
