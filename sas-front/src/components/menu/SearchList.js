import { Link } from "react-router-dom";
import "../menu/menuview.css";
const SearchList = () => {
  return (
    <div className="searchList">
      <h1 style={{ marginTop: "50px" }}>검색결과</h1>
      <section className="section-search">
        <div className="searchView">
          <img
            src="/image/s&s로고.png"
            alt="가게 로고"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="searchview-info">
          <p>벨라스가든 석촌호수점</p>
          <div className="searchPlace">
            <span className="material-icons">place</span>
            <p>8호선 9호선 석촌역에서 506m</p>
          </div>
          <p>도심속에 정원같은 공간에서 즐기는 브런치&파스타&와인</p>
          <div className="searchTime">
            <span className="material-icons">schedule</span>
            <p>10:00 ~ 23:00</p>
          </div>
          <button>예약하기</button> {/* 예약 버튼 추가 */}
        </div>
      </section>
    </div>
  );
};

export default SearchList;
