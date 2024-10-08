import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNavi from "../utils/PagiNavi";

const NoticeList = (props) => {
  const setNoticeDetailTitle = props.setNoticeDetailTitle;
  const navigate = useNavigate();
  setNoticeDetailTitle("목록");
  const [noticeList, setNoticeList] = useState([]);
  const [noticeType, setNoticeType] = useState(0);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/notice/list/${reqPage}/${noticeType}`)
      .then((res) => {
        setNoticeList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [noticeType, reqPage]);
  const changeNoticeType = (obj) => {
    setNoticeType(obj.target.id);
    setReqPage(1);
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
          <span id="1">소비자</span>
        </div>
        <div
          className={
            noticeType == 2 ? "notice-menu notice-menu-check" : "notice-menu"
          }
          onClick={changeNoticeType}
          id="2"
        >
          <span id="2">매장</span>
        </div>
      </div>
      <div className="notice-list-main">
        <table className="notice-posting-wrap">
          <thead>
            <tr className="notice-posting-title">
              <th style={{ width: "15%" }}>번호</th>
              <th style={{ width: "50%" }}>제목</th>
              <th style={{ width: "20%" }}>등록일</th>
              <th style={{ width: "15%" }}>구분</th>
            </tr>
          </thead>
          {noticeList.map((notice, i) => {
            return (
              <NoticeItem
                key={"notice-" + i}
                notice={notice}
                noticeType={noticeType}
              />
            );
          })}
        </table>
      </div>
      <div className="notice-paging-wrap">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
      <div className="notice-write-btn">
        <button
          className="btn-main round"
          onClick={() => {
            navigate("/admin/notice/write");
          }}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
};

const NoticeItem = (props) => {
  const notice = props.notice;
  const noticeType = props.noticeType;
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        navigate(`/admin/notice/detail/${notice.noticeNo}/${noticeType}`);
      }}
    >
      <td style={{ width: "15%" }}>{notice.noticeNo}</td>
      <td style={{ width: "50%" }}>{notice.noticeTitle}</td>
      <td style={{ width: "20%" }}>{notice.noticeEnrollDate}</td>
      <td style={{ width: "15%" }}>
        {notice.noticeType == 1 ? "소비자" : "매장"}
      </td>
    </tr>
  );
};

export default NoticeList;
