import React, { useState } from "react";
import "./managereview.css";

function ManageReview({ comments }) {
  const [replies, setReplies] = useState({}); // 각 댓글의 답글을 저장

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
        {/* 댓글 리스트 */}
        <div className="comments-container">
          <h2>사용자 댓글</h2>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <p>
                  <strong>{comment.username}</strong> ({comment.date}{" "}
                  {comment.time})
                </p>
                <p>{comment.text}</p>

                {/* 답글 작성 폼 */}
                <div className="reply-section">
                  <textarea
                    value={replies[comment.id] || ""}
                    onChange={(e) =>
                      handleReplyChange(comment.id, e.target.value)
                    }
                    placeholder="답글을 작성하세요"
                    className="reply-input"
                  />
                  <button
                    onClick={() => handleReplySubmit(comment.id)}
                    className="reply-btn"
                  >
                    답글 달기
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ManageReview;
