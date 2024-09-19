import axios from "axios";
import { useEffect, useState } from "react";

const NoticeList = () => {
  const [noticeList, setNoticeList] = useState([]);
  const [noticeType, setNoticeType] = useState(0);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/notice/list/${reqPage}/${noticeType}`)
      .then((res) => {
        setNoticeList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [noticeType]);
  const changeNoticeType = (obj) => {
    setNoticeType(obj.target.id);
  };
  return (
    <div className="notice-list-wrap">
      <div className="notice-list-menu">
        <div
          className={
            noticeType == 0 ? "notice-menu notice-menu-check" : "notice-menu"
          }
          onClick={changeNoticeType}
          id="0"
        >
          <span id="0">전체</span>
        </div>
        <div
          className={
            noticeType == 1 ? "notice-menu notice-menu-check" : "notice-menu"
          }
          onClick={changeNoticeType}
          id="1"
        >
          <span id="1">매장</span>
        </div>
        <div
          className={
            noticeType == 2 ? "notice-menu notice-menu-check" : "notice-menu"
          }
          onClick={changeNoticeType}
          id="2"
        >
          <span id="2">소비자</span>
        </div>
      </div>
      <div className="notice-list-main"></div>
    </div>
  );
};

export default NoticeList;
