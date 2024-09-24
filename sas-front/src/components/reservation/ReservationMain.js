import { useState } from "react";
import Modal from "react-modal";
import { useRecoilValue } from "recoil";
import { isUserLoginState } from "../utils/RecoilData";
import DatePicker from "../utils/DatePicker";
const ReservationMain = () => {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const goTOReserve = () => {
    setIsReserveModalOpen(!isReserveModalOpen);
  };
  const isUserLogin = useRecoilValue(isUserLoginState);
  // 모달창?
  const customModalStyles = {
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
      width: "1000px",
      height: "500px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
    },
  };
  const [reservationPage, setReservationPage] = useState(1);
  return (
    <>
      <button onClick={goTOReserve} style={{ marginTop: "100px" }}>
        예약하기
      </button>
      {isReserveModalOpen ? (
        <Modal
          isOpen={isUserLogin}
          ariaHideApp={false}
          onRequestClose={() => {
            setIsReserveModalOpen(false);
          }}
          style={customModalStyles}
        >
          {" "}
          {reservationPage === 1 ? <ReservationModalFirst /> : ""}
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

const ReservationModalFirst = () => {
  return (
    <>
      <DatePicker />
    </>
  );
};

export default ReservationMain;
