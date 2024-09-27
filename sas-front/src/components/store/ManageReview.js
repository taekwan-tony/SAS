import React, { useEffect, useState } from "react";
import "./managereview.css";
import axios from "axios";
import { Rating, Stack } from "@mui/material";
import { useRecoilState } from "recoil";
import { loginStoreIdState } from "../utils/RecoilData";

function ManageReview({ comments }) {
  const [review, setReview] = useState([]);
  const [selectedReview, setSelectedReview] = useState({
    reviewNo: 0,
    reviewAnswer: "",
  });
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginStoreId, setLoginStoreId] = useRecoilState(loginStoreIdState);
  useEffect(() => {
    //모든 리뷰 데이터 가져오기
    console.log(loginStoreId);
    axios
      .get(`${backServer}/review/allList/${loginStoreId}`)
      .then((res) => {
        setReview(res.data);
      })
      .catch((err) => {
        console.error("리뷰를 읽어올수없습니다.", err);
      });
  }, [loginStoreId]);

  const handleReplyChange = (value) => {
    setSelectedReview({ ...selectedReview, reviewAnswer: value });
  };

  const handleReplySubmit = (index) => {
    axios.patch(`${backServer}/review`, selectedReview).then((res) => {
      if (res.data > 0) {
        review[index] = {
          ...review[index],
          reviewAnswer: selectedReview.reviewAnswer,
        };
        setReview([...review]);
        setSelectedReview({ reviewNo: 0, reviewAnswer: "" });
      }
    });
  };

  const handleReplyCancel = () => {
    setSelectedReview({ reviewNo: 0, reviewAnswer: "" }); // 취소 시 폼 닫기
  };

  return (
    <>
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>리뷰관리</h1>
        </header>
      </div>
      <div className="dashboard">
        <div className="owner-background">
          <img src="/image/200.jpg" alt="back" />
        </div>

        {/* 하단 테이블 - 리뷰 리스트 */}
        <div className="comments-container">
          {review && review.length > 0 ? (
            review.map((review, index) => (
              <div className="consum-comment" key={review.reviewNo}>
                <div className="review-content">
                  {/* 닉네임 */}
                  <p className="review-nickname">
                    <strong>{review.userNickName}</strong>
                  </p>

                  {/* 별점 */}
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={review.reviewScore}
                      precision={0.5}
                      readOnly
                    />
                  </Stack>

                  {/* 평점 */}
                  <p className="review-score">평점: {review.reviewScore}/5</p>

                  {/* 리뷰 내용 */}
                  <p className="review-text">{review.reviewContent}</p>

                  {/* 답글 작성 버튼 */}
                  {review.reviewAnswer ? (
                    ""
                  ) : (
                    <button
                      onClick={() =>
                        setSelectedReview({
                          ...selectedReview,
                          reviewNo: review.reviewNo,
                        })
                      } // 해당 리뷰에 답글 폼을 열기
                      className="reply-btn"
                    >
                      답글 작성
                    </button>
                  )}
                </div>

                {/* 기존 답글 표시 (관리자가 답글을 작성했을 경우) */}
                {review.reviewAnswer && (
                  <div className="reply">
                    <strong>관리자 답글: </strong>
                    <p>{review.reviewAnswer}</p>
                  </div>
                )}

                {/* 답글 작성 폼 - 선택된 리뷰 바로 밑에 표시 */}
                {selectedReview.reviewNo === review.reviewNo && (
                  <div className="reply-form-container">
                    <div className="reply-form">
                      <textarea
                        value={selectedReview.reviewAnswer}
                        onChange={(e) => handleReplyChange(e.target.value)}
                        placeholder="답글을 작성하세요"
                        className="reply-input"
                      />
                      <div className="reply-actions">
                        <button
                          onClick={() => handleReplySubmit(index)}
                          className="submit-reply-btn"
                        >
                          답글 달기
                        </button>
                        <button
                          onClick={handleReplyCancel}
                          className="cancel-reply-btn"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>리뷰가 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ManageReview;
