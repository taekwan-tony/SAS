import { Link } from "react-router-dom";
import "./storePayment.css";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginStoreNoState } from "../utils/RecoilData";
import axios from "axios";

const StorePayment = () => {
  const [lastMonthReserve, setLastMonthReserve] = useState(0); // 지난 달 예약
  const storeNo = useRecoilValue(loginStoreNoState); // 점주 매장 번호
  const backServer = process.env.REACT_APP_BACK_SERVER;

  useEffect(() => {
    //지난 달 예약 데이터
    const LastMonthData = async () => {
      try {
        const lastMonthReserveResponse = await axios.get(
          `${backServer}/reservation/lastMonthTotalReservation/storeNo/${storeNo}`
        );
        setLastMonthReserve(lastMonthReserveResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
  }, [backServer]);

  return (
    <>
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>이용료 결제</h1>
          <Link to="/usermain">
            <button className="button-bell">
              <div className="user-box-bell">
                <div className="user-page-box">
                  <div className="bellWrapper">
                    <i className="fas fa-bell my-bell"></i>
                  </div>

                  <div className="circle first"></div>
                  <div className="circle second"></div>
                  <div className="circle third"></div>
                </div>
              </div>
            </button>
          </Link>
        </header>
      </div>
      <div className="dashboard">
        <div className="owner-background">
          <img src="/image/200.jpg" alt="back" />
        </div>
        {/*섹션*/}
        <div className="top-section">
          <div className="info-card">
            <div className="info-text">
              <h3>지난 달 총 예약 수</h3>
              <h2>{lastMonthReserve}건 </h2>
              {""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StorePayment;
