const FindMain = () => {
  return (
    <>
      <div className="find-main-zone">
        <button className="find-id btn-sub round">아이디 찾기</button>
        <button className="find-pw btn-sub round">비밀번호 찾기</button>
      </div>
      <div className="find-id">
        <div className="findByName">
          <h3>회원정보로 등록된 이름 전화번호로 찾기</h3>
        </div>
        <div className="findByEmail">
          <h3>회원정보로 등록된 이메일로 본인인증</h3>
        </div>
      </div>
    </>
  );
};
export default FindMain;
