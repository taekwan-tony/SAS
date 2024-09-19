import { Route, Routes } from "react-router-dom";
import AdminSideTab from "./AdminSideTab";
import "./adminSideTab.css";
import NoticeMain from "../notice/NoticeMain";

const AdminMain = () => {
  return (
    <div>
      <div className="container">
        <AdminSideTab />
        <div className="admin-content-wrap">
          <Routes>
            <Route path="notice/*" element={<NoticeMain />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
