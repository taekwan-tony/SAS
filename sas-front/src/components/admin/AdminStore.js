import { useState } from "react";
import StoreApprovalList from "./StoreApprovalList";
import { Route, Routes } from "react-router-dom";
import QuestionList from "../question/QuestionList";

const AdminStore = () => {
  const [adminDetailTitle, setAdminDetailTitle] = useState("");
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
          <Route
            path="questionList"
            element={
              <QuestionList
                setAdminDetailTitle={setAdminDetailTitle}
                questionWriterType={2}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminStore;
