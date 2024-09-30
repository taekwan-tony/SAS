import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNavi from "../utils/PagiNavi";

const UserNoticeList = () => {
  const navigate = useNavigate();

  const [noticeList, setNoticeList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/notice/list/${reqPage}/${1}`)
      .then((res) => {
        setNoticeList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
  return (
    <div className="notice-list-wrap">
      <div className="notice-list-main">
        <table className="notice-posting-wrap">
          <thead>
            <tr className="notice-posting-title">
              <th style={{ width: "20%" }}>번호</th>
              <th style={{ width: "25%" }}>등록일</th>
              <th style={{ width: "55%" }}>제목</th>
            </tr>
          </thead>
          {noticeList.map((notice, i) => {
            return <NoticeItem key={"notice-" + i} notice={notice} />;
          })}
        </table>
      </div>
      <div className="notice-paging-wrap">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </div>
  );
};

const NoticeItem = (props) => {
  const notice = props.notice;
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        navigate(`/usermain/noticeDetail/${notice.noticeNo}`);
      }}
    >
      <td style={{ width: "20%" }}>{notice.noticeNo}</td>
      <td style={{ width: "25%" }}>{notice.noticeEnrollDate}</td>
      <td style={{ width: "55%" }}>{notice.noticeTitle}</td>
    </tr>
  );
};

export default UserNoticeList;
