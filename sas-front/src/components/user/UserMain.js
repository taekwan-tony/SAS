import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import { Navigation, Pagination, Autoplay, Mousewheel } from "swiper";
import "./UserMain.css";

const UserMain = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const swiperSection = document.querySelector(".swiper");
      if (!swiperSection) return;
      const swiperEnd = swiperSection.offsetTop + swiperSection.offsetHeight;
      if (window.scrollY > swiperEnd) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const tabs = document.querySelectorAll(".tab");
    const sections = document.querySelectorAll(".best-list");

    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        tabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        sections.forEach((section) => (section.style.display = "none"));

        const target = this.getAttribute("data-target");
        document.getElementById(target).style.display = "block";
      });
    });
  }, []);

  useEffect(() => {
    const submenuToggles = document.querySelectorAll(".toggle-submenu");

    submenuToggles.forEach(function (toggle) {
      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        const parentLi = this.parentElement;
        parentLi.classList.toggle("open");
      });
    });
  }, []);

  const expand = () => {
    document.getElementById("search-btn").classList.toggle("close");
    document.getElementById("search-input").classList.toggle("square");
  };

  return (
    <div>
      <div className={`page-header ${isScrolled ? "header-change-color" : ""}`}>
        <h1 className={`logo-text ${isScrolled ? "logo-change-color" : ""}`}>
          Spoon & Smiles
        </h1>
        <form id="content">
          <input
            type="text"
            name="input"
            className={`input ${isScrolled ? "search-change-color" : ""}`}
            id="search-input"
          />
          <button
            type="reset"
            className={`search ${isScrolled ? "search-change-color" : ""}`}
            id="search-btn"
            onClick={expand}
          ></button>
        </form>
        <div className="box">
          <div className="bellWrapper">
            <i className="fas fa-bell my-bell"></i>
          </div>
          <div className="circle first"></div>
          <div className="circle second"></div>
          <div className="circle third"></div>
        </div>
      </div>

      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <i className="fa fa-bars" id="btn"></i>
        <i className="fa fa-times" id="cancle"></i>
      </label>

      <div className="sidebar">
        <header>
          <img src="/img/IMG_3238.jpg" alt="User" />
          <p>user-id</p>
        </header>
        <ul>
          <li className="has-submenu">
            <a href="#" className="toggle-submenu">
              <i className="fa-solid fa-image-portrait"></i> 마이페이지
            </a>
            <ul className="submenu">
              <li>
                <a href="#">
                  <i className="fa-solid fa-user-pen"></i> 내 정보 수정
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-comment"></i> 나의 리뷰
                </a>
              </li>
            </ul>
          </li>
          {/* 나머지 메뉴 아이템 */}
        </ul>

        <div className="social-links">
          <a href="#" className="twitter">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#" className="facebook">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#" className="instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="google-plus">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>

        <div className="logout-button">
          <a href="#">
            <i className="fa fa-sign-out"></i> Logout
          </a>
        </div>
      </div>

      <Swiper
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        mousewheel
        centeredSlides
      >
        <SwiperSlide>
          <img src="/img/bg-mobile-dark.jpg" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/bg-mobile-dark.jpg" alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/bg-mobile-dark.jpg" alt="Slide 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/bg-mobile-light.jpg" alt="Slide 4" />
        </SwiperSlide>
      </Swiper>

      {/* 나머지 섹션들 */}
    </div>
  );
};

export default UserMain;
