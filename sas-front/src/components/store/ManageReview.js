import React, { useState } from "react";
import "./managereserved.css";
import { Link } from "react-router-dom";

function ManageReserved() {
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
          <h1>리뷰관리</h1>
        </header>
      </div>
      <div className="dashboard">
        <div className="owner-background">
          <img src="/image/238.jpg" alt="back" />
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

export default ManageReserved;
