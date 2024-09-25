import { useState } from "react";
import Modal from "react-modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { isUserLoginState, loginUserIdState } from "../utils/RecoilData";
import DatePicker from "../utils/DatePicker";
import { format } from "date-fns";
import "./reservationModal.css";
const ReservationMain = () => {
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
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
      height: "max-content",
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
  const [reservationPage, setReservationPage] = useState(1);
  const [reservation, setReservation] = useState({
    reserveDate: "",
    // 결제여부는 매장 상세에서 가져와야함
    reservePayStatus: 0,
    reservePeople: 1,
    //매장상세, 회원에서 가져와야 할 것들
    storeNo: 0,
    userId: loginUserId,
  });

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
          {reservationPage === 1 ? (
            <ReservationModalFirst
              reservation={reservation}
              setReservation={setReservation}
            />
          ) : (
            ""
          )}
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

const ReservationModalFirst = (props) => {
  const reservation = props.reservation;
  const setReservation = props.setReservation;
  const changeReservationPeople = (e) => {
    setReservation({ ...reservation, reservePeople: e.target.value });
  };
  const peoplePlus = () => {
    setReservation({
      ...reservation,
      reservePeople: reservation.reservePeople + 1,
    });
  };
  const peopleMinus = () => {
    setReservation({
      ...reservation,
      reservePeople: reservation.reservePeople - 1,
    });
  };
  const dayNow = new Date();
  const year = dayNow.getFullYear();
  const month =
    dayNow.getMonth() + 1 < 10
      ? `0${dayNow.getMonth() + 1}`
      : dayNow.getMonth() + 1;
  const date =
    dayNow.getDate() < 10 ? `0${dayNow.getDate()}` : dayNow.getDate();
  const today = `${year}-${month}-${date}`;
  const timeNow = format(dayNow, "hh:mm");
  console.log(timeNow);
  const [selected, setSelected] = useState(today);
  return (
    <div className="reservation-modal-wrap first">
      <DatePicker
        selected={selected}
        setSelected={setSelected}
        dayNow={dayNow}
      />
      <div className="reservation-info-wrap">
        <div className="reservation-how-many">
          <span className="title">
            <label htmlFor="reservePeople"></label>인원 수
          </span>
          <div className="input-item">
            <button className="minus" onClick={peopleMinus}>
              -
            </button>

            <input
              type="text"
              id="reservePeople"
              value={reservation.reservePeople}
            />
            <button className="plus" onClick={peoplePlus}>
              +
            </button>
            <span>명</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationMain;
