import { Link } from "react-router-dom";

const AdminSideTab = () => {
  return (
    <div className="admin-sidebar">
      <div className="admin-logo-div">
        <img src="/image/translogo.png" style={{ width: "150px" }} />
      </div>
      <ul>
        <li>
          <Link to="#">현황관리</Link>
          <ul className="admin-side-sub-tab">
            <li>
              <Link to="#">매출관리</Link>
            </li>
            <li>
              <Link to="/admin/management/storeMap">제휴현황</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/admin/store/approvalList">매장관리</Link>
          <ul className="admin-side-sub-tab">
            <li>
              <Link to="/admin/store/approvalList">제휴 승인목록</Link>
            </li>
            <li>
              <Link to="/admin/store/storeList">제휴 매장리스트</Link>
            </li>
            <li>
              <Link to="/admin/store/storeReview">리뷰 신고리스트</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/admin/notice/list">공지사항</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideTab;
