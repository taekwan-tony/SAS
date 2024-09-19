import { Route, Routes } from "react-router-dom";
import NoticeList from "./NoticeList";
import "./notice.css";

const NoticeMain = () => {
  return (
    <div className="notice-wrap">
      <div className="notice-title-wrap">
        <span className="material-icons notice-icon">home</span>
        <span className="notice-icon-text"> : 공지사항</span>
      </div>
      <div className="notice-content-wrap">
        <Routes>
          <Route path="list" element={<NoticeList />} />
        </Routes>
      </div>
    </div>
  );
};

export default NoticeMain;
