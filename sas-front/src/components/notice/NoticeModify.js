import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import NoticeFrm from "./NoticeFrm";
import QuillEditor from "../utils/QuillEditor";

const NoticeModify = (props) => {
  const setNoticeDetailTitle = props.setNoticeDetailTitle;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const noticeNo = params.noticeNo;
  const subNoticeType = params.noticeType;
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeType, setNoticeType] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setNoticeDetailTitle("게시글 수정");
    axios
      .get(`${backServer}/notice/selectOne/${noticeNo}`)
      .then((res) => {
        console.log(res);
        setNoticeTitle(res.data.noticeTitle);
        setNoticeType(res.data.noticeType);
        setNoticeContent(res.data.noticeContent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateNotice = () => {
    const form = new FormData();
    form.append("noticeContent", noticeContent);
    form.append("noticeType", noticeType);
    form.append("noticeTitle", noticeTitle);
    form.append("noticeNo", noticeNo);
    console.log(form);
    console.log(1);
    axios
      .patch(`${backServer}/notice/modify`, form)
      .then((res) => {
        console.log(res);
        if (res.data > 0) {
          Swal.fire({
            title: "공지사항 수정 완료",
            text: "공지사항을 수정했습니다.",
            icon: "success",
          }).then(() => {
            navigate(`/admin/notice/detail/${noticeNo}/${subNoticeType}`);
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
            onClick={updateNotice}
          >
            수정하기
          </button>
          <button
            type="button"
            className="btn-sub round"
            onClick={() => {
              navigate(`/admin/notice/detail/${noticeNo}/${subNoticeType}`);
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

export default NoticeModify;
