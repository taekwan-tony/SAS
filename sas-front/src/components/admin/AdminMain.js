import { Route, Routes } from "react-router-dom";
import AdminSideTab from "./AdminSideTab";
import NoticeMain from "../notice/NoticeMain";
import "./adminMain.css";

const AdminMain = () => {
  return (
    <div className="container">
      <AdminSideTab />
      <div className="admin-content-wrap">
        <Routes>
          <Route path="notice/*" element={<NoticeMain />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminMain;
