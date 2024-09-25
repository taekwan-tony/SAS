import { useState } from "react";
import StoreApprovalList from "./StoreApprovalList";
import { Route, Routes } from "react-router-dom";

const AdminStore = () => {
  const [adminDetailTitle, setAdminDetailTitle] = useState("");

  const questionWriterType = 2;
  return (
    <div className="admin-store-wrap">
      <div className="admin-store-title-wrap">
        <span className="material-icons admin-store-icon">home</span>
        <span className="admin-store-icon-text"> : 매장관리 + </span>
        <span className="admin-store-icon-text">{adminDetailTitle || ""}</span>
      </div>
      <div className="admin-store-content-wrap">
        <Routes>
          <Route
            path="approvalList"
            element={
              <StoreApprovalList setAdminDetailTitle={setAdminDetailTitle} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminStore;
