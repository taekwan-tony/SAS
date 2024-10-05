import "./storeView.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  loginStoreIdState,
  loginStoreNoState,
  storeTypeState,
} from "../utils/RecoilData";
import { Link, Route, Routes } from "react-router-dom";
import StoreViewFrm from "./StoreViewFrm";
const StoreViewMain = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginSoEMail, setLoginSoEmail] = useRecoilState(loginStoreIdState);
  const [storeType, setStoreType] = useRecoilState(storeTypeState);
  const [loginstoreNo, setLoginStoreNo] = useRecoilState(loginStoreNoState); // 점주 매장 번호
  const [storeNumber, setStoreNumber] = useState(null); // 상태로 관리

  const [store, setStore] = useState({
    storeNo: loginstoreNo,
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
        </div>
        <Routes>
          <Route path="storeViewFrm" element={<StoreViewFrm />} />
        </Routes>
      </div>
    </>
  );
};

export default StoreViewMain;
