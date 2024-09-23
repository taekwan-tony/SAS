import { Route, Routes } from "react-router-dom";
import AdminSideTab from "./AdminSideTab";
import NoticeMain from "../notice/NoticeMain";
import "./adminMain.css";
import AdminStore from "./AdminStore";
import "./adminStore.css";

const AdminMain = () => {
  return (
    <div className="admin-container">
      <AdminSideTab />
      <div className="admin-content-wrap">
        <Routes>
          <Route path="notice/*" element={<NoticeMain />} />
          <Route path="store/*" element={<AdminStore />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminMain;
