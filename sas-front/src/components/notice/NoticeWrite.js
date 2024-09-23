import { Quill } from "react-quill";
import QuillEditor from "../utils/QuillEditor";
import { useState } from "react";

const NoticeWrite = (props) => {
  const setNoticeDetailTitle = props.setNoticeDetailTitle;
  setNoticeDetailTitle("작성");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeType, setNoticeType] = useState(0);

  return (
    <div className="notice-write-wrap">
      <form
        className="notice-write-form"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className="notice-content-wrap">
          <div>
            <QuillEditor
              noticeContent={noticeContent}
              setNoticeContent={setNoticeContent}
            />
          </div>
        </div>
        <div className="notice-button-zone">
          <button type="submit" className="btn-main round">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeWrite;
