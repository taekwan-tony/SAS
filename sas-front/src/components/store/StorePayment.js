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

  //결제 내역
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

  //지난 달 예약
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
  const changeAmount = props.changeAmount;

  //결제 요청
  const [amount, setAmount] = useState(0);

  const pay = (pg_method, amount, nickname, redirect_url) => {
    const { IMP } = window;
    IMP.init("imp45344155"); //가맹점 번호
    IMP.request_pay(
      {
        pg: `${pg_method}`, //결제 방식
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`, //현재 시간
        name: "결제 품목",
        amount: `${amount}`, //금액
        buyer_email: "이메일",
        buyer_name: `${nickname}`, //닉네임
        buyer_tel: "010-0000-0000",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
        m_redirect_url: `${redirect_url}`, //결제 후 리다이렉트 주소
      },
      function (rsp) {
        //callback
        if (rsp.success) {
          //결제 성공
          console.log("결제 성공 : ", rsp);
        } else {
          //결제 실패
          console.log("결제 실패");
        }
      }
    );
  };

  return (
    <tr className="storePayment-tr">
      <td className="storePayment-td" style={{ width: "10%" }}>
        {payment.storePayNo}
      </td>
      <td
        type="number"
        className="storePayment-td amount"
        style={{ width: "20%" }}
      >
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
        <button
          type="button"
          onClick={() =>
            pay(
              "kakaopay",
              amount,
              "nickname",
              "http://localhost:3000/redirect"
            )
          }
        >
          결제
        </button>
      </td>
    </tr>
  );
};

export default StorePayment;
