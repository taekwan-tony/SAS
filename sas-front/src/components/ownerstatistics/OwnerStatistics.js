import React, { useState } from "react";
import "./ownerstatistics.css";
import { Link } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { RiReservedFill } from "react-icons/ri";
import { FaPersonHalfDress, FaSackDollar } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Ownerstatistics() {
  // Line chart data
  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "이번달 손님",
        data: [200, 300, 400, 500, 400, 350, 450, 500, 350, 450, 250, 330],
        borderColor: "#1e90ff",
        backgroundColor: "rgba(30, 144, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "지난달손님",
        data: [150, 250, 350, 450, 300, 320, 400, 470, 300, 400, 280, 320],
        borderColor: "#20c997",
        backgroundColor: "rgba(32, 201, 151, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "손님수",
        data: [200, 300, 150, 400, 350, 100, 320],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const employeedata = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "홀직원",
        data: [15, 25, 35, 40, 45, 60, 80, 60, 65, 70, 75, 85],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "주방직원",
        data: [5, 15, 25, 35, 50, 65, 70, 75, 70, 65, 63, 66],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const employeeoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", // 레전드 텍스트 색상을 하얀색으로 설정
        },
      },
      title: {
        display: true,
        text: "Worldwide Sales",
        color: "white", // 타이틀 텍스트 색상을 하얀색으로 설정
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // X축 텍스트 색상
        },
      },
      y: {
        ticks: {
          color: "white", // Y축 텍스트 색상
        },
      },
    },
  };
  return (
    <>
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>통계관리</h1>
        </header>
      </div>
      <div className="dashboard">
        <div className="owner-background">
          <img src="/image/238.jpg" alt="back" />
        </div>
        {/* 상단 섹션 */}
        <div className="top-section">
          <div className="info-card">
            <div className="info-text">
              <h3>이번달 총 예약 수</h3>
              <h2>
                $53,000 <span className="positive">+55%</span>
              </h2>
            </div>
            <div className="info-card-icon-bg">
              <RiReservedFill />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>방문한 총 고객 수</h3>
              <h2>
                2,300 <span className="positive">+3%</span>
              </h2>
            </div>
            <div className="info-card-icon-bg">
              <FaPersonHalfDress />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>이번달 배달/포장 수</h3>
              <h2>
                +3,462 <span className="negative">-2%</span>
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
                $103,430 <span className="positive">+5%</span>
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

          <div className="satisfaction">
            <h3>남녀 비율</h3>
            <p>From all projects</p>
            <div className="satisfaction-rate">
              <span>95%</span>
              <p>Based on likes</p>
            </div>
          </div>

          <div className="referral-tracking">
            <h3>연령대 분포</h3>
            <p>Invited: 145 people</p>
            <p>Bonus: 1,465</p>
            <div className="safety-score">
              <span>9.3</span>
              <p>Total Score</p>
            </div>
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="bottom-section">
          {/* 그래프 섹션 */}
          <div className="chart-empl-container">
            <h3>매장 내 직원 수</h3>
            <Bar data={employeedata} options={employeeoptions} />
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
            <Line data={lineData} />
          </div>

          <div className="chart-container">
            <h3>이번주 손님 수</h3>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Ownerstatistics;
