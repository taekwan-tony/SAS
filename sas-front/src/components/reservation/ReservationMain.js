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
      height: "470px",
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
              setReservationPage={setReservationPage}
            />
          ) : reservationPage === 2 ? (
            <ReservationModalSecond
              reservation={reservation}
              setReservationPage={setReservationPage}
              setIsReserveModalOpen={setIsReserveModalOpen}
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
  const setReservationPage = props.setReservationPage;
  const reservation = props.reservation;
  const setReservation = props.setReservation;
  const peoplePlus = () => {
    setReservation({
      ...reservation,
      reservePeople: reservation.reservePeople + 1,
    });
  };
  const peopleMinus = () => {
    if (reservation.reservePeople > 1) {
      setReservation({
        ...reservation,
        reservePeople: reservation.reservePeople - 1,
      });
    }
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

  // 예약하기 버튼 클릭
  const reserve = () => {
    setReservationPage(2);
  };
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
            <label htmlFor="reservePeople">인원 수</label>
          </span>
          <div className="input-item">
            <button className="minus" onClick={peopleMinus}>
              -
            </button>

            <input
              type="text"
              id="reservePeople"
              value={reservation.reservePeople}
              readOnly={true}
            />
            <button className="plus" onClick={peoplePlus}>
              +
            </button>
            <span className="unit">명</span>
          </div>
        </div>
        <div className="reservation-when">
          <ReserveTimeBox />
          <ReserveTimeBox />
          <ReserveTimeBox />
          <ReserveTimeBox />
          <ReserveTimeBox />
          <ReserveTimeBox />
          <ReserveTimeBox />
        </div>
        <div className="reservation-how-much">
          <span className="title">
            <label htmlFor="">예약금</label>
          </span>
          <div className="input-item">
            <input type="text" readOnly={true} value={8000} />
            <span className="unit">원</span>
          </div>
        </div>
        <div className="btn-box">
          <button className="btn-main round" onClick={reserve}>
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
};

const ReservationModalSecond = (props) => {
  const { reservation, setReservationPage, setIsReserveModalOpen } = props;
  return (
    <div className="reservation-modal-wrap second">
      <div className="modalTitle">
        <h1>예약화인</h1>
        <p className="text">예약 일정을 다시 한번 확인해 주세요</p>
      </div>
      <div className="modalContent">
        <div className="reservation-info-wrap round">
          <h2>가게이름</h2>
          <div className="reservation-info-content">
            <div className="content-wrap">
              <span class="material-icons icon">calendar_today</span>
              <span className="info">9.13(금)</span>
            </div>
            <div className="content-wrap">
              <span class="material-icons icon">schedule</span>
              <span className="info">오후 4:00</span>
            </div>
            <div className="content-wrap">
              <span class="material-icons icon">person</span>
              <span className="info">8명</span>
            </div>
            {reservation.reservePayStatus !== 0 ? (
              <div className="content-wrap">
                <span class="material-icons icon">credit_card</span>
                <span className="info">8000원</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="modalFooter">
        <button
          className="btn-sub round"
          onClick={() => {
            setReservationPage(1);
          }}
        >
          변경
        </button>
        <button
          className="btn-main round"
          onClick={() => {
            setIsReserveModalOpen(false);
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

const ReserveTimeBox = () => {
  return (
    <div className="time-btn-box">
      {/* 버튼 활성화 안할때 disabled 라는 클래스명 추가할것 */}
      <button className="round time-btn btn-main">오후 5:00</button>
    </div>
  );
};

export default ReservationMain;
