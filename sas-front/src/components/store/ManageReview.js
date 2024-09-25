import React, { useEffect, useState } from "react";
import "./managereview.css";
import axios from "axios";

function ManageReview({ comments }) {
  const [replies, setReplies] = useState({}); // 각 댓글의 답글을 저장
  const [review, setReview] = useState([]);

  useEffect(() => {
    //모든 리뷰 데이터 가져오기
    axios
      .get("/review")
      .then((res) => {
        setReview(res.data);
      })
      .catch((err) => {
        console.error("리뷰를 읽어올수없습니다.", err);
      });
  }, []);

  const handleReplyChange = (commentId, value) => {
    setReplies((prevReplies) => ({
      ...prevReplies,
      [commentId]: value,
    }));
  };

  const handleReplySubmit = (commentId) => {
    console.log(`Reply to comment ${commentId}:`, replies[commentId]);
    setReplies((prevReplies) => ({
      ...prevReplies,
      [commentId]: "",
    }));
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

        {/* 하단테이블 */}
        {/* 리뷰 리스트 */}
        <div className="comments-container">
          <h2>사용자 리뷰</h2>
          {review && review.length > 0 ? (
            review.map((review) => (
              <div className="comment" key={review.reviewNo}>
                <p>
                  <strong>{review.userNickName}</strong> - {review.reviewDate}
                </p>
                <p>평점: {review.reviewScore}/5</p>
                <p>{review.reviewContent}</p>

                {/* 답글 작성 폼 */}
                <div className="reply-section">
                  <textarea
                    value={replies[review.reviewNo] || ""}
                    onChange={(e) =>
                      handleReplyChange(review.reviewNo, e.target.value)
                    }
                    placeholder="답글을 작성하세요"
                    className="reply-input"
                  />
                  <button
                    onClick={() => handleReplySubmit(review.reviewNo)}
                    className="reply-btn"
                  >
                    답글 달기
                  </button>
                </div>

                {/* 기존 답글 표시 (관리자가 답글을 작성했을 경우) */}
                {review.reviewAnswer && (
                  <div className="reply">
                    <strong>관리자 답글: </strong>
                    <p>{review.reviewAnswer}</p>
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
