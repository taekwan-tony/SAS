import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isUserLoginState,
  loginUserIdState,
  loginUserNoState,
} from "../utils/RecoilData";
import DatePicker from "../utils/DatePicker";
import { format, parseISO } from "date-fns";
import "./reservationModal.css";
import axios from "axios";
import { resolvePath } from "react-router-dom";
import Swal from "sweetalert2";
const ReservationMain = (props) => {
  const storeNo = props.storeNo;
  const storeName = props.storeName;
  const setIsReserveModalOpen = props.setIsReserveModalOpen;
  const isReserveModalOpen = props.isReserveModalOpen;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  // 예약금
  const [reserveDeposit, setReserveDeposit] = useState({
    payStatus: 0,
    payPrice: 0,
  });
  const [reservationPage, setReservationPage] = useState(1);
  const [reservationStore, setReservationStore] = useState({
    //매장상세, 회원에서 가져와야 할 것들
    seatList: [],
    storeReEnd: "",
    storeReStart: "",
    breakTimeEnd: "",
    breakTimeStart: "",
    deposit: 0,
  });
  // 좌석 개수 셀때 쓸 함수
  const [reservation, setReservation] = useState({
    reserveTime: "",
    reserveDate: new Date(),
    reservePayStatus: 0,
    reservePeople: 1,
    storeNo: storeNo,
    userId: loginUserId,
    seatNo: 0,
    payPrice: 0,
  });
  // console.log(reservation);
  useEffect(() => {
    axios
      .get(`${backServer}/store/storeNo/${storeNo}/getReserveInfo`)
      .then((res) => {
        console.log(res.data);
        setReservationStore({
          ...reservationStore,
          storeNo: res.data.storeNo,
          seatList: res.data.seatList,
          storeReEnd: res.data.storeReEnd,
          storeReStart: res.data.storeReStart,
          breakTimeEnd: res.data.breakTimeEnd,
          breakTimeStart: res.data.breakTimeStart,
          deposit: res.data.deposit,
        });
        // setReservation({
        //   ...reservation,
        //   reservePayStatus: res.data.deposit === 0 ? 0 : 1,
        // });
        setReserveDeposit({
          ...reserveDeposit,
          payStatus: res.data.deposit === 0 ? 0 : 1,
          payPrice: res.data.deposit * reservation.reservePeople,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reservation]);
  // check: 페이지1에서 2로 넘어가기전 체크할것(인원수)/ time: 2에서 오후/오전 써있는거 쓰려고
  const [reserveCheck, setReserveCheck] = useState({ time: "", check: false });
  return (
    <>
      {reservationPage === 1 ? (
        <ReservationModalFirst
          reservationStore={reservationStore}
          setReservationStore={setReservationStore}
          reservation={reservation}
          setReservation={setReservation}
          setReservationPage={setReservationPage}
          setIsReserveModalOpen={setIsReserveModalOpen}
          storeNo={storeNo}
          reservationPage={reservationPage}
          seatList={reservationStore.seatList}
          reserveCheck={reserveCheck}
          setReserveCheck={setReserveCheck}
          setReserveDeposit={setReserveDeposit}
          reserveDeposit={reserveDeposit}
        />
      ) : reservationPage === 2 ? (
        <ReservationModalSecond
          setReservation={setReservation}
          reservationStore={reservationStore}
          reservation={reservation}
          setReservationPage={setReservationPage}
          setIsReserveModalOpen={setIsReserveModalOpen}
          isReserveModalOpen={isReserveModalOpen}
          storeName={storeName}
          reserveCheck={reserveCheck}
          reserveDeposit={reserveDeposit}
        />
      ) : (
        ""
      )}
    </>
  );
};

const ReservationModalFirst = (props) => {
  const {
    storeNo,
    setReservationPage,
    reservation,
    setReservation,
    reservationStore,
    setReservationStore,
    setIsReserveModalOpen,
    isReserveModalOpen,
    reservationPage,
    seatList,
    reserveCheck,
    setReserveCheck,
    reserveDeposit,
  } = props;
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  // 시간박스에 넣을 시간 배열 정의
  const [timeBox, setTimeBox] = useState([]);

  const backServer = process.env.REACT_APP_BACK_SERVER;

  const putTimeBox = (storeReStart, storeReEnd) => {
    let timeHour = Number(storeReStart.substring(0, 2));
    let min = storeReStart.substring(3, 5);
    // console.log(min);
    let meridiem = Math.floor(timeHour / 12) === 0 ? "오전" : "오후";
    let hour = getHour(timeHour);
    const endHour = Number(storeReEnd.substring(0, 2));
    const endMin = storeReEnd.substring(2);
    while (timeHour < endHour) {
      // console.log(timeHour);
      // console.log(endHour);
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
      reserveTime: "",
    });
  };
  const peopleMinus = () => {
    if (reservation.reservePeople > 1) {
      setReservation({
        ...reservation,
        reservePeople: reservation.reservePeople - 1,
        reserveTime: "",
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
  // const [selected, setSelected] = useState(reservation.reserveDate);
  const setSelected = (date) => {
    setReservation({ ...reservation, reserveDate: date, reserveTime: "" });
  };
  // 예약하기 버튼 클릭
  const reserve = () => {
    if (
      reservation.reservePeople !== 0 &&
      reservation.reservePeople !== "" &&
      reservation.reserveDate !== "" &&
      (reservation.reserveTime !== "" || reserveCheck.check)
    ) {
      setReservationPage(2);
    }
  };

  // 시간 박스
  useEffect(() => {
    timeBox.splice(0, timeBox.length);
    setTimeBox([...timeBox]);
    if (
      reservationStore.storeReStart !== null ||
      reservationStore.storeRestart !== ""
    ) {
      if (
        reservationStore.breakTimeEnd === null ||
        reservationStore.breakTimeEnd === ""
      ) {
        putTimeBox(reservationStore.storeReStart, reservationStore.storeReEnd);
      } else {
        putTimeBox(
          reservationStore.storeReStart,
          reservationStore.breakTimeStart
        );
        putTimeBox(reservationStore.breakTimeEnd, reservationStore.storeReEnd);
      }
    }
  }, [reservation, reservationStore]);
  // 각 시간마다 계산할 좌석수 정보
  const [countReserve, setCountReserve] = useState([
    {
      reserveTime: "",
      seatNo: 0,
      seatAmount: 0,
    },
  ]);
  // console.log(countReserve);
  useEffect(() => {
    const date = format(reservation.reserveDate, "yy-MM-dd");
    axios
      .get(
        `${backServer}/reservation/reserveDate/${date}/storeNo/${storeNo}/selectReservationForCount`
      )
      .then((res) => {
        // console.log(res);
        setCountReserve(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reservation]);
  useEffect(() => {
    msgRef.current.style.setProperty("display", "none");
    let peopleCapacity = 0;
    reservationStore.seatList.forEach((seat) => {
      if (seat.seatCapacity > peopleCapacity) {
        peopleCapacity = seat.seatCapacity;
      }
    });
    if (reservation.reservePeople > peopleCapacity) {
      msgRef.current.style.setProperty("display", "block");
    }
  }, [reservationStore, reservation]);
  //메세지 ref
  const msgRef = useRef(null);
  return (
    <div className="reservation-modal-wrap first">
      <DatePicker
        selected={reservation.reserveDate}
        setSelected={setSelected}
        dayNow={dayNow}
      />
      <div className="reservation-info-wrap">
        <div className="reservation-how-many">
          <span className="title">
            <label htmlFor="reservePeople">인원 수</label>
          </span>
          <div className="input-item">
            <span className="input-text colorRed" ref={msgRef}>
              매장에 직접 문의하세요
            </span>
            <button className="minus" onClick={peopleMinus}>
              -
            </button>

            <input
              type="text"
              id="reservePeople"
              value={reservation.reservePeople}
              readOnly={true}
              // onChange={(e) => {
              //   setReservation({
              //     ...reservation,
              //     payPrice: reservationStore.deposit * e.target.value,
              //   });
              // }}
            />
            <button className="plus" onClick={peoplePlus}>
              +
            </button>
            <span className="unit">명</span>
          </div>
        </div>
        <div className="reservation-when">
          {timeBox.map((time, index) => {
            const timeBoxSeatList = [...seatList];

            // const countSeat = countReserve.filter((count, index) => {
            //   return count.reserveTime === time.realTime;
            // });

            // console.log("realTime:", time.realTime, "countSeat:", countSeat);
            return (
              <ReserveTimeBox
                key={"timebox" + index}
                time={time.time}
                timeValue={time.realTime}
                timeNow={timeNow}
                selected={reservation.reserveDate}
                today={dayNow}
                idName={"radio" + index}
                seatList={seatList}
                countReserve={countReserve}
                people={reservation.reservePeople}
                setReservation={setReservation}
                reservation={reservation}
                reserveCheck={reserveCheck}
                setReserveCheck={setReserveCheck}
                timeBoxSeatList={timeBoxSeatList}
              />
            );
          })}
        </div>
        <div className="reservation-how-much">
          <span className="title">
            <label htmlFor="">예약금</label>
          </span>
          <div className="input-item">
            <input
              type="text"
              readOnly={true}
              value={reserveDeposit.payPrice}
            />
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
  const {
    reservation,
    setReservationPage,
    setIsReserveModalOpen,
    storeName,
    reserveCheck,
    reserveDeposit,
    setReservation,
  } = props;
  const pay = {
    payCode: "",
    payPrice: reservation.payPrice,
    reserveNo: 0,
    payMethod: "card",
  };
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  useEffect(() => {
    setReservation({
      ...reservation,
      reservePayStatus: reserveDeposit.payStatus,
      payPrice: reserveDeposit.payPrice,
    });
    // 외부 스크립트 로드 함수
    const loadScript = (src, callback) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.onload = callback;
      document.head.appendChild(script);
    };
    // 스크립트 로드 후 실행
    loadScript("https://code.jquery.com/jquery-1.12.4.min.js", () => {
      loadScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js", () => {
        const IMP = window.IMP;
        // 가맹점 식별코드
        IMP.init("imp11260778");
      });
    });
    // 컴포넌트가 언마운트될 때 스크립트를 제거하기 위한 정리 함수
    return () => {
      const scripts = document.querySelectorAll('script[src^="https://"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);
  // console.log(reservation);
  // 날짜 출력 중 요일 띄우려는 로직
  const reservationDay = format(reservation.reserveDate, "e");
  const reservationDayKor =
    reservationDay == 2
      ? "월"
      : reservationDay == 3
      ? "화"
      : reservationDay == 4
      ? "수"
      : reservationDay == 5
      ? "목"
      : reservationDay == 6
      ? "금"
      : reservationDay == 7
      ? "토"
      : "일";
  const reservationDate = format(reservation.reserveDate, "M.dd");
  const reserveFullDate = `${reservationDate}(${reservationDayKor})`;
  // 예약버튼
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const reserve = () => {
    // console.log(reservation);
    // console.log(typeof reservation.reserveDate);
    axios
      .post(`${backServer}/reservation`, reservation)
      .then((res) => {
        // console.log(res);
        if (res.data.result) {
          let isPayed = true;
          console.log("결제여부", reserveDeposit.payStatus);
          if (reserveDeposit.payStatus !== 0) {
            const payCode = `${res.data.reserveNo}-${
              reservation.reserveDate.getFullYear() +
              reservation.reserveDate.getMonth() +
              reservation.reserveDate.getDate()
            }${reservation.reserveTime}${new Date().getSeconds()}`;
            console.log(payCode);
            pay.payCode = payCode;
            pay.reserveNo = res.data.reserveNo;
            isPayed = goToPay(pay);
          } else {
            Swal.fire({
              title: "예약 완료",
              icon: "success",
              confirmButtonColor: "var(--main1)",
            }).then(() => {
              setReservationPage(1);
              setIsReserveModalOpen(false);
            });
          }
          if (!isPayed) {
            Swal.fire({
              title: "결제 실패",
              text: "결제에 실패하였습니다. 잠시후에 다시 시도해주세요",
              icon: "error",
              confirmButtonColor: "var(--main1)",
            }).then(() => {
              setReservationPage(1);
              setIsReserveModalOpen(false);
            });
          }
        } else {
          Swal.fire({
            title: "이미 예약 내역이 존재합니다",
            text: "예약 정보를 다시 확인해 주세요",
            icon: "warning",
            iconColor: "var(--main1)",
            confirmButtonColor: "var(--main1)",
          }).then(() => {
            setReservationPage(1);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const goToPay = (pay) => {
    console.log("pay 진행중");
    let payResult = true;
    const user = {};
    axios
      .get(`${backServer}/user/userNo/${loginUserNo}/reservation`)
      .then((res) => {
        user.userEmail = res.data.userEmail;
        user.userName = res.data.userName;
        user.userPhone = res.data.userPhone;
      })
      .catch((err) => {
        console.log(err);
        payResult = false;
      });
    if (payResult) {
      console.log("pay 결제창 떠야함");
      window.IMP.request_pay(
        {
          pg: "html5_inicis.INIpayTest", //테스트 시 html5_inicis.INIpayTest 기재
          pay_method: "card",
          merchant_uid: pay.payCode, //상점에서 생성한 고유 주문번호(primary key 이므로 고정값을 두면 안됨>>보통 현재시간을 둠)
          name: "Spoon&Smiles 예약 결제",
          amount: pay.payPrice,
          buyer_email: user.userEmail,
          buyer_name: user.userName,
          buyer_tel: user.userPhone,
        },
        function (rsp) {
          //rsp에 들어오는 값>> 위의 결제 페이지에서 결제 성공했는지 여부?
          if (rsp.success) {
            axios
              .post(`${backServer}/reservation/pay`, pay)
              .then((res) => {
                if (!res.data) {
                  payResult = false;
                } else {
                  Swal.fire({
                    title: "예약 완료",
                    icon: "success",
                    confirmButtonColor: "var(--main1)",
                  }).then(() => {
                    setReservationPage(1);
                    setIsReserveModalOpen(false);
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            axios
              .delete(`${backServer}/reservation/delete/${pay.reserveNo}`)
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
            payResult = false;
          }
        }
      );
    }
    return payResult;
  };
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
              <span className="info">{reserveFullDate}</span>
            </div>
            <div className="content-wrap">
              <span class="material-icons icon">schedule</span>
              <span className="info">{reserveCheck.time}</span>
            </div>
            <div className="content-wrap">
              <span class="material-icons icon">person</span>
              <span className="info">{reservation.reservePeople + " 명"}</span>
            </div>
            {reservation.reservePayStatus !== 0 ? (
              <div className="content-wrap">
                <span class="material-icons icon">credit_card</span>
                <span className="info">{reservation.payPrice + " 원"}</span>
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
            reserve();
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

const ReserveTimeBox = (props) => {
  const {
    time,
    timeValue,
    timeNow,
    today,
    selected,
    idName,
    // seatList,
    countReserve,
    people,
    setReservation,
    reservation,
    msgRef,
    reserveCheck,
    setReserveCheck,
    timeBoxSeatList,
  } = props;
  // console.log(timeValue);
  // console.log(seatList);
  // console.log("1111111", seatList); //=>얘가 왠지 모르겠는데 값을 계속 받아감..
  // 시간이 늦은건지 여부 확인하는 함수
  const isLate = (timeNow, timeValue) => {
    const nowHour = Number(timeNow.substring(0, 2));
    const valueHour = Number(timeValue.substring(0, 2));
    const nowMin = Number(timeNow.substring(3));
    const valueMin = Number(timeValue.substring(3));
    const bool =
      nowHour < valueHour || (nowHour === valueHour && nowMin < valueMin);
    return bool;
  };
  // console.log(timeBoxSeatList);
  // console.log(countReserve);
  // 좌석수 계산해서 자리 있는지 계산하는 함수=>굳이 함수여야 할 이유가 있는지 생각하기(애는 이 컴포넌트에서 이번 한번만 돌아가는데 굳이 함수일 필요가 있을까?)
  //too many re-renders : 리엑트의 한계에 도달할 정도로 리렌더링이 너무 많이 돌아감->주로 잘못된 setState 사용(setState는 컴포넌트의 바디에 직접적으로 사용하지 말고 useEffect 나 이벤트 핸들러에서만 사용할것)

  const [countSeat, setCountSeat] = useState([]);
  const [amount, setAmount] = useState(0);
  // const [countCheck, setCountCheck] = useState(false);
  useEffect(() => {
    // 시간대로 자름
    const countReserveFilter = countReserve.filter((count, index) => {
      return count.reserveTime === timeValue;
    });
    //countSeat 초기화
    countSeat.splice(0, countSeat.length);
    // console.log("지워져야함", selected, timeValue, countSeat);
    let amountCount = 0;
    // const countSeatAvailable = () => {
    // console.log(timeBoxSeatList);
    timeBoxSeatList.forEach((seat, index) => {
      // console.log(seat.seatAmount);
      // console.log(countReserve);
      let isExist = false;
      countReserveFilter.forEach((count, j) => {
        if (count.seatNo === seat.seatNo) {
          //예약내역이 있으면 사용한 좌석수만큼 개수가 빠진 값이 들어감
          countSeat.push({
            seatNo: seat.seatNo,
            seatCapacity: seat.seatCapacity,
            seatAmount: seat.seatAmount - count.seatAmount,
          });
          isExist = true;
          amountCount += seat.seatAmount - count.seatAmount;
          return;
        }
      });
      if (!isExist) {
        //예약내역이 없으면 기존 값으로 들어감
        // console.log(timeValue, seat.seatNo);
        countSeat.push(seat);
        amountCount += amount + seat.seatAmount;
      }
      // console.log(`${timeValue}당시 남은 좌석 총 개수 ${index}:`, amountCount);
    });
    setCountSeat([...countSeat]);
    setAmount(amountCount);
    // setCountCheck(!countCheck);
  }, [reservation, countReserve]); //날짜, 인원수가 바뀔때마다
  const [isAble, setIsAble] = useState(false);
  const [available, setavailable] = useState(false);
  useEffect(() => {
    setReserveCheck({ ...reserveCheck, check: true });
    // isAble
    setIsAble((today < selected || isLate(timeNow, timeValue)) && amount > 0);
    //available
    let seatNo = 0;
    let seatCapacity = 0;
    // console.log(countSeat);
    countSeat.forEach((seat, index) => {
      if (seat.seatAmount > 0 && seat.seatCapacity >= people) {
        if (seatNo == 0 || seatCapacity >= seat.seatCapacity) {
          seatNo = seat.seatNo;
          seatCapacity = seat.seatCapacity;
        }
      }
    });
    if (seatNo == 0) {
      setavailable(true);
      setReserveCheck({ ...reserveCheck, check: false });
    } else {
      setavailable(false);
      setReserveSeatNo(seatNo);
    }
    // console.log(isAble);
    // setReservation({ ...reservation, reserveTime: "" });
    // console.log(
    //   "time : ",
    //   timeValue,
    //   "isAble : ",
    //   (today < selected || isLate(timeNow, timeValue)) && amount > 0,
    //   // "amount: ",
    //   // amount
    //   "available : ",
    //   seatNo === 0
    // );
  }, [amount, countSeat]); //people, selected 모두 결국 reservation 안의 value 이므로>>어차피 그 둘 바뀌면 앞에서 amount, countSeat 바뀔거니까
  // console.log(isAble);
  // console.log(countSeatAvailable());
  // 체크할시에 가져올 seatNo 값;
  const [reserveSeatNo, setReserveSeatNo] = useState(0);
  // 인원수 바뀔때마다 자리 앉을 수 있는지 여부 체크
  // console.log(available, isAble);
  return (
    <div className="time-btn-box">
      {/* 버튼 활성화 안할때 disabled 라는 클래스명 추가할것 */}
      <input
        name="reserveTime"
        type="radio"
        value={timeValue}
        id={idName} //key로 가져올듯
        style={{ display: "none" }}
        disabled={!isAble || available}
        checked={isAble && !available && timeValue === reservation.reserveTime}
        onChange={() => {
          // console.log(reserveSeatNo);
          setReservation({
            ...reservation,
            reserveTime: timeValue,
            seatNo: reserveSeatNo,
            // reserveDate: selected,
          });
          setReserveCheck({ ...reserveCheck, time: time, check: true });
        }}
      />
      <label
        className={
          "round time-btn btn-main" + (!isAble || available ? " disabled" : "")
        }
        htmlFor={idName}
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
