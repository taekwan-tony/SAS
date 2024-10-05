import React, { useEffect, useState } from "react";
import "./managereview.css";
import axios from "axios";
import { Rating, Stack } from "@mui/material";
import { useRecoilState } from "recoil";
import { loginStoreIdState } from "../utils/RecoilData";
import { Link } from "react-router-dom";
import Modal from "react-modal"; // 모달 라이브러리 사용
import ReviewQuill from "./ReviewQuill"; // 분리된 Quill 에디터 컴포넌트

Modal.setAppElement("#root"); // 접근성 설정

function ManageReview(props) {
  const setActiveIndex = props.setActiveIndex;
  const [review, setReview] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null); // 선택된 리뷰 상태
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고 모달 상태
  const [reportReason, setReportReason] = useState(""); // 신고 사유 상태
  const [selectedReportReviewNo, setSelectedReportReviewNo] = useState(null); // 신고할 리뷰 번호
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginStoreId, setLoginStoreId] = useRecoilState(loginStoreIdState);
  const [reviewAnswer, setReviewAnswer] = useState(""); // 답글 상태

  useEffect(() => {
    setActiveIndex(4);
    // 모든 리뷰 데이터 가져오기
    axios
      .get(`${backServer}/review/allList/${loginStoreId}`)
      .then((res) => {
        console.log(res.data);
        setReview(res.data);
      })
      .catch((err) => {
        console.error("리뷰를 읽어올 수 없습니다.", err);
      });
  }, [loginStoreId]);

  const handleReplySubmit = (index) => {
    if (!reviewAnswer) {
      alert("답글을 입력하세요.");
      return;
    }
    axios
      .patch(`${backServer}/review`, {
        reviewNo: selectedReview.reviewNo,
        reviewAnswer: reviewAnswer, // Quill에서 입력한 값 사용
      })
      .then((res) => {
        if (res.data > 0) {
          review[index] = {
            ...review[index],
            reviewAnswer: reviewAnswer,
          };
          setReview([...review]);
          setSelectedReview(null);
          setReviewAnswer(""); // 답글 입력란 초기화
        }
      })
      .catch((err) => {
        console.error("답글 제출 중 오류가 발생했습니다.", err);
      });
  };

  const handleReplyCancel = () => {
    setSelectedReview(null);
    setReviewAnswer(""); // 답글 입력란 초기화
  };

  // 신고 모달 열기
  const openReportModal = (reviewNo) => {
    setSelectedReportReviewNo(reviewNo);
    setIsReportModalOpen(true);
  };

  // 신고 모달 닫기
  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setReportReason("");
  };

  // 신고 처리 함수
  const handleReportSubmit = () => {
    axios
      .patch(`${backServer}/review/report`, {
        reviewNo: selectedReportReviewNo,
        reviewReportContent: reportReason, // 신고 사유
      })
      .then((res) => {
        alert("리뷰가 성공적으로 신고되었습니다.");
        closeReportModal(); // 신고 후 모달 닫기

        // 리뷰 상태를 변경 (타입을 2로 변경하고 블러 처리)
        setReview((prevReviews) =>
          prevReviews.map((rev) =>
            rev.reviewNo === selectedReportReviewNo
              ? { ...rev, reviewType: 2, reviewReportContent: reportReason }
              : rev
          )
        );
      })
      .catch((err) => {
        console.error("리뷰 신고 중 오류가 발생했습니다.", err);
      });
  };

  return (
    <>
      <div className={`dashboard-body ${isReportModalOpen ? "inert" : ""}`}>
        <header className="dashboard-head">
          <h1>리뷰 관리</h1>
          <Link to="/storecheck/storeNoticeList">
            <button className="button-bell">
              <div className="user-box-bell">
                <div className="user-page-box">
                  <div className="bellWrapper">
                    <i className="fas fa-bell my-bell"></i>
                  </div>

                  <div className="circle first"></div>
                  <div className="circle second"></div>
                  <div className="circle third"></div>
                </div>
              </div>
            </button>
          </Link>
        </header>
      </div>
      <div className="dashboard">
        <div className="owner-background">
          <img src="/image/200.jpg" alt="back" />
        </div>

        {/* 하단 테이블 - 리뷰 리스트 */}
        <div className="comments-container">
          {review && review.length > 0 ? (
            review.map((reviewItem, index) => (
              <div
                className={`review-wrapper ${
                  reviewItem.reviewType === 2 ? "blur-review" : "" // 점주가 신고한 경우 블러 처리
                }`}
                key={reviewItem.reviewNo}
              >
                {/* 리뷰 타입이 3인 경우 메시지 표시, 블러 처리 없음 */}
                {reviewItem.reviewType === 3 ? (
                  <div className="admin-processed-review">
                    <p>관리자에 의해 처리된 리뷰입니다.</p>
                  </div>
                ) : (
                  <>
                    {/* 사용자 리뷰 */}
                    <div className="review-bubble user-review">
                      <p className="review-nickname">
                        {reviewItem.userNickname}
                      </p>

                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={reviewItem.reviewScore}
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                      <p className="review-score">
                        평점: {reviewItem.reviewScore}/5
                      </p>

                      {/* 블러 처리된 리뷰 표시 */}
                      {reviewItem.reviewType === 2 ? (
                        <p className="review-text">
                          점주에 의해 신고된 댓글입니다.
                        </p>
                      ) : (
                        <p
                          className="review-text"
                          dangerouslySetInnerHTML={{
                            __html: reviewItem.reviewContent,
                          }}
                        ></p>
                      )}

                      {/* 신고 버튼 */}
                      {reviewItem.reviewType === 1 && ( // 정상 상태일 때만 신고 가능
                        <button
                          className="cancel-report-btn"
                          onClick={() => openReportModal(reviewItem.reviewNo)}
                        >
                          신고
                        </button>
                      )}

                      {/* 답글 작성 버튼 */}
                      <button
                        className="submit-reply-btn"
                        onClick={() => {
                          setSelectedReview(reviewItem);
                          setReviewAnswer(reviewItem.reviewAnswer || "");
                        }}
                      >
                        답글 작성
                      </button>
                    </div>

                    {/* 관리자 답글 */}
                    {reviewItem.reviewAnswer ? (
                      <div className="review-bubble admin-reply">
                        <strong>관리자 답글:</strong>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: reviewItem.reviewAnswer,
                          }}
                        ></p>
                      </div>
                    ) : null}

                    {/* 답글 작성 폼 */}
                    {selectedReview &&
                      selectedReview.reviewNo === reviewItem.reviewNo && (
                        <div className="reply-form-container">
                          <div className="reply-form">
                            <ReviewQuill
                              content={reviewAnswer}
                              setContent={setReviewAnswer}
                              placeholder="답글을 작성하세요"
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
                  </>
                )}
              </div>
            ))
          ) : (
            <p>리뷰가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 신고 모달 */}
      <Modal
        isOpen={isReportModalOpen}
        onRequestClose={closeReportModal}
        className="report-modal"
        overlayClassName="report-modal-overlay"
      >
        <h2>리뷰 신고</h2>
        <textarea
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
          placeholder="신고 사유를 입력하세요"
          className="report-reason-input"
        />
        <div className="report-modal-actions">
          <button className="submit-report-btn" onClick={handleReportSubmit}>
            신고 제출
          </button>
          <button
            className="modal-cancel-report-btn"
            onClick={closeReportModal}
          >
            취소
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ManageReview;
