const mainviewhome = () => {
  return (
    <>
      <main className="main-menu">
        <h2>예약</h2>
        <section className="reservation-info">
          <span className="material-icons page-item">
            <span class="material-icons">calendar_today</span>날짜 - 인원 - 시간
          </span>
          <div className="res-time">
            <div>오후 12:00</div>
          </div>
          <Link to="#" className="find-date btn-sub round">
            예약가능날짜찾기
          </Link>
        </section>
        <div className="facilities">
          <h2>편의시설</h2>
          <div className="amenities">편의시설 이미지</div>
        </div>
      </main>
      <div className="reservation-button">
        <span className="material-icons page-item">bookmark_border</span>
        <span className="material-icons page-item">share</span>
        <button className="reservation-btn">예약하기</button>
      </div>
    </>
  );
};

export default mainviewhome;
