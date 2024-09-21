import { Route, Routes } from "react-router-dom";
import NoticeList from "./NoticeList";
import "./notice.css";
import NoticeWrite from "./NoticeWrite";
import { useState } from "react";
import NoticeDetail from "./NoticeDetail";

const NoticeMain = () => {
  const [noticeDetailTitle, setNoticeDetailTitle] = useState("");
  return (
    <div className="notice-wrap">
      <div className="notice-title-wrap">
        <span className="material-icons notice-icon">home</span>
        <span className="notice-icon-text"> : 공지사항 + </span>
        <span className="notice-icon-text">{noticeDetailTitle || ""}</span>
      </div>
      <div className="notice-content-wrap">
        <Routes>
          <Route
            path="list"
            element={<NoticeList setNoticeDetailTitle={setNoticeDetailTitle} />}
          />
          <Route
            path="write"
            element={
              <NoticeWrite setNoticeDetailTitle={setNoticeDetailTitle} />
            }
          />
          <Route
            path="detail/:noticeNo"
            element={
              <NoticeDetail setNoticeDetailTitle={setNoticeDetailTitle} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default NoticeMain;
