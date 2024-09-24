import ReactQuill from "react-quill";
import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import { Link, Route, Routes } from "react-router-dom";
import "../menu/menuview.css";
import "./mypage.css";
import {
  MypageFavorite,
  Profile,
  ReserveContent,
  ReviewContent,
} from "./MypageContent";

const Mypage = () => {
  return (
    <div className="mypage-main">
      <Routes>
        <Route path="" element={<MypageMain />}></Route>
        <Route path="resview" element={<ReservationView />}></Route>
        <Route path="myreview" element={<ReviewWrite />} />
      </Routes>
    </div>
  );
};
const MypageMain = () => {
  return (
    <>
      <Profile />
      <section className="reserve-list mypage-list-wrap">
        <Link to="#">더보기</Link>
        <h3 className="title">
          나의 예약 <span className="count">4</span>
        </h3>
        <div className="reserve-content-wrap list-content">
          <ReserveContent />
          <ReserveContent />
          <ReserveContent />
        </div>
      </section>
      <section className="mypage-list-wrap favorite-list">
        <Link to="#">더보기</Link>
        <h3 className="title">
          즐겨찾기 <span className="count">4</span>
        </h3>
        <MypageFavorite />
      </section>
      <section className="mypage-list-wrap review-list">
        <Link to="#">더보기</Link>
        <h3 className="title">
          나의 리뷰 <span className="count">4</span>
        </h3>
        <div className="list-content review-content-wrap">
          <ReviewContent />
        </div>
      </section>
    </>
  );
};

const ReservationView = () => {
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
            <button className="btn-main">리뷰쓰기</button>
          </div>
          <div className="res-content">
            <img
              src="/image/IMG_3238.jpg"
              alt="가게사진"
              className="profile-image"
            />
            <div className="res-menu">
              <h2>매장이름</h2>
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
  const [content, setContent] = useState("");
  console.log(content);
  const [title, setTitle] = useState("");
  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };
  const [ratingValue, setRatingValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const handleSubmit = async () => {
    const date = new Date();
  };

  return (
    <div className="review-container">
      <label htmlFor="message" className="label1">
        이용하신 매장은 어떠셨나요? 평점을 남겨주세요
      </label>
      <HoverRating
        value={ratingValue}
        setValue={setRatingValue}
        hover={hover}
        setHover={setHover}
      />
      <ReactQuill
        style={{ width: "450px", height: "232px", marginTop: "20px" }}
        modules={{ toolbar: false }}
        onChange={setContent}
        placeholder="레스토랑과 유저들에게 도움이 되는 따뜻한 리뷰를 작성해주세요."
      />
      <button
        className="review-submit"
        style={{ marginTop: "20px" }}
        onClick={handleSubmit}
      >
        등록
      </button>
    </div>
  );
};
export default Mypage;
