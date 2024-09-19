import { Route, Routes } from "react-router-dom";
import NoticeList from "./NoticeList";

const NoticeMain = () => {
  return (
    <div className="notice-wrap">
      <div className="notice-title-wrap">
        <span className="material-icons">home</span>
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
