import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { isUserLoginState, loginUserIdState } from "../utils/RecoilData";
import DatePicker from "../utils/DatePicker";
import { format, parseISO } from "date-fns";
import "./reservationModal.css";
import axios from "axios";
import { resolvePath } from "react-router-dom";
const ReservationMain = (props) => {
  const storeNo = props.storeNo;
  const storeName = props.storeName;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  const [reservationPage, setReservationPage] = useState(1);
  const [reservation, setReservation] = useState({
    reserveDate: "",
    // 결제여부는 매장 상세에서 가져와야함
    reservePayStatus: 0,
    reservePeople: 1,
    //매장상세, 회원에서 가져와야 할 것들
    storeNo: storeNo,
    userId: loginUserId,
    seatList: [],
    storeReEnd: "",
    storeReStart: "",
    breakTimeEnd: "",
    breakTimeStart: "",
    deposit: 0,
    payPrice: 0,
  });

  useEffect(() => {
    axios
      .get(`${backServer}/store/storeNo/${storeNo}/getReserveInfo`)
      .then((res) => {
        console.log(res);
        setReservation({
          ...reservation,
          storeNo: res.data.storeNo,
          seatList: res.data.seatList,
          storeReEnd: res.data.storeReEnd,
          storeReStart: res.data.storeReStart,
          breakTimeEnd: res.data.breakTimeEnd,
          breakTimeStart: res.data.breakTimeStart,
          reservePayStatus: res.data.deposit === 0 ? 0 : 1,
          deposit: res.data.deposit,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {reservationPage === 1 ? (
        <ReservationModalFirst
          reservation={reservation}
          setReservation={setReservation}
          setReservationPage={setReservationPage}
          setIsReserveModalOpen={setIsReserveModalOpen}
          storeNo={storeNo}
          reservationPage={reservationPage}
        />
      ) : reservationPage === 2 ? (
        <ReservationModalSecond
          reservation={reservation}
          setReservationPage={setReservationPage}
          setIsReserveModalOpen={setIsReserveModalOpen}
          isReserveModalOpen={isReserveModalOpen}
          storeName={storeName}
        />
      ) : (
        ""
      )}
    </>
  );
};

const ReservationModalFirst = (props) => {
  const storeNo = props.storeNo;
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const setReservationPage = props.setReservationPage;
  const reservation = props.reservation;
  const setReservation = props.setReservation;
  const setIsReserveModalOpen = props.setIsReserveModalOpen;
  const isReserveModalOpen = props.isReserveModalOpen;
  const reservationPage = props.reservatioPage;
  const [timeBox, setTimeBox] = useState([]);
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const putTimeBox = (storeReStart, storeReEnd) => {
    let timeHour = Number(storeReStart.substring(0, 2));
    let min = storeReStart.substring(3);
    let meridiem = Math.floor(timeHour / 12) === 0 ? "오전" : "오후";
    let hour = getHour(timeHour);
    const endHour = Number(storeReEnd.substring(0, 2));
    const endMin = storeReEnd.substring(2);
    while (timeHour < endHour) {
      console.log(timeHour);
      console.log(endHour);
      const stringHour = toString(timeHour).padStart(2, 0);
      timeBox.push({
        time: `${meridiem} ${hour}:${min}`,
        realTime: `${String(timeHour).padStart(2, 0)}:${min}`,
      });
      setTimeBox([...timeBox]);
      timeHour++;
      hour = getHour(timeHour);
    }
  };
  const getHour = (timeHour) => {
    const hour = timeHour % 12 === 0 ? 12 : timeHour % 12;
    return hour;
  };
  // console.log(reservation.reservePeople, typeof reservation.reservePeople);
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
  const today = `${year}/${month}/${date}`;
  const timeNow = format(dayNow, "HH:mm");
  // console.log(timeNow);
  const [selected, setSelected] = useState(today);

  // 예약하기 버튼 클릭
  const reserve = () => {
    setReservationPage(2);
  };

  // 시간 박스
  useEffect(() => {
    timeBox.splice(0, timeBox.length);
    setTimeBox([...timeBox]);
    if (
      reservation.storeReStart !== null &&
      ReservationMain.storeRestart !== ""
    ) {
      if (
        reservation.breakTimeEnd === null ||
        reservation.breakTimeStart === ""
      ) {
        putTimeBox(reservation.storeReStart, reservation.storeReEnd);
      } else {
        putTimeBox(reservation.storeReStart, reservation.breakTimeStart);
        putTimeBox(reservation.breakTimeEnd, reservation.storeReEnd);
      }
    }
  }, [selected, reservation.storeReStart]);
  // 각 시간마다 계산할 좌석수 정보
  const [countReserve, setCountReserve] = useState({
    reserveTime: "",
    seat_no: 0,
  });
  useEffect(() => {
    const date = format(selected, "yy-MM-dd");
    axios
      .get(
        `${backServer}/reservation/reserveDate/${date}/storeNo/${storeNo}/selectReservationForCount`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selected]);
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
              onChange={(e) => {
                setReservation({
                  ...reservation,
                  payPrice: reservation.deposit * e.target.value,
                });
              }}
            />
            <button className="plus" onClick={peoplePlus}>
              +
            </button>
            <span className="unit">명</span>
          </div>
        </div>
        <div className="reservation-when">
          {timeBox.map((time, index) => {
            console.log(time);
            return (
              <ReserveTimeBox
                key={"timebox" + index}
                time={time.time}
                timeValue={time.realTime}
                timeNow={timeNow}
                selected={selected}
                today={dayNow}
              />
            );
          })}
        </div>
        <div className="reservation-how-much">
          <span className="title">
            <label htmlFor="">예약금</label>
          </span>
          <div className="input-item">
            <input type="text" readOnly={true} value={reservation.payPrice} />
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
  const { reservation, setReservationPage, setIsReserveModalOpen, storeName } =
    props;
  return (
    <div className="reservation-modal-wrap second">
      <div className="modalTitle">
        <h1>예약화인</h1>
        <p className="text">예약 일정을 다시 한번 확인해 주세요</p>
      </div>
      <div className="modalContent">
        <div className="reservation-info-wrap round">
          <h2>{storeName}</h2>
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
              <span className="info">{reservation.reservePeople + " 명"}</span>
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
            setReservationPage(1);
            setIsReserveModalOpen(false);
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

const ReserveTimeBox = (props) => {
  const { time, timeValue, timeNow, today, selected } = props;
  console.log(timeValue);
  const isLate = (timeNow, timeValue) => {
    const nowHour = Number(timeNow.substring(0, 2));
    const valueHour = Number(timeValue.substring(0, 2));
    const nowMin = Number(timeNow.substring(3));
    const valueMin = Number(timeValue.substring(3));
    const bool =
      nowHour < valueHour || (nowHour === valueHour && nowMin < valueMin);
    return bool;
  };
  const isAble = today < selected || isLate(timeNow, timeValue);
  // console.log(isAble);
  return (
    <div className="time-btn-box">
      {/* 버튼 활성화 안할때 disabled 라는 클래스명 추가할것 */}
      <input
        name="reserveTime"
        type="radio"
        value={timeValue}
        id={"radioButton"} //key로 가져올듯
        style={{ display: "none" }}
        disabled={!isAble}
      />
      <label
        className={"round time-btn btn-main" + (isAble ? "" : " disabled")}
        htmlFor="radioButton"
      >
        {time}
      </label>
    </div>
  );
};

export {
  ReservationMain,
  ReservationModalFirst,
  ReservationModalSecond,
  ReserveTimeBox,
};
