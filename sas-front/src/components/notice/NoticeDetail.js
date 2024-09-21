import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";

const NoticeDetail = (props) => {
  const params = useParams();
  const setNoticeDetailTitle = props.setNoticeDetailTitle;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const noticeNo = params.noticeNo;
  const [notice, setNotice] = useState({
    noticeNo: "",
    noticeContent: "",
    noticeTitle: "",
    noticeEnrollDate: "",
    noticeType: 0,
  });
  useEffect(() => {
    axios
      .get(`${backServer}/notice/detail/${noticeNo}`)
      .then((res) => {
        console.log(res);
        setNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setNoticeDetailTitle("상세보기");
  }, []);

  return (
    <div className="notice-detail-wrap">
      <table className="notice-detail-table">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>제목</th>
            <th>{notice.noticeTitle}</th>
          </tr>
          <tr>
            <th style={{ width: "20%" }}>유형</th>
            <th style={{ width: "20%" }}>
              {notice.noticeType === 1 ? "소비자" : "매장"}
            </th>
            <th style={{ width: "20%" }}>등록일</th>
            <th style={{ width: "40%" }}>{notice.noticeEnrollDate}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={4}
              dangerouslySetInnerHTML={{
                __html: notice.noticeContent,
              }}
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NoticeDetail;
