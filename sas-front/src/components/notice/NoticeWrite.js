import { Quill } from "react-quill";
import QuillEditor from "../utils/QuillEditor";

const NoticeWrite = (props) => {
  const setNoticeDetailTitle = props.setNoticeDetailTitle;
  setNoticeDetailTitle("작성");

  return (
    <div className="notice-write-wrap">
      <form
        className="notice-write-form"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className="notice-content-wrap">
          <QuillEditor />
        </div>
        <div className="button-zone">
          <button type="submit" className="btn-main round">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeWrite;
