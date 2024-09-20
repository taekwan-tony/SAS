import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import OwnerStatistics1 from "../ownerstatistics/OwnerStatistics";
import ManageReserved1 from "./ManageReserved1";

const StoreCheckMain = () => {
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
      to: "/storecheck/managereview1",
    },
    {
      text: "통계관리",
      icon: "fas fa-chart-line",
      to: "/storecheck/ownerstatistics1",
    },
    {
      text: "예약관리",
      icon: "far fa-calendar-alt",
      to: "/storecheck/managereserved1",
    },
  ];
  return (
    <>
      <Routes>
        <Route path="managereserved1" element={<ManageReserved1 />} />
        <Route path="ownerstatistics1" element={<OwnerStatistics1 />} />
      </Routes>
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
};

export default StoreCheckMain;
