import { useEffect } from "react";

const ManagementSaleContent = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const setAdminDetailTitle = props.setAdminDetailTitle;
  setAdminDetailTitle("매출현황");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  console.log(typeof currentYear);
  useEffect(() => {}, []);
  return (
    <>
      <div className="admin-management-sales-wrap">
        <div className="admin-management-sales-title-wrap">
          <span class="material-icons">real_estate_agent</span>
          <span>매출현황</span>
        </div>
      </div>
      <div className="admin-management-sales-content-wrap">
        <div className="admin-management-sales-content-1">
          <div className="admin-management-sales-content-title">
            <span>{currentYear}년 매출</span>
          </div>
        </div>
        <div className="admin-management-sales-content-2">
          <div className="admin-management-sales-content-title">
            <span>{currentYear}년 매출</span>
          </div>
        </div>
      </div>
      <div className="admin-management-sales-content-wrap">
        <div className="admin-management-sales-content-1">
          <div className="admin-management-sales-content-title">
            <span>{currentYear}년 매출</span>
          </div>
        </div>
        <div className="admin-management-sales-content-1">
          <div className="admin-management-sales-content-title">
            <span>{currentYear}년 매출</span>
          </div>
        </div>
        <div className="admin-management-sales-content-1">
          <div className="admin-management-sales-content-title">
            <span>{currentYear}년 매출</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementSaleContent;
