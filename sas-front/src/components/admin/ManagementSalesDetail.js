import { useState } from "react";

const ManagementSalesDetail = (props) => {
  const setAdminDetailTitle = props.setAdminDetailTitle;
  setAdminDetailTitle("매출현황+상세정보현황");
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState(0);

  const changeStartDate = (e) => {
    setStartDateValue(e.target.value);
  };
  const changeEndDate = (e) => {
    setEndDateValue(e.target.value);
  };
  const changekeywordDate = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <div className="admin-management-sales-detail-search-wrap">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <input
              type="date"
              id="admin-management-input-date"
              value={startDateValue}
              onChange={changeStartDate}
            />
            <span> ~ </span>
            <input
              type="date"
              id="admin-management-input-date"
              value={endDateValue}
              onChange={changeEndDate}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ManagementSalesDetail;
