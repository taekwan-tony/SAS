import { Link, useParams } from "react-router-dom";

const FindResult = () => {
  const params = useParams();
  const userId = params.userId;
  return (
    <>
      <div className="find-main-zone">
        <div className="find-result round">
          <h3>
            회원님의 아이디는 <span>{userId}</span> 입니다.
          </h3>
          <div className="button">
            <Link to="/usermain/login" className="btn-main round">
              로그인 화면으로
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default FindResult;
