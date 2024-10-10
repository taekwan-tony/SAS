import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNavi from "../utils/PagiNavi";
import { useRecoilState } from "recoil";
import { loginStoreNoState } from "../utils/RecoilData";
import "./storenotice.css";

const StoreNoticeList = () => {
  const navigate = useNavigate();
  const [loginStoreNo, setLoginStoreNo] = useRecoilState(loginStoreNoState);
  const [soEmail, setSoEmail] = useState("");
  const [noticeList, setNoticeList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/store/storeEmail/${loginStoreNo}`)
      .then((res) => {
        setSoEmail(res.data.soEmail);
        axios
          .get(
            `${backServer}/notice/userList/${reqPage}/${2}/${res.data.soEmail}`
          )
          .then((res) => {
            setNoticeList(res.data.list);
            setPi(res.data.pi);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }, [loginStoreNo, reqPage]);
  return (
    <>
      <div className="dashboard-store-body">
        <header className="dashboard-store-head">
          <h1>공지사항</h1>
        </header>
      </div>
      <div className="dashboard-store">
        <div className="owner-background">
          <img src="/image/200.jpg" alt="back" />
        </div>
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
                return (
                  <NoticeItem
                    key={"notice-" + i}
                    notice={notice}
                    soEamil={soEmail}
                  />
                );
              })}
            </table>
          </div>
          <div className="notice-paging-wrap">
            <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
          </div>
        </div>
      </div>
    </>
  );
};

const NoticeItem = (props) => {
  const notice = props.notice;
  const soEamil = props.soEamil;
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        navigate(`/storecheck/noticeDetail/${notice.noticeNo}/${soEamil}`);
      }}
    >
      <td style={{ width: "20%" }}>{notice.noticeNo}</td>
      <td style={{ width: "25%" }}>{notice.noticeEnrollDate}</td>
      <td style={{ width: "55%" }}>{notice.noticeTitle}</td>
    </tr>
  );
};
export default StoreNoticeList;
