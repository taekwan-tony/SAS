import "./storeView.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginStoreNameState, loginStoreNoState } from "../utils/RecoilData";
import { Link } from "react-router-dom";
import StoreViewFrm from "./StoreViewFrm";
import StoreView from "./StoreView";

const StoreViewMain = (props) => {
  const setActiveIndex = props.setActiveIndex;
  const [loginstoreNo, setLoginStoreNo] = useRecoilState(loginStoreNoState); // 로그인된 매장 번호
  const [storeName, setStoreName] = useRecoilState(loginStoreNameState); // 로그인된 매장 이름

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
          <div className="storeUpdate-main">
            {/* storeName이 비어 있으면 StoreViewFrm을, 그렇지 않으면 StoreView를 렌더링 */}
            {storeName ? (
              <StoreView
                store={store}
                setStore={setStore}
                loginstoreNo={loginstoreNo}
                seat={seat}
                handleEditClick={handleEditClick}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                setActiveIndex={setActiveIndex}
              />
            ) : (
              <StoreViewFrm
                store={store}
                setStore={setStore}
                loginstoreNo={loginstoreNo}
                seat={seat}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                setActiveIndex={setActiveIndex}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreViewMain;
