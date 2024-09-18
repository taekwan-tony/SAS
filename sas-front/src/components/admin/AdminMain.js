import { Routes } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSideTab from "./AdminSideTab";
import "./adminSideTab.css";

const AdminMain = () => {
  return (
    <div>
      <div>
        <AdminHeader />
      </div>
      <div className="container">
        <AdminSideTab />
        <div className="admin-content-wrap">
          <Routes></Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
