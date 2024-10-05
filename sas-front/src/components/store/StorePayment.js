import { Link } from "react-router-dom";
import "./storePayment.css";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginStoreNoState } from "../utils/RecoilData";
import axios from "axios";
import { FaPersonHalfDress } from "react-icons/fa6";
import { RiReservedFill } from "react-icons/ri";

const StorePayment = () => {
  const [lastMonthReserve, setLastMonthReserve] = useState(0); // 지난 달 예약
  const [lastMonthReservedPeople, setLastMonthReservedPeople] = useState(0); //지난 달 방문자
  const [storeNo, setStoreNo] = useRecoilState(loginStoreNoState); // 점주 매장 번호
  const backServer = process.env.REACT_APP_BACK_SERVER;
  //결제 내역
  const [storePayment, setStorePayment] = useState([]);
  const [storePaymentList, setStorePaymentList] = useState([]);
  const [storePayStatus, setStorePayStatus] = useState(0);

  useEffect(() => {
    axios
      .get(`${backServer}/store/storePayList/${storeNo}`)
      .then((res) => {
        setStorePaymentList(res.data);
        console.log("결제내역 불러오기 성공 : ", res);
      })
      .catch((err) => {
        //console.log("결제내역 불러오기 실패 : ", err);
      });
  }, [storeNo]);

  console.log("이용료 결제 (매장 번호) : ", storeNo);

  useEffect(() => {
    //지난 달 예약 데이터
    const lastMonthData = async () => {
      try {
        const lastMonthReserveResponse = await axios.get(
          `${backServer}/reservation/lastMonthTotalReservation/storeNo/${storeNo}`
        );
        setLastMonthReserve(lastMonthReserveResponse.data);

        const lastMonthReservedPeopleResponse = await axios.get(
          `${backServer}/reservation/lastMonthTotalReservedPeople/storeNo/${storeNo}`
        );
        setLastMonthReservedPeople(lastMonthReservedPeopleResponse.data);
      } catch (err) {
        //console.error("지난달 예약 데이터 가져오기 실패:", err);
      }
    };
    lastMonthData();
  }, [storeNo, backServer]);

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
            <div className="info-card-icon-bg">
              <RiReservedFill />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>지난 달 방문한 총 고객 수</h3>
              <h2>{lastMonthReservedPeople}명 </h2>{" "}
            </div>
            <div className="info-card-icon-bg">
              <FaPersonHalfDress />
            </div>
          </div>
        </div>

        {/*섹션*/}

        <div className="storePayment-info-card">
          <div className="storePayment-info-text">
            <h3>이용료 내역</h3>
          </div>
          <div className="storePayment-content">
            <table className="storePayment-table">
              <thead>
                <tr className="storePayment-tr">
                  <th className="storePayment-th" style={{ width: "10%" }}>
                    번호
                  </th>
                  <th className="storePayment-th" style={{ width: "20%" }}>
                    총 결제 금액
                  </th>
                  <th className="storePayment-th" style={{ width: "20%" }}>
                    결제 요청일
                  </th>
                  <th className="storePayment-th" style={{ width: "20%" }}>
                    결제 완료일
                  </th>
                  <th className="storePayment-th" style={{ width: "20%" }}>
                    구분
                  </th>
                  <th className="storePayment-th" style={{ width: "10%" }}>
                    결제하기
                  </th>
                </tr>
              </thead>
              <tbody>
                {storePaymentList.map((payment, i) => {
                  return <PaymentItem key={"payment-" + i} payment={payment} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const PaymentItem = (props) => {
  const payment = props.payment;
  const storePayStatus = props.storePayStatus;
  return (
    <tr className="storePayment-tr">
      <td className="storePayment-td" style={{ width: "10%" }}>
        {payment.storePayNo}
      </td>
      <td className="storePayment-td" style={{ width: "20%" }}>
        {payment.storeTotalPrice}
      </td>
      <td className="storePayment-td" style={{ width: "20%" }}>
        {payment.storePayRequestDate.substring(0, 10)}
      </td>
      <td className="storePayment-td" style={{ width: "20%" }}>
        {payment.storePayDate}
      </td>
      <td className="storePayment-td" style={{ width: "20%" }}>
        {payment.storePayStatus == 1 ? "결제 대기" : "결제 완료"}
      </td>
      <td className="storePayment-td" style={{ width: "10%" }}>
        <button type="button">결제</button>
      </td>
    </tr>
  );
};

export default StorePayment;
