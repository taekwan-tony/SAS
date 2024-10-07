import "./storeView.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  loginStoreIdState,
  loginStoreNoState,
  storeTypeState,
} from "../utils/RecoilData";
import { Link, Route, Routes } from "react-router-dom";
import StoreViewFrm from "./StoreViewFrm";
import StoreView from "./StoreView";
import StoreUpdate from "./StoreUpdate";
const StoreViewMain = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginSoEMail, setLoginSoEmail] = useRecoilState(loginStoreIdState);
  const [storeType, setStoreType] = useRecoilState(storeTypeState);
  const [loginstoreNo, setLoginStoreNo] = useRecoilState(loginStoreNoState); // 점주 매장 번호
  const [storeNumber, setStoreNumber] = useState(null); // 상태로 관리
  const [check, setCheck] = useState(false);

  const [store, setStore] = useState({
    storeNo: "",
    storeName: "",
    storePhone: "",
    storeAddr: "",
    storeTime: "",
    storeClass: "",
    storeReStart: "",
    storeReEnd: "",
    breakTimeStart: "",
    breakTimeEnd: "",
    deposit: "",
    storeIntroduce: "",
    mapX: "",
    mapY: "",
  });

  const [storeSeatCapacity, setStoreSeatCapacity] = useState(""); // 좌석 수용 인원 상태
  const [storeSeatAmount, setStoreSeatAmount] = useState(""); // 총 좌석 수 상태
  const [seat, setSeat] = useState({
    seatCapacity: "",
    seatAmount: "",
  });

  // API로부터 데이터 가져오기 (예시)
  useEffect(() => {
    if (store.seatList && store.seatList.length > 0) {
      // store.seatList가 존재하고 배열이 비어 있지 않으면 첫 번째 좌석의 수용 인원 설정
      setStoreSeatCapacity(store.seatList[0].seatCapacity);
      setStoreSeatAmount(store.seatList[0].seatAmount);
      console.log("총 좌석 수 : ", storeSeatAmount);
      console.log("수용 인원 : ", storeSeatCapacity);
    }
  }, [store]);

  // storeSeatCapacity와 storeSeatAmount가 변경되었을 때 seat 상태를 업데이트
  useEffect(() => {
    if (storeSeatCapacity && storeSeatAmount) {
      setSeat({
        seatCapacity: storeSeatCapacity,
        seatAmount: storeSeatAmount,
      });
    }
  }, [storeSeatCapacity, storeSeatAmount]);

  return (
    <>
      <div className="storeView-main">
        <div className="dashboard-body">
          <header className="dashboard-head">
            <h1>MY STORE</h1>
            <Link to="/storecheck/storeNoticeList">
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
            <img src="/image/238.jpg" alt="back" />
          </div>
          <StoreView
            store={store}
            setStore={setStore}
            loginstoreNo={loginstoreNo}
            seat={seat}
          />
          {/* <StoreUpdate
            store={store}
            setStore={setStore}
            loginstoreNo={loginstoreNo}
          /> */}
        </div>
      </div>
    </>
  );
};

export default StoreViewMain;
