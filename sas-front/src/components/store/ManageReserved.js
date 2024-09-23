import React, { useState, useEffect } from "react";
import "./managereserved.css";
import { RiReservedFill } from "react-icons/ri";
import { FaHourglassHalf } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

function ManageReserved() {
  const [inputValue, setInputValue] = useState(0); // 입력 값 관리
  const [totalValue, setTotalValue] = useState(0); // 누적 값 관리
  const [warningVisible, setWarningVisible] = useState(false); // 경고 메시지 상태
  const maxValue = 100; // 최대 값 설정

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

  return (
    <>
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>예약관리</h1>
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
              <h2>
                5건 <span className="positive">+55%</span>
              </h2>
            </div>
            <div className="info-card-icon-bg">
              <FaHourglassHalf />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>결제 완료</h3>
              <h2>
                2건 <span className="positive">+3%</span>
              </h2>
            </div>
            <div className="info-card-icon-bg">
              <FaCircleDollarToSlot />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>취소 대기</h3>
              <h2>
                1건 <span className="negative">-2%</span>
              </h2>
            </div>
            <div className="info-card-icon-bg">
              <MdCancel />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>금일 총 예약수</h3>
              <h2>
                10건 <span className="positive">+5%</span>
              </h2>
            </div>
            <div className="info-card-icon-bg">
              <RiReservedFill />
            </div>
          </div>
        </div>

        {/* 중단 섹션 */}
        <div className="middle-section">
          <div className="calendar-placeholder">
            <h2>달력 API 연결 예정</h2>
            {/* 여기에 API로 가져온 달력 데이터를 넣을 공간 */}
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
                <th>이름</th>
                <th>날짜</th>
                <th>시간</th>
                <th>입금현황</th>
                <th>전화번호</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1</td>
                <td>임민규</td>
                <td>2024-09-18</td>
                <td>18:30</td>
                <td>
                  <span className="badge bg-danger">입금취소</span>
                </td>
                <td>010-1111-1111</td>
              </tr>
              <tr>
                <td>#2</td>
                <td>김새봄</td>
                <td>2024-09-19</td>
                <td>15:30</td>
                <td>
                  <span className="badge bg-warning">입금대기</span>
                </td>
                <td>010-1111-1111</td>
              </tr>
              <tr>
                <td>#3</td>
                <td>윤태구</td>
                <td>2024-09-20</td>
                <td>17:30</td>
                <td>
                  <span className="badge bg-success">입금완료</span>
                </td>
                <td>010-1111-1111</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ManageReserved;
