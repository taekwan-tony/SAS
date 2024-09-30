import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserNoticeDetail = () => {
  const params = useParams();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const noticeNo = params.noticeNo;
  const noticeType = params.noticeType;
  const navigate = useNavigate();
  const [notice, setNotice] = useState({
    noticeNo: "",
    noticeContent: "",
    noticeTitle: "",
    noticeEnrollDate: "",
    noticeType: 0,
  });
  const [noticeBoth, setNoticeBoth] = useState({});
  useEffect(() => {
    axios
      .get(`${backServer}/notice/detail/${noticeNo}/${1}`)
      .then((res) => {
        setNotice(res.data.notice);
        setNoticeBoth(res.data.noticeBoth);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [noticeNo]);

  return (
    <div className="notice-detail-wrap">
      <table className="notice-detail-table">
        <thead>
          <tr>
            <th>제목</th>
            <td>{notice.noticeTitle}</td>
          </tr>
          <tr>
            <th style={{ width: "10%" }}>유형</th>
            <td colSpan={2} style={{ width: "20%" }}>
              {notice.noticeType === 1 ? "소비자" : "매장"}
            </td>
            <th style={{ width: "10%" }}>등록일</th>
            <td style={{ width: "60%" }}>{notice.noticeEnrollDate}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={5}
              className="notice-detail-table-td"
              dangerouslySetInnerHTML={{
                __html: notice.noticeContent,
              }}
            ></td>
          </tr>
          {noticeBoth.prevNo ? (
            <tr
              className="notice-both-wrap"
              onClick={() => {
                navigate(`/usermain/noticeDetail/${noticeBoth.prevNo}`);
              }}
            >
              <th>
                <span>이전글</span>
                <span className="material-icons">expand_less</span>
              </th>
              <td colSpan={4}>{noticeBoth.prevTitle}</td>
            </tr>
          ) : (
            ""
          )}
          {noticeBoth.nextNo ? (
            <tr
              className="notice-both-wrap"
              onClick={() => {
                navigate(`/usermain/noticeDetail/${noticeBoth.nextNo}`);
              }}
            >
              <th>
                <span>다음글</span>
                <span className="material-icons">keyboard_arrow_down</span>
              </th>

              <td colSpan={4}>{noticeBoth.nextTitle}</td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>
      <div className="notice-write-button-zone">
        <button
          type="button"
          className="btn-sub round notice-back"
          onClick={() => {
            navigate("/usermain/noticeList");
          }}
        >
          공지사항 목록
        </button>
      </div>
    </div>
  );
};

export default UserNoticeDetail;
