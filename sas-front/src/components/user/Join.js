import "./join.css";
//닉네임 어케할지 고민중
//1. 여기에 넣는다 / 2. 임의로 지정하고 바꾸게 한다
const Join = () => {
  return (
    <div className="join-main">
      <div className="join-wrap">
        <div className="title">
          <h1>회원가입</h1>
        </div>
        <div className="join-content">
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userId">아이디</label>
            </div>
            <input type="text" name="userId" id="userId" />
            <p className="msg id-msg"></p>
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userPw">비밀번호</label>
            </div>
            <input type="text" name="userPw" id="userPw" />
            <p className="msg pw-msg"></p>
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userPwRe">비밀번호 확인</label>
            </div>
            <input type="text" name="userPwRe" id="userPwRe" />
            <p className="msg pwRe-msg"></p>
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userName">이름</label>
            </div>
            <input type="text" name="userName" id="userName" />
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userPhone">휴대폰 번호</label>
            </div>
            <input type="text" name="userPhone" id="userPhone" />
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userEmail">이메일</label>
            </div>
            <input type="text" name="userEmail" id="userEmail" />
            <button className="btn-sub round">인증번호 전송</button>
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="number">인증번호</label>
            </div>
            <input type="text" name="number" id="number" />
            <p className="msg email-msg"></p>
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userBirth">생년월일</label>
            </div>
            <input type="text" name="userBirth" id="userBirth" />
          </div>
          <div className="input-item">
            <div className="input-title">
              <label htmlFor="userGender">성별</label>
            </div>
            <div className="input-content">
              <div className="radio-box">
                <input type="radio" name="userGender" id="female" value="여" />
                <label htmlFor="female">여자</label>
              </div>
              <div className="radio-box">
                <input type="radio" name="userGender" id="male" value="남" />
                <label htmlFor="male">남자</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="agree-wrap">
        <h2>
          <input type="checkbox" name="agreeAll" id="agreeAll" />
          <label htmlFor="agreeAll">모두 동의합니다</label>
        </h2>
        <div className="agree-content">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">이용약관 동의</label>
        </div>
        <div className="agree-content">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">개인정보 취급방침 동의</label>
        </div>
      </div>
      <div className="btn-zone">
        <button className="btn-main round">회원가입</button>
      </div>
    </div>
  );
};

export default Join;
