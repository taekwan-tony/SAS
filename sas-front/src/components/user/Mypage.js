import ReactQuill, { Quill } from "react-quill";
import { useState, useEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import { Link, Route, Routes } from "react-router-dom";
import "../menu/menuview.css";
import "./mypage.css";
import Swal, { swal } from "sweetalert2";

import {
  EmptyBox,
  MypageFavorite,
  Profile,
  ReserveContent,
  ReviewContent,
} from "./MypageContent";
import {
  loginUserIdState,
  loginUserNicknameState,
  loginUserNoState,
} from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { switchClasses } from "@mui/material";
import { MenuReview } from "../menu/MenuView";
import ImageResize from "@looop/quill-image-resize-module-react";
import QuillEditor from "../utils/QuillEditor";

const Mypage = () => {
  return (
    <div className="mypage-main">
      <Routes>
        <Route path="" element={<MypageMain />}></Route>
        <Route path="resview" element={<ReservationView />}></Route>
        <Route path="reviewWrite" element={<ReviewWrite />} />
        <Route path="myreview" element={<MenuReview />} />
      </Routes>
    </div>
  );
};
const MypageMain = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const [user, setUser] = useState({});
  useEffect(() => {
    // console.log(loginUserId);
    axios
      .get(`${backServer}/user/userNo/${loginUserNo}`)
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginUserNo]);
  return (
    <>
      <Profile user={user} setUser={setUser} />
      <section className="reserve-list mypage-list-wrap">
        <Link to="resview">더보기</Link>
        <h3 className="title">
          나의 예약{" "}
          <span className="count">
            {user.reservationList ? user.reservationList.length : 0}
          </span>
        </h3>

        {user.reservationList ? (
          user.reservationList.length === 0 ? (
            <EmptyBox text={"진행중인 예약이 존재하지 않습니다"} />
          ) : (
            <div className="reserve-content-wrap list-content">
              {user.reservationList.map((reserve, index) => {
                return <ReserveContent key={"reserveContent" + index} />;
              })}
            </div>
          )
        ) : (
          <EmptyBox text={"진행중인 예약이 존재하지 않습니다"} />
        )}
      </section>
      <section className="mypage-list-wrap favorite-list">
        <Link to="#">더보기</Link>
        <h3 className="title">
          즐겨찾기{" "}
          <span className="count">
            {user.favoriteFolderList ? user.favoriteFolderList.length : 0}
          </span>
        </h3>
        <MypageFavorite />
      </section>
      <section className="mypage-list-wrap review-list">
        <Link to="#">더보기</Link>
        <h3 className="title">
          나의 리뷰{" "}
          <span className="count">
            {user.reviewList ? user.reviewList.length : 0}
          </span>
        </h3>
        <div className="list-content review-content-wrap">
          <ReviewContent />
        </div>
      </section>
    </>
  );
};

const ReservationView = () => {
  const navigate = useNavigate();
  return (
    <div className="res-view">
      <section>
        <div className="res-history">
          <h1>예약내역</h1>
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
            <button
              className="btn-main"
              onClick={() => {
                navigate("/usermain/mypage/reviewWrite");
              }}
            >
              리뷰쓰기
            </button>
          </div>
          <div className="res-content">
            <img
              src="/image/IMG_3238.jpg"
              alt="가게사진"
              className="profile-image"
            />
            <div className="res-menu">
              <h2>가게이르므</h2>
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
  const navigate = useNavigate();
  const [loginId, setLoginId] = useRecoilState(loginUserIdState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/user/userId/${loginId}/getUserNickname`)
      .then((res) => {
        console.log(res.data);
        setReview({ ...review, userNickname: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginId]);
  const [review, setReview] = useState({
    reviewContent: "",
    reviewScore: 2,
    userNickname: "",
    // 여기는 예약구현후에 넣는 방법 생각해보겠음
    storeNo: 93,
    reserveNo: null,
  });
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
            navigate("usermain/mypage/myreview");
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
