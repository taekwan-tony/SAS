import React, { useEffect, useState } from "react";
import "./ownerstatistics.css";
import { RiReservedFill } from "react-icons/ri";
import { FaPersonHalfDress, FaSackDollar } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import axios from "axios";
import Chart, { chartData, chartOptions } from "../store/Chart";

function Ownerstatistics() {
  const [totalReserve, setTotalReserve] = useState(0); // 이번달 예약 건수 상태
  const [totalReservedPeople, setTotalReservedPeople] = useState(0); // 이번달 예약된 총 인원수 상태
  const [updatedChartData, setUpdatedChartData] = useState({
    ...chartData,
    agedata: {
      labels: [],
      datasets: [{ data: [] }],
    },
  });

  const backServer = process.env.REACT_APP_BACK_SERVER;

  useEffect(() => {
    axios
      .get(`${backServer}/reservation/totalreservation/storeNo/90`)
      .then((response) => {
        setTotalReserve(response.data);
      })
      .catch((error) => {
        console.error("예약 데이터 가져오기 실패:", error);
      });
  }, [backServer]);

  // 예약된 총 인원수 가져오기
  useEffect(() => {
    axios
      .get(`${backServer}/reservation/totalreservedpeople/storeNo/90`)
      .then((response) => {
        setTotalReservedPeople(response.data);
      })
      .catch((error) => {
        console.error("예약된 총 인원수 데이터 가져오기 실패:", error);
      });

    // 연령대 데이터 가져와서 차트 업데이트
    axios
      .get(`${backServer}/reservation/agereservation/storeNo/90`)
      .then((response) => {
        const fetchedData = response.data;
        const ageLabels = fetchedData.map((item) => item.ageGroup);
        const ageCounts = fetchedData.map((item) => item.totalPeople);

        if (ageLabels.length > 0 && ageCounts.length > 0) {
          console.log(1);
          setUpdatedChartData((prevData) => ({
            ...prevData,
            agedata: {
              ...prevData.agedata,
              labels: ageLabels,
              datasets: [
                {
                  ...prevData.agedata.datasets[0],
                  data: ageCounts,
                },
              ],
            },
          }));
          console.log(response);
        }
      })
      .catch((error) => {
        console.error("연령대 데이터 가져오기 실패:", error);
      });
  }, [backServer]);

  return (
    <>
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>통계관리</h1>
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
              <h3>이번달 총 예약 수</h3>
              <h2>{totalReserve}건</h2>
            </div>
            <div className="info-card-icon-bg">
              <RiReservedFill />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>방문한 총 고객 수</h3>
              <h2>{totalReservedPeople}명</h2> {/* 상태를 표시 */}
            </div>
            <div className="info-card-icon-bg">
              <FaPersonHalfDress />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>이번달 배달/포장 수</h3>
              <h2>
                120건 <span className="negative">-5%</span>
              </h2>
            </div>
            <div className="info-card-icon-bg">
              <MdDeliveryDining />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>금일 매출</h3>
              <h2>
                7,500,000원 <span className="positive">+5%</span>
              </h2>
            </div>
            <div className="info-card-icon-bg">
              <FaSackDollar />
            </div>
          </div>
        </div>

        {/* 중단 섹션 */}
        <div className="middle-section">
          <div className="main-info">
            <div className="main-info-text">
              <h3>환영합니다</h3>
              <h1>OOO 점주님</h1>
              <p>
                이곳에서 각종 통계자료를 볼 수 있습니다.
                <br />
                좋은 하루되세요
              </p>
            </div>
            <div className="main-info-image">
              <img src="/image/s&s로고.png" alt="main-info-img" />
            </div>
          </div>

          <div className="mf-ratio">
            <h3>남녀 비율</h3>
            <Chart type="doughnut" data={updatedChartData.doughnutData} />
          </div>

          <div className="age-distribution">
            <h3>연령대 분포</h3>
            <Chart
              type="bar"
              data={updatedChartData.agedata}
              options={chartOptions.generalOptions}
            />
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="bottom-section">
          {/* 그래프 섹션 */}
          <div className="chart-empl-container">
            <h3>매장 내 직원 수</h3>
            <Chart
              type="bar"
              data={chartData.employeedata}
              options={chartOptions.employeeOptions}
            />
          </div>

          <div className="orders-overview">
            <h3>가장 많이 주문한 음식</h3>
            <ul>
              <li>
                <img
                  src="/image/IMG_3238.jpg"
                  alt="Food 1"
                  className="order-image"
                />
                <span>$2400 알 깨고 나온 윤태구</span>
              </li>
              <li>
                <img
                  src="/image/IMG_3238.jpg"
                  alt="Food 2"
                  className="order-image"
                />
                <span>$2400 알 깨고 나온 윤태구</span>
              </li>
              {/* 다른 주문 아이템 추가 */}
            </ul>
          </div>
        </div>

        {/* 하단 테이블 영역에 차트 추가 */}
        <div className="charts-section">
          <div className="chart-container">
            <h3>매출 그래프</h3>
            <Chart type="line" data={chartData.lineData} />
          </div>

          <div className="chart-container">
            <h3>이번주 손님 수</h3>
            <Chart type="bar" data={chartData.barData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Ownerstatistics;
