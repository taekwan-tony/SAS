const NoticeList = () => {
  return (
    <div className="notice-list-wrap">
      <div className="notice-list-menu">
        <div className="notice-menu notice-menu-check">
          <span>전체</span>
        </div>
        <div className="notice-menu">
          <span>매장</span>
        </div>
        <div className="notice-menu">
          <span>소비자</span>
        </div>
      </div>
      <div className="notice-list-main"></div>
    </div>
  );
};

export default NoticeList;
