import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ManagementStore from "./ManagementStore";

const AdminMarginMain = () => {
  const [adminDetailTitle, setAdminDetailTitle] = useState("");

  return (
    <div className="admin-management-wrap">
      <div className="admin-management-title-wrap">
        <span className="material-icons admin-management-icon">home</span>
        <span className="admin-store-icon-text"> : 현황관리 + </span>
        <span className="admin-store-icon-text">{adminDetailTitle || ""}</span>
      </div>
      <div className="admin-management-content-wrap">
        <Routes>
          <Route
            path="storeMap/*"
            element={
              <ManagementStore setAdminDetailTitle={setAdminDetailTitle} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminMarginMain;
