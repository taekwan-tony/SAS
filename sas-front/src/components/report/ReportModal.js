import { useState } from "react";
import "./reportModal.css";
import { useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ReportModal = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const { reserveNo, closeReport } = props;
  const [report, setReport] = useState({
    reportReason: "",
    reserveNo: reserveNo,
  });
  const [reportReasonOther, setReportReasonOther] = useState({
    disabled: true,
    content: "",
  });
  const otherRef = useRef(null);
  const changeReportReason = (e) => {
    setReportReasonOther({ disabled: true, content: "" });
    otherRef.current.classList.remove("on");
    setReport({ ...report, reportReason: e.target.value });
    return;
  };
  const putReportReasonOther = () => {
    setReportReasonOther({ ...reportReasonOther, disabled: false });
    otherRef.current.classList.add("on");
    otherRef.current.focus();
    return;
  };
  const goReport = () => {
    if (report.reportReason != null && report.reportReason !== "") {
      // console.log(report);
      axios
        .post(`${backServer}/userReport`, report)
        .then((res) => {
          if (res.data) {
            // console.log(res.data);
            Swal.fire({
              title: "신고 접수가 완료되었습니다",
              text: "불편을 드려 죄송합니다",
              icon: "success",
              confirmButtonColor: "var(--main1)",
            }).then(() => {
              closeReport();
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="report-modal-wrap">
      <div className="report-modal-header">
        <h2>신고하기</h2>
        <h4 className="msg">이용하신 매장의 불편하신 점이 무엇인가요?</h4>
        <button className="dismiss" onClick={closeReport}>
          <span class="material-icons">close</span>
        </button>
      </div>
      <div className="report-modal-content">
        <div className="input-box">
          <input
            type="radio"
            id="report-content1"
            name="reportContent"
            value="매장 정보가 잘못됐어요"
            onClick={changeReportReason}
          />
          <label htmlFor="report-content1">매장 정보가 잘못됐어요</label>
        </div>
        <div className="input-box">
          <input
            type="radio"
            id="report-content2"
            name="reportContent"
            value="음식을 재사용하는 것 같아요"
            onClick={changeReportReason}
          />
          <label htmlFor="report-content2">음식을 재사용하는 것 같아요</label>
        </div>
        <div className="input-box">
          <input
            type="radio"
            id="report-content3"
            name="reportContent"
            value="위생이 안좋아요"
            onClick={changeReportReason}
          />
          <label htmlFor="report-content3">위생이 안좋아요</label>
        </div>
        <div className="input-box">
          <input
            type="radio"
            id="report-content4"
            name="reportContent"
            value="직원이 불친절해요"
            onClick={changeReportReason}
          />
          <label htmlFor="report-content4">직원이 불친절해요</label>
        </div>
        <div className="input-box others">
          <input
            type="radio"
            id="report-content5"
            name="reportContent"
            value={reportReasonOther.content}
            onChange={putReportReasonOther}
          />
          <label htmlFor="report-content5">기타</label>
        </div>
        <input
          type="text"
          id="others"
          disabled={reportReasonOther.disabled}
          placeholder="불편하신 점을 적어주세요"
          value={reportReasonOther.content}
          ref={otherRef}
          onChange={(e) => {
            setReport({ ...report, reportReason: e.target.value });
            setReportReasonOther({
              ...reportReasonOther,
              content: e.target.value,
            });
          }}
        />
      </div>
      <div className="report-modal-footer">
        <button className="btn-sub round" onClick={closeReport}>
          취소
        </button>
        <button className="btn-main round" onClick={goReport}>
          신고
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
