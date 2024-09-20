import React, { useState } from "react";
import "./ownerstatistics.css";
import { Link } from "react-router-dom";

function OwnerStatistics() {
  const [activeIndex, setActiveIndex] = useState(0); // 활성화된 리스트 항목을 추적하는 상태

  const handleClick = (index) => {
    // 이미 활성화된 항목이면 다시 클릭 시 변경되지 않도록 설정
    if (activeIndex !== index) {
      setActiveIndex(index); // 클릭된 항목의 인덱스를 설정
    }
  };

  const menuItems = [
    { text: "매장페이지", icon: "fa-solid fa-store", to: "/storepage" },
    { text: "매장등록", icon: "fas fa-id-card", to: "/storeRegist" },
    { text: "메뉴등록", icon: "fas fa-utensils", to: "/menuRegist" },
    { text: "제휴결제", icon: "fas fa-money-check-alt", to: "/payment" },
    {
      text: "리뷰관리",
      icon: "fa-regular fa-comment-dots",
      to: "/storemain/managereview",
    },
    {
      text: "통계관리",
      icon: "fas fa-chart-line",
      to: "/storemain/ownerstatistics",
    },
    {
      text: "예약관리",
      icon: "far fa-calendar-alt",
      to: "/storemain/managereserved",
    },
  ];

  return (
    <>
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>관리자 통계</h1>
        </header>
      </div>
      <div className="dashboard">
        <div className="owner-background">
          <img src="/image/238.jpg" alt="back" />
        </div>
        {/* 상단 섹션 */}
        <div className="top-section">
          <div className="info-card">
            <h3>Today's Money</h3>
            <h2>
              $53,000 <span className="positive">+55%</span>
            </h2>
          </div>
          <div className="info-card">
            <h3>Today's Users</h3>
            <h2>
              2,300 <span className="positive">+3%</span>
            </h2>
          </div>
          <div className="info-card">
            <h3>New Clients</h3>
            <h2>
              +3,462 <span className="negative">-2%</span>
            </h2>
          </div>
          <div className="info-card">
            <h3>Total Sales</h3>
            <h2>
              $103,430 <span className="positive">+5%</span>
            </h2>
          </div>
        </div>

        {/* 중단 섹션 */}
        <div className="middle-section">
          <div className="main-info">
            <h2>Welcome back</h2>
            <h1>Store Owner</h1>
            <p>Glad to see you again! Ask me anything.</p>
            <button className="record-btn">Tap to record →</button>
          </div>

          <div className="satisfaction">
            <h3>Satisfaction Rate</h3>
            <p>From all projects</p>
            <div className="satisfaction-rate">
              <span>95%</span>
              <p>Based on likes</p>
            </div>
          </div>

          <div className="referral-tracking">
            <h3>Referral Tracking</h3>
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
          <div className="projects">
            <h3>Projects</h3>
            <ul>
              <li>
                <span className="project-name">Chakra Vision UI Version</span>
                <span className="project-progress">60%</span>
              </li>
              <li>
                <span className="project-name">Add Progress Track</span>
                <span className="project-progress">10%</span>
              </li>
              {/* 다른 프로젝트 아이템 추가 */}
            </ul>
          </div>

          <div className="orders-overview">
            <h3>Orders Overview</h3>
            <ul>
              <li>$2400, Design changes - 22 DEC 7:20 PM</li>
              <li>New order #1832412 - 21 DEC 11 PM</li>
              {/* 다른 주문 아이템 추가 */}
            </ul>
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
                  <span className="badge bg-danger">입금전</span>
                </td>
                <td>010-1111-1111</td>
              </tr>
              <tr>
                <td>#2</td>
                <td>김새봄</td>
                <td>2024-09-19</td>
                <td>15:30</td>
                <td>
                  <span className="badge bg-primary">입금중</span>
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

      {/* 하단 네비 */}
      <div className="owner-navi">
        <div className="navigation">
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`list ${activeIndex === index ? "active" : ""}`}
                onClick={() => handleClick(index)}
              >
                <Link to={item.to}>
                  <span className="icon">
                    <i className={item.icon}></i>
                  </span>
                  <span className="text">{item.text}</span>
                  <span className="circle"></span>
                </Link>
              </li>
            ))}
            <div
              className="indicator"
              style={{ transform: `translateX(calc(70px * ${activeIndex}))` }}
            ></div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default OwnerStatistics;
