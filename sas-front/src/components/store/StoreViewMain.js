import "./storeView.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isStoreLoginState,
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
  const [loginstoreNo, setLoginStoreNo] = useRecoilState(loginStoreNoState); // 점주 매장 번호
  const [check, setCheck] = useState(false);
  const isLoginStore = useRecoilValue(isStoreLoginState);

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

  const [seat, setSeat] = useState({
    seatCapacity: "",
    seatAmount: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing); // 수정 화면으로 전환
  };

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
          <div>
            {/* store_name이 있으면 storeView 컴포넌트 출력, 없으면 storeFrm 컴포넌트 출력 */}
            {/* `isEditing` 상태에 따라 다른 컴포넌트를 렌더링 */}
            {isEditing ? (
              <StoreUpdate
                store={store}
                setStore={setStore}
                loginstoreNo={loginstoreNo}
                seat={seat}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            ) : (
              <StoreView
                store={store}
                setStore={setStore}
                loginstoreNo={loginstoreNo}
                seat={seat}
                handleEditClick={handleEditClick}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreViewMain;
