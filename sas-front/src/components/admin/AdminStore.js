import { useState } from "react";
import StoreApprovalList from "./StoreApprovalList";
import { Route, Routes } from "react-router-dom";
import QuestionList from "../question/QuestionList";
import QuestionDetail from "../question/QuestionDetail";

const AdminStore = () => {
  const [adminDetailTitle, setAdminDetailTitle] = useState("");
  const [adminSubDetailTitle, setSubAdminDetailTitle] = useState(null);

  const questionWriterType = 2;
  return (
    <div className="admin-store-wrap">
      <div className="admin-store-title-wrap">
        <span className="material-icons admin-store-icon">home</span>
        <span className="admin-store-icon-text"> : 매장관리 + </span>
        <span className="admin-store-icon-text">{adminDetailTitle || ""}</span>
        {adminSubDetailTitle ? (
          <span className="admin-store-icon-text">+{adminSubDetailTitle}</span>
        ) : (
          ""
        )}
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
                questionWriterType={questionWriterType}
              />
            }
          />
          <Route
            path="detail"
            element={
              <QuestionDetail setSubAdminDetailTitle={setSubAdminDetailTitle} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminStore;
