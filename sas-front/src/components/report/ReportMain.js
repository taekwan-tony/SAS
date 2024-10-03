// 모달 여는거 시험창--나중에 예약내역으로 옮길 예정

import { useState } from "react";
import { isUserLoginState } from "../utils/RecoilData";
import { useRecoilValue } from "recoil";
import ReportModal from "./ReportModal";
import Modal from "react-modal";

const ReportMain = () => {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const isUserLogin = useRecoilValue(isUserLoginState);
  const openReport = () => {
    setReportModalOpen(true);
  };
  const closeReport = () => {
    setReportModalOpen(false);
  };
  const customReportModal = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.2)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "500px",
      height: "370px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "hidden",
    },
  };
  return (
    <>
      <button style={{ margin: "50px" }} onClick={openReport}>
        신고
      </button>
      {reportModalOpen ? (
        <Modal
          isOpen={isUserLogin} //로그인, 예약한 매장 방문완료시 누를 수 있도록
          ariaHideApp={false}
          onRequestClose={() => {
            setReportModalOpen(false);
          }}
          style={customReportModal}
        >
          <ReportModal closeReport={closeReport} />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};
export default ReportMain;
