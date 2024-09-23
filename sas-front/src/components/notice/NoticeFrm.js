import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const NoticeFrm = (props) => {
  const noticeTitle = props.noticeTitle;
  const setNoticeTitle = props.setNoticeTitle;
  const noticeType = props.noticeType;
  const setNoticeType = props.setNoticeType;

  const changeNoticeTitle = (e) => {
    setNoticeTitle(e.target.value);
  };

  const changeNoticeType = (e) => {
    setNoticeType(e.target.value);
  };

  return (
    <div className="notice-write-title-wrap">
      <div className="notice-title">
        <label htmlFor="noticeTitle" style={{ width: "20%" }}>
          공지사항 제목 :
        </label>
        <input
          type="text"
          id="noticeTitle"
          value={noticeTitle}
          onChange={changeNoticeTitle}
          style={{ width: "80%" }}
        />
      </div>
      <div className="notice-type">
        <div>
          <span>공지사항 유형 : </span>
        </div>
        <div className="notice-mui-wrap">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={noticeType}
            label="Type"
            onChange={changeNoticeType}
            style={{ width: "100%", height: "50px" }}
          >
            <MenuItem value={1}>소비자</MenuItem>
            <MenuItem value={2}>매장</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default NoticeFrm;
