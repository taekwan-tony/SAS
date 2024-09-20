import { Quill } from "react-quill";

const NoticeWrite = (props) => {
  const setNoticeDetailTitle = props.setNoticeDetailTitle;
  setNoticeDetailTitle("작성");
  const quill = new Quill("#editor");
  return (
    <div>
      <div></div>
    </div>
  );
};

export default NoticeWrite;
