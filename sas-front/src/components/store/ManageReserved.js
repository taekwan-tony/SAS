import React, { useState, useEffect } from "react";
import "./managereserved.css";
import { RiReservedFill } from "react-icons/ri";
import { FaHourglassHalf } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import Recal from "./Recal";
import { Link } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { loginStoreNoState, reservationState } from "../utils/RecoilData";

function ManageReserved(props) {
  const setActiveIndex = props.setActiveIndex;
  const [inputValue, setInputValue] = useState(0); // 입력 값 관리
  const [totalValue, setTotalValue] = useState(0); // 누적 값 관리
  const [warningVisible, setWarningVisible] = useState(false); // 경고 메시지 상태
  const maxValue = 20; // 최대 값 설정

  const [reservations, setReservations] = useState([]);
  const [weekReservations, setWeekReservations] = useState([]);
  const storeNo = useRecoilValue(loginStoreNoState);
  const backServer = process.env.REACT_APP_BACK_SERVER;

  // 입금 상태별 예약 건수 상태
  const [pendingCount, setPendingCount] = useState(0); // 입금 대기
  const [completedCount, setCompletedCount] = useState(0); // 결제 완료
  const [cancelledCount, setCancelledCount] = useState(0); // 취소 대기
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    setActiveIndex(6);
    if (storeNo !== 0) {
      axios
        .get(`${backServer}/reservation/reservation/${storeNo}`)
        .then((response) => {
          console.log("예약 데이터: ", response.data);
          setReservations(response.data);

          // 예약 데이터를 달력 형식으로 변환 (필터링 제거)
          const events = response.data.map((reservation) => {
            console.log("reserveTime: ", reservation.RESERVE_TIME);
            let backgroundColor;
            let borderColor;
            // 상태에 따른 색상 지정
            if (reservation.reservePayStatus === 0) {
              backgroundColor = "#ffc107"; // 입금 대기 (노란색)
              borderColor = "#e0a800";
            } else if (reservation.reservePayStatus === 1) {
              backgroundColor = "#28a745"; // 결제 완료 (초록색)
              borderColor = "#218838";
            } else if (reservation.reservePayStatus === 2) {
              backgroundColor = "#dc3545"; // 입금 취소 (빨간색)
              borderColor = "#c82333";
            }

            return {
              title: `${reservation.reserveTime} - ${reservation.reservePeople}명 예약`, // 예약 시간 추가
              date: new Date(reservation.reserveDate).toLocaleDateString(
                "en-CA"
              ),
              backgroundColor, // 상태에 따라 배경색 변경
              borderColor, // 상태에 따라 경계선 색 변경
              extendedProps: {
                reserveNo: reservation.reserveNo,
                seatNo: reservation.seatNo,
                userId: reservation.userId,
              },
            };
          });
          console.log(events);
          setCalendarEvents(events); // 모든 예약 데이터를 상태로 설정
        })
        .catch((error) => {
          console.error("예약 데이터를 가져오는 중 오류 발생:", error);
        });
    }
  }, [storeNo]);

  // 예약 데이터를 서버에서 가져옴
  useEffect(() => {
    if (storeNo !== 0) {
      axios
        .get(`${backServer}/reservation/status/storeNo/${storeNo}`)
        .then((response) => {
          // 입금 상태별로 필터링하여 카운트 계산
          const pending = response.data.filter(
            (reservation) => reservation.RESERVESTATUS === "입금대기"
          ).length;
          const completed = response.data.filter(
            (reservation) => reservation.RESERVESTATUS === "결제완료"
          ).length;
          const cancelled = response.data.filter(
            (reservation) => reservation.RESERVESTATUS === "취소"
          ).length;
          console.log(response.data);
          // 상태별 카운트 설정
          setPendingCount(pending);
          setCompletedCount(completed);
          setCancelledCount(cancelled);
          setWeekReservations(response.data);
        })
        .catch((error) => {
          console.error("예약 데이터를 가져오는 중 오류 발생:", error);
        });
    }
  }, [storeNo]);
  // 입금 상태에 따라 뱃지를 보여주는 함수
  const getPayStatusBadge = (payStatus) => {
    console.log("입금 상태:", payStatus); // 상태 확인을 위한 로그
    switch (payStatus) {
      case "입금대기":
        return <span className="badge bg-warning">입금대기</span>;
      case "결제완료":
        return <span className="badge bg-success">입금완료</span>;
      case "취소":
        return <span className="badge bg-danger">입금취소</span>;
      default:
        return <span className="badge bg-secondary">상태 미확인</span>;
    }
  };
  // 예약 상태와 입금 상태를 결합하여 상태를 계산하는 함수
  const calReservationStatus = (payStatus) => {
    if (payStatus == "입금대기") {
      return "예약대기"; // 입금 완료이면 예약완료로 설정
    } else if (payStatus == "결제완료") {
      return "예약완료"; // 입금 대기일 경우 예약대기로 설정
    } else if (payStatus == "취소") {
      return "예약취소"; // 입금 취소일 경우 예약취소로 설정
    }
  };

  useEffect(() => {
    console.log("Total Value:", totalValue);
    console.log("Input Value:", inputValue);
  }, [totalValue, inputValue]);

  const handleInputChange = (e) => {
    const value = Math.min(Math.max(parseInt(e.target.value, 10), 0), maxValue); // 0에서 maxValue 사이 값만 허용
    setInputValue(value);
  };

  // 추가하기 버튼 클릭 시 호출되는 함수
  const handleAddReservation = () => {
    const newTotal = totalValue + inputValue;
    if (newTotal > maxValue) {
      setWarningVisible(true); // 경고 메시지 표시
    } else if (newTotal <= maxValue && inputValue > 0) {
      setTotalValue((prevTotal) => prevTotal + inputValue); // 누적 값 업데이트
      setWarningVisible(false); // 경고 메시지 숨김
    }
  };

  // 빼기 버튼 클릭 시 호출되는 함수
  const handleRemoveReservation = () => {
    const newTotal = totalValue - inputValue;
    if (newTotal >= 0) {
      setTotalValue((prevTotal) => Math.max(prevTotal - inputValue, 0)); // 누적 값 감소, 0 이하로 내려가지 않도록
      setWarningVisible(false); // 경고 메시지 숨김
    }
  };

  // 게이지의 퍼센트
  const percentage = (totalValue / maxValue) * 100;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const deleteReserve = (reserveNo) => {
    if (window.confirm("정말 이 예약을 삭제하시겠습니까?")) {
      axios
        .delete(`${backServer}/reservation/delete/${reserveNo}`)
        .then((response) => {
          alert(response.data);
          // 삭제 후 예약 목록 다시 불러오기
          setWeekReservations((prevReservations) =>
            prevReservations.filter(
              (reservation) => reservation.RESERVE_NO !== reserveNo
            )
          );
          const index = calendarEvents.findIndex(
            (obj) => obj.extendedProps.reserveNo === reserveNo
          );
          console.log(calendarEvents.length);
          const newCalendarEvents = [...calendarEvents];
          newCalendarEvents.splice(index, 1);
          console.log(calendarEvents.length);
          setCalendarEvents(newCalendarEvents);
        })
        .catch((error) => {
          console.error("예약 삭제 중 오류 발생:", error);
        });
    }
  };
  console.log(1);
  return (
    <>
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>예약관리</h1>

          <Link to="/storecheck/storeNoticeList">
            <button className="button-bell">
              <div className="user-box-bell">
                <div className="user-page-box">
                  <div className="bellWrapper">
                    <i className="fas fa-bell my-bell"></i>
                  </div>

                  <div className="circle first"></div>
                  <div className="circle second"></div>
                  <div className="circle third"></div>
                </div>
              </div>
            </button>
          </Link>
        </header>
      </div>
      <div className="dashboard">
        <div className="owner-background">
          <img src="/image/200.jpg" alt="back" />
        </div>
        {/* 상단 섹션 */}
        <div className="top-section">
          <div className="info-card">
            <div className="info-text">
              <h3>입금 대기</h3>
              <h2>{pendingCount}건</h2>
            </div>
            <div className="info-card-icon-bg">
              <FaHourglassHalf />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>결제 완료</h3>
              <h2>{completedCount}건</h2>
            </div>
            <div className="info-card-icon-bg">
              <FaCircleDollarToSlot />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>취소 대기</h3>
              <h2>{cancelledCount}건</h2>
            </div>
            <div className="info-card-icon-bg">
              <MdCancel />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>금번주 총 예약수</h3>
              <h2>{weekReservations.length}건</h2>
            </div>
            <div className="info-card-icon-bg">
              <RiReservedFill />
            </div>
          </div>
        </div>

        {/* 중단 섹션 */}
        <div className="middle-section">
          <div className="calendar-placeholder">
            <h2>예약 달력</h2>
            <Recal events={calendarEvents} />
          </div>

          <div className="reservation-section">
            <div className="reservation-info">
              <h3>현재 식당 손님 수</h3>
              <div className="gauge-container">
                <svg className="progress-ring" width="120" height="120">
                  <circle
                    className="progress-ring__circle"
                    stroke="#4a90e2"
                    strokeWidth="6"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                    style={{
                      strokeDasharray: `${circumference} ${circumference}`,
                      strokeDashoffset: strokeDashoffset,
                    }}
                  />
                </svg>
                <div className="gauge-text">{totalValue}명</div>
              </div>

              <h4>현장 손님 추가/제거</h4>
              <div className="input-group">
                <label>인원 수 입력:</label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="input-field"
                  // 인풋 필드를 비활성화하지 않음
                />
              </div>

              {/* 경고 메시지 */}
              {warningVisible && (
                <p className="warning-message">
                  더 이상 인원을 추가할 수 없습니다.
                </p>
              )}

              <div className="button-group">
                <button
                  onClick={handleAddReservation}
                  className="add-reservation-btn"
                  disabled={totalValue >= maxValue || inputValue <= 0} // 최대 인원 도달 시 버튼 비활성화
                >
                  추가하기
                </button>

                <button
                  onClick={handleRemoveReservation}
                  className="remove-reservation-btn"
                  disabled={totalValue <= 0 || inputValue <= 0} // 인원이 0이거나 입력 값이 0일 때 버튼 비활성화
                >
                  빼기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 하단테이블 */}
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>순번</th>
                <th>날짜</th>
                <th>예약 시간</th>
                <th>입금현황</th>
                <th>예약현황</th>
                <th>인원수</th>
                <th>좌석번호</th>
                <th>손님아이디</th>
              </tr>
            </thead>
            <tbody>
              {weekReservations.map((reservation, index) => {
                console.log(reservation.RESERVESTATUS);
                return (
                  <tr key={reservation.RESERVE_NO}>
                    <td> {index + 1}</td>
                    <td>
                      {new Date(reservation.RESERVE_DATE).toLocaleDateString()}
                    </td>
                    <td>{reservation.RESERVE_TIME}</td>
                    <td>{getPayStatusBadge(reservation.RESERVESTATUS)}</td>
                    <td>{calReservationStatus(reservation.RESERVESTATUS)}</td>
                    <td>{reservation.RESERVE_PEOPLE}</td>
                    <td>{reservation.SEAT_NO}</td>
                    <td>{reservation.USER_ID}</td>
                    <td>
                      {reservation.RESERVESTATUS === "취소" && (
                        <button
                          className="reserve-del-button"
                          onClick={() => deleteReserve(reservation.RESERVE_NO)}
                        >
                          삭제
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ManageReserved;
