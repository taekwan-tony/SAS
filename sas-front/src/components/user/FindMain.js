import { useNavigate } from "react-router-dom";

const FindMain = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="find-main-zone">
        <button
          className="find-id btn-sub round"
          onClick={() => {
            navigate("/login/findId");
          }}
        >
          아이디 찾기
        </button>
        <button
          className="find-pw btn-sub round"
          onClick={() => {
            navigate("/login/findPw");
          }}
        >
          비밀번호 재설정
        </button>
      </div>
    </>
  );
};
export default FindMain;
