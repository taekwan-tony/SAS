import { Link } from "react-router-dom";

const AdminSideTab = () => {
  return (
    <>
      <aside className="admin-sidebar">
        <h2>
          <img src="/image/s&slogo.png" style={{ width: "120px" }} />
        </h2>
        <ul>
          <li>
            <Link href="#">현황관리</Link>
            <ul className="admin-side-sub-tab">
              <li>
                <Link href="#">매출관리</Link>
              </li>
              <li>
                <Link href="#">제휴현황</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="#">회원관리</Link>
            <ul className="admin-side-sub-tab">
              <li>
                <Link href="#">매출관리</Link>
              </li>
              <li>
                <Link href="#">제휴현황</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="#">매장관리</Link>
            <ul className="admin-side-sub-tab">
              <li>
                <Link href="#">매출관리</Link>
              </li>
              <li>
                <Link href="#">제휴현황</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/admin/notice/list">공지사항</Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default AdminSideTab;
