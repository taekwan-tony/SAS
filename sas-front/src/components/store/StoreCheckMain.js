import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ManageReserved from "./ManageReserved";
import ManageReview from "./ManageReview";
import Ownerstatistics from "../ownerstatistics/OwnerStatistics";
import StoreRegist from "./StoreRegist";
import StorePartnership from "./StorePartnership";
import StoreMenuView from "./StoreMenuView";
import StoreViewFrm from "./StoreViewFrm";

const StoreCheckMain = () => {
  const [activeIndex, setActiveIndex] = useState(0); // 활성화된 리스트 항목을 추적하는 상태

  const handleClick = (index) => {
    // 이미 활성화된 항목이면 다시 클릭 시 변경되지 않도록 설정
    if (activeIndex !== index) {
      setActiveIndex(index); // 클릭된 항목의 인덱스를 설정
    }
  };

  const menuItems = [
    {
      text: "매장페이지",
      icon: "fa-solid fa-store",
      to: "/storecheck/StoreViewFrm",
    },
    {
      text: "매장등록",
      icon: "fas fa-id-card",
      to: "/storecheck/StorePartnership",
    },
    {
      text: "메뉴관리",
      icon: "fas fa-utensils",
      to: "/storecheck/StoreMenuView",
    },
    { text: "제휴결제", icon: "fas fa-money-check-alt", to: "/payment" },
    {
      text: "리뷰관리",
      icon: "fa-regular fa-comment-dots",
      to: "/storecheck/managereview",
    },
    {
      text: "통계관리",
      icon: "fas fa-chart-line",
      to: "/storecheck/ownerstatistics",
    },
    {
      text: "예약관리",
      icon: "far fa-calendar-alt",
      to: "/storecheck/managereserved",
    },
  ];
  return (
    <>
      <Routes>
        <Route path="storeView" element={<StoreViewFrm />} />
        <Route path="managereserved" element={<ManageReserved />} />
        <Route path="ownerstatistics" element={<Ownerstatistics />} />
        <Route path="managereview" element={<ManageReview />} />
        <Route path="StorePartnership" element={<StorePartnership />} />
        <Route path="StoreMenuView" element={<StoreMenuView />} />
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
