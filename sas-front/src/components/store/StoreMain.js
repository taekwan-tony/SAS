import React from "react";

const Seller = () => {
  return (
    <main className="site-wrapper">
      <div className="pt-table desktop-768">
        <div
          className="pt-tablecell page-home relative"
          style={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2020/06/30/15/03/table-5356682_1280.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="overlay"></div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
                <div className="page-title home text-center"></div>

                <div className="hexagon-menu clear">
                  {menuItems.map((item, index) => (
                    <HexagonItem
                      key={index}
                      icon={item.icon}
                      title={item.title}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const HexagonItem = ({ icon, title }) => (
  <div className="hexagon-item">
    <div className="hex-item">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className="hex-item">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <a className="hex-content">
      <span className="hex-content-inner">
        <span className="icon">
          <i className={icon}></i>
        </span>
        <span className="title">{title}</span>
      </span>
      <svg
        viewBox="0 0 173.20508075688772 200"
        height="200"
        width="174"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
          fill="#1e2530"
        ></path>
      </svg>
    </a>
  </div>
);

const menuItems = [
  { icon: "fas fa-store", title: "매장페이지" },
  { icon: "fas fa-id-card", title: "매장등록" },
  { icon: "fas fa-utensils", title: "메뉴등록" },
  { icon: "fas fa-money-check-alt", title: "제휴결제" },
  { icon: "far fa-comment-dots", title: "리뷰관리" },
  { icon: "fas fa-chart-line", title: "통계관리" },
  { icon: "far fa-calendar-alt", title: "예약관리" },
];

export default Seller;
