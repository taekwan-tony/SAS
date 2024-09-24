import React, { useState } from "react";
import "./storeLogin.css";

const StoreLogin = () => {
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
    if (event.target.className === "modal") {
      closeModal();
    }
  };

  return (
    <>
      <div className="storeLogin-wrap">
        <div className="storeLogin-dashboard">
          <div className="owner-background">
            <img src="/image/200.jpg" alt="back" />
          </div>
          <div>
            <div className="storeLogin-btn-zone">
              <button onClick={openModal} className="storeLogin-btn">
                로그인
              </button>
            </div>
            {/* 메인 페이지 내용 */}

            {/* 모달 창 */}
            {isModalOpen && (
              <div className="modal" onClick={handleOutsideClick}>
                <div className="modal-content">
                  <span className="storeLogin-close" onClick={closeModal}>
                    &times;
                  </span>
                  <div className="storeLogin-main">
                    <input type="checkbox" id="chk" aria-hidden="true" />

                    <div className="storeLogin-signup">
                      <form>
                        <label htmlFor="chk" aria-hidden="true">
                          회원가입
                        </label>
                        <input
                          type="text"
                          name="id"
                          placeholder="아이디"
                          required
                        />
                        <input
                          type="password"
                          name="pswd"
                          placeholder="비밀번호"
                          required
                        />
                        <input
                          type="text"
                          name="name"
                          placeholder="이름"
                          required
                        />
                        <input type="text" name="email" placeholder="이메일" />
                        <button>회원가입</button>
                      </form>
                    </div>

                    <div className="storeLogin-login">
                      <form>
                        <label htmlFor="chk" aria-hidden="true">
                          로그인
                        </label>
                        <input
                          type="text"
                          name="id"
                          placeholder="ID"
                          required
                        />
                        <input
                          type="password"
                          name="pswd"
                          placeholder="비밀번호"
                          required
                        />
                        <button>로그인</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreLogin;
