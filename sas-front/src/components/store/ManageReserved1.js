const ManageReserved1 = () => {
  return (
    <>
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>예약관리</h1>
        </header>
      </div>
      <div className="dashboard">
        <div className="owner-background">
          <img src="/image/239.jpg" alt="back" />
        </div>
        {/* 상단 섹션 */}
        <div className="top-section">
          <div className="info-card">
            <h3>입금 대기</h3>
            <h2>
              $53,000 <span className="positive">+55%</span>
            </h2>
          </div>
          <div className="info-card">
            <h3>Today's Users</h3>
            <h2>
              2,300 <span className="positive">+3%</span>
            </h2>
          </div>
          <div className="info-card">
            <h3>New Clients</h3>
            <h2>
              +3,462 <span className="negative">-2%</span>
            </h2>
          </div>
          <div className="info-card">
            <h3>Total Sales</h3>
            <h2>
              $103,430 <span className="positive">+5%</span>
            </h2>
          </div>
        </div>

        {/* 중단 섹션 */}
        <div className="middle-section">
          <div className="main-info">
            <h2>Welcome back</h2>
            <h1>Store Owner</h1>
            <p>Glad to see you again! Ask me anything.</p>
            <button className="record-btn">Tap to record →</button>
          </div>
        </div>

        {/* 하단테이블 */}
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>순번</th>
                <th>이름</th>
                <th>날짜</th>
                <th>시간</th>
                <th>입금현황</th>
                <th>전화번호</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1</td>
                <td>임민규</td>
                <td>2024-09-18</td>
                <td>18:30</td>
                <td>
                  <span className="badge bg-danger">입금전</span>
                </td>
                <td>010-1111-1111</td>
              </tr>
              <tr>
                <td>#2</td>
                <td>김새봄</td>
                <td>2024-09-19</td>
                <td>15:30</td>
                <td>
                  <span className="badge bg-primary">입금중</span>
                </td>
                <td>010-1111-1111</td>
              </tr>
              <tr>
                <td>#3</td>
                <td>윤태구</td>
                <td>2024-09-20</td>
                <td>17:30</td>
                <td>
                  <span className="badge bg-success">입금완료</span>
                </td>
                <td>010-1111-1111</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageReserved1;
