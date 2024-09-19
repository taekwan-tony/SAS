import { useRef } from "react";

const FindId = () => {
  const nameboxRef = useRef(null);
  const emailboxRef = useRef(null);
  const selectNameRef = () => {
    nameboxRef.current.classList.add("active");
    emailboxRef.current.classList.remove("active");
  };
  const selectEmailRef = () => {
    nameboxRef.current.classList.remove("active");
    emailboxRef.current.classList.add("active");
  };
  return (
    <>
      <div className="find-main-zone">
        <div className="findByName round">
          <h3 onClick={selectNameRef}>
            회원정보로 등록된 이름 전화번호로 찾기
          </h3>
          <div className="find-content active" ref={nameboxRef}>
            <div className="input-item">
              <span className="input-title">
                <label htmlFor="userId">이름</label>
              </span>
              <input
                type="text"
                id="userId"
                name="userId"
                placeholder="회원이름"
              />
            </div>
            <div className="input-item">
              <span className="input-title">
                <label htmlFor="userPhone">전화번호</label>
              </span>
              <input
                type="text"
                id="userPhone"
                name="userPhone"
                placeholder="전화번호"
              />
            </div>
            <div className="find-btn">
              <button className="btn-main round">아이디 찾기</button>
            </div>
          </div>
        </div>
        <div className="findByEmail round">
          <h3 onClick={selectEmailRef}>회원정보로 등록된 이메일로 본인인증</h3>
          <div className="find-content" ref={emailboxRef}>
            <div className="input-item">
              <span className="input-title">
                <label htmlFor="userEmail">이메일</label>
              </span>
              <input
                type="text"
                id="userEmail"
                name="userEmail"
                placeholder="회원 이메일"
              />
              <button className="btn-main round">인증번호 받기</button>
            </div>
            <div className="input-item">
              <span className="input-title">
                <label htmlFor="number">인증번호</label>
              </span>
              <input
                type="text"
                id="number"
                name="number"
                placeholder="인증번호 입력"
              />
              <button className="btn-sub round">인증번호 받기</button>
            </div>
            <div className="find-btn">
              <button className="btn-main round">아이디 찾기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FindId;
