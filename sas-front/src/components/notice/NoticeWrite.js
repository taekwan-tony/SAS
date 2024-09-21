import QuillEditor from "../utils/QuillEditor";
import { useEffect, useState } from "react";
import NoticeFrm from "./NoticeFrm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const NoticeWrite = (props) => {
  const setNoticeDetailTitle = props.setNoticeDetailTitle;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    setNoticeDetailTitle("작성");
  }, []);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeType, setNoticeType] = useState(0);
  const navigate = useNavigate();
  const insertNotice = () => {
    const form = new FormData();
    form.append("noticeContent", noticeContent);
    form.append("noticeType", noticeType);
    form.append("noticeTitle", noticeTitle);
    axios
      .post(`${backServer}/notice/write`, form)
      .then((res) => {
        console.log(res);
        if (res.data > 0) {
          Swal.fire({
            title: "공지사항 작성 완료",
            text: "공지사항을 등록했습니다.",
            icon: "success",
          }).then(() => {
            navigate("/admin/notice/list");
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="notice-write-wrap">
      {/* <form
        className="notice-write-form"
        onClick={(e) => {
          e.preventDefault();
          insertNotice();
        }}
      > */}
      <div className="notice-content-wrap">
        <NoticeFrm
          noticeTitle={noticeTitle}
          setNoticeTitle={setNoticeTitle}
          noticeType={noticeType}
          setNoticeType={setNoticeType}
        />
        <div className="notice-editor-wrap">
          <QuillEditor
            noticeContent={noticeContent}
            setNoticeContent={setNoticeContent}
          />
        </div>
        <div className="notice-write-button-zone">
          <button
            type="button"
            className="btn-main round"
            onClick={insertNotice}
          >
            등록하기
          </button>
          <button
            type="button"
            className="btn-sub round"
            onClick={() => {
              navigate("/admin/notice/list");
            }}
          >
            돌아가기
          </button>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
};

export default NoticeWrite;
