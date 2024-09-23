import { Route, Routes } from "react-router-dom";
import "../menu/menuview.css";
import ReactQuill from "react-quill";
import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const Mypage = () => {
  return (
    <Routes>
      <Route path="resview" element={<ReservationView />}></Route>
      {/* <Route path="myreview" element={<MyReview />} /> */}
      <Route path="myreview" element={<ReviewWrite />} />
    </Routes>
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
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const HoverRating = ({ value, setValue, hover, setHover }) => {
  return (
    <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
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
      <label htmlFor="message" className="block mb-2 font-medium text-gray-900">
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
      <button className="" style={{ marginTop: "20px" }} onClick={handleSubmit}>
        등록
      </button>
    </div>
  );
};
export default Mypage;
