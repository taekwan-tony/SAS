import { Link } from "react-router-dom";
import "./storePayment.css";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  loginStoreIdState,
  loginStoreNoState,
  soNameState,
  soPhoneState,
  storeAddrState,
} from "../utils/RecoilData";
import axios from "axios";
import { FaPersonHalfDress } from "react-icons/fa6";
import { RiReservedFill } from "react-icons/ri";
import Swal from "sweetalert2";

const StorePayment = () => {
  const [lastMonthReserve, setLastMonthReserve] = useState(0); // 지난 달 예약
  const [lastMonthReservedPeople, setLastMonthReservedPeople] = useState(0); //지난 달 방문자
  const [storeNo, setStoreNo] = useRecoilState(loginStoreNoState); // 점주 매장 번호
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [rendering, setRendering] = useState(false);
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
  }, [storeNo, rendering]);

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
                  return (
                    <PaymentItem
                      key={"payment-" + i}
                      payment={payment}
                      i={i}
                      setRendering={setRendering}
                      rendering={rendering}
                    />
                  );
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
  const rendering = props.rendering;
  const setRendering = props.setRendering;
  const i = props.i;
  const [soEmail, setSoEmail] = useRecoilState(loginStoreIdState); //점주 이메일
  const [storeAddr, setStoreAddr] = useRecoilState(storeAddrState); //매장 주소
  const [soPhone, setSoPhone] = useRecoilState(soPhoneState); //점주 전화번호
  const [soName, setSoName] = useRecoilState(soNameState); //점주 이름
  const [storeNo, setStoreNo] = useRecoilState(loginStoreNoState); // 점주 매장 번호
  const backServer = process.env.REACT_APP_BACK_SERVER;

  console.log(
    "이메일, 주소, 전화번호, 이름, 매장 번호",
    soEmail,
    storeAddr,
    soPhone,
    soName,
    storeNo
  );

  useEffect(() => {
    const IMP = window.IMP;
    if (IMP) {
      IMP.init("imp45344155");
    }
  }, []);

  //결제
  const servicePay = () => {
    const IMP = window.IMP;
    if (!IMP) {
      alert("아임포트가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    IMP.init("imp45344155");

    IMP.request_pay(
      {
        pg: "html5_inicis.INIpayTest",
        pay_method: "card",
        //merchant_uid: "결제 번호",
        name: "서비스 이용료 결제",
        amount: `${payment.storeTotalPrice}`,
        buyer_email: `${soEmail}`,
        buyer_name: `${soName}`,
        buyer_tel: `${soPhone}`,
        buyer_addr: `${storeAddr}`,
        buyer_postcode: "01181",
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          Swal.fire({
            title: "결제가 완료되었습니다.",
            icon: "success",
            confirmButtonColor: "#518142",
          }).then(
            axios
              .patch(
                `${backServer}/store/storePaySuccess/${payment.storePayNo}`
              )
              .then((res) => {
                setRendering(!rendering);
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              })
          );
          console.log(rsp);

          // 결제 성공 로직
        } else {
          alert(`결제에 실패했습니다. 에러 메시지: ${rsp.error_msg}`);
          // 결제 실패 로직
        }
      }
    );
  };

  return (
    <tr className="storePayment-tr">
      <td className="storePayment-td" style={{ width: "10%" }}>
        {i + 1}
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
        {payment.storePayDate ? payment.storePayDate.substring(0, 10) : " "}
      </td>
      <td className="storePayment-td" style={{ width: "20%" }}>
        {payment.storePayStatus == 1 ? "결제 대기" : "결제 완료"}
      </td>
      <td className="storePayment-td" style={{ width: "10%" }}>
        <button
          type="button"
          onClick={servicePay}
          disabled={payment.storePayStatus != 1} // 결제 완료 시 버튼 비활성화
        >
          결제
        </button>
      </td>
    </tr>
  );
};

export default StorePayment;
