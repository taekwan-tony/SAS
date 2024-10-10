import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Link } from "react-router-dom";
import "./Main.css";
import StoreLogin from "../store/StoreLogin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Main = () => {
  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".main-content",
          start: "top top",
          end: "90% top",
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      })
      .to(".title1", {
        scale: 0.2,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(".title1", {
        x: "-180",
        y: "-190",
        duration: 1,
        ease: "power2.inOut",
      });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".title-container",
          start: "top top",
          end: "800% top",
          scrub: true,
          pin: false,
          pinSpacing: false,
        },
      })
      .fromTo(
        ".title2",
        { x: "30vw", y: 0 },
        { x: "-100vw", opacity: 1, duration: 15, ease: "power1.inOut" },
        "+=13"
      )
      .to(
        ".title2",
        {
          opacity: 1,
          duration: 5,
          ease: "power1.inOut",
        },
        "-=14"
      )
      .to(
        ".title2",
        {
          opacity: 0,
          duration: 5,
          ease: "power1.inOut",
        },
        "-=10"
      )
      .fromTo(
        ".title4",
        { x: "30vw", y: 200 },
        { x: "-100vw", opacity: 1, duration: 15, ease: "power1.inOut" },
        "-=15"
      )
      .to(
        ".title4",
        {
          opacity: 1,
          duration: 5,
          ease: "power1.inOut",
        },
        "-=14"
      )
      .to(
        ".title4",
        {
          opacity: 0,
          duration: 5,
          ease: "power1.inOut",
        },
        "-=10"
      )
      .fromTo(
        ".title3",
        { x: "-30vw", y: 100 },
        { x: "100vw", opacity: 1, duration: 15, ease: "power1.inOut" },
        "-=15"
      )
      .to(
        ".title3",
        {
          opacity: 1,
          duration: 5,
          ease: "power1.inOut",
        },
        "-=14"
      )
      .to(
        ".title3",
        {
          opacity: 0,
          duration: 5,
          ease: "power1.inOut",
        },
        "-=10"
      )
      .to(
        ".title1",
        {
          x: "100vw",
          opacity: 0,
          duration: 6,
          ease: "power1.inOut",
        },
        "-=10"
      );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".main-content2",
          start: "top+=10% top",
          end: "bottom+=50% top",
          scrub: 2,
          pin: true,
          pinSpacing: true,
        },
      })
      .fromTo(
        ".main-content2 .logo1",
        { opacity: 0 },
        { opacity: 1, duration: 5, ease: "power2.inOut" }
      )
      .to(".main-content2 .logo1", {
        opacity: 0,
        duration: 5,
        ease: "power2.inOut",
      });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".main-content3",
          start: "top+=5% top",
          end: "bottom+=70% top",
          scrub: 2,
          pin: true,
          pinSpacing: true,
        },
      })
      .fromTo(
        ".main-content3 .title5",
        { opacity: 0, scale: 1 },
        { opacity: 1, scale: 1, duration: 4, ease: "power2.inOut" }
      )
      .to(".main-content3 .title5", {
        scale: 10,
        duration: 4,
        ease: "power2.inOut",
      })
      .to(".main-content3 .title5", {
        opacity: 0,
        duration: 4,
        ease: "power2.inOut",
      });

    gsap.set(".main-content4", { opacity: 1 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".main-content4",
          start: "top+=50% center",
          end: "+=155%",
          scrub: 2,
          pin: true,
          pinSpacing: false,
          onEnter: () => {
            gsap.to(window, {
              scrollTo: { y: "max", autoKill: false },
              duration: 0.1,
            });
          },
        },
      })
      .fromTo(
        ".main-content4 .title6",
        { opacity: 0 },
        { opacity: 1, duration: 15, ease: "power1.inOut" }
      )
      .fromTo(
        ".main-content4 .title7",
        { opacity: 0 },
        { opacity: 1, duration: 15, ease: "power1.inOut" },
        "+=15"
      )
      .fromTo(
        ".main-content4 .button1",
        { opacity: 0 },
        { opacity: 1, duration: 15, ease: "power1.inOut" },
        "+=5"
      )
      .fromTo(
        ".main-content4 .button2",
        { opacity: 0 },
        { opacity: 1, duration: 15, ease: "power1.inOut" },
        "+=5"
      );

    window.addEventListener("resize", ScrollTrigger.update);
    const videoElement = document.getElementById("background-video");
    const videos = [
      `${process.env.PUBLIC_URL}/video/Fvideo1.mp4`,
      `${process.env.PUBLIC_URL}/video/Fvideo2.mp4`,
      `${process.env.PUBLIC_URL}/video/Fvideo3.mp4`,
    ];

    let currentVideoIndex = 0;

    videoElement.addEventListener("ended", function () {
      currentVideoIndex = (currentVideoIndex + 1) % videos.length;
      videoElement.src = videos[currentVideoIndex];
      videoElement.load();
      videoElement.play();
    });
    // 하단 고정된 화살표 버튼 클릭 시 즉시 맨 아래로 이동
    const handleArrowClick = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "auto", // 즉시 이동
      });
    };

    document
      .querySelector(".arrow-down a")
      .addEventListener("click", handleArrowClick);

    // return () => {
    //   document
    //     .querySelector(".arrow-down a")
    //     .removeEventListener("click", handleArrowClick);
    // };
  }, []);

  {
    /* 판매자 / 관리자 로그인 Modal */
  }
  // 모달의 열림/닫힘 상태를 관리하는 useState
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달 외부 클릭 시 모달 닫기
  const handleOutsideClick = (event) => {
    if (event.target.className === "storeModal") {
      closeModal();
    }
  };

  return (
    <div>
      <div className="video-background">
        <video autoPlay muted playsInline id="background-video">
          <source
            src={`${process.env.PUBLIC_URL}/video/Fvideo1.mp4`}
            type="video/mp4"
          />
        </video>
      </div>

      <div className="video-overlay"></div>

      {/* 하단에 고정된 버튼 */}
      <div className="arrow-down">
        <a href="#">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div className="main-content">
        <div className="title-container">
          <span className="title1">2024</span>
          <span className="title2">THE</span>
          <span className="title3">BEST</span>
          <span className="title4">RESERVATION</span>
        </div>
      </div>

      <div className="main-content2">
        <span className="logo1">Spoon & Smiles</span>
      </div>

      <div className="main-content3">
        <span className="title5">당신의 시간을 예약하다</span>
      </div>

      <div className="main-content4">
        <div className="content">
          <span className="title6">
            "Your Booking Experience, Revolutionized"
            <br />
            저희 예약 사이트가 추구하는 목표입니다.
            <br />
          </span>
          <span className="title7">
            마치 최초의 예약 시스템 혁신이 사람들의 생활 방식을
            <br />
            바꿔놓았던 것처럼, 우리의 플랫폼은 새로운 예약 경험을 <br />
            제공하며 더 나은 내일을 만들어갑니다.
          </span>
          <div className="buttons">
            <Link to="/">
              <button onClick={openModal} className="button1">
                점주 로그인
                <span className="material-icons arrow">arrow_forward</span>
              </button>
            </Link>
            <Link to="/usermain">
              <button className="button2">
                일반인 로그인
                <span className="material-icons arrow">arrow_forward</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* StoreLogin 컴포넌트를 렌더링, isModalOpen 상태를 전달 */}
      {isModalOpen && (
        <StoreLogin isModalOpen={isModalOpen} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Main;
