import "./storeView.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginStoreNameState, loginStoreNoState } from "../utils/RecoilData";
import { Link } from "react-router-dom";
import StoreViewFrm from "./StoreViewFrm";
import StoreView from "./StoreView";
import StoreUpdate from "./StoreUpdate"; // StoreUpdate 컴포넌트 임포트

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

  const [isEditing, setIsEditing] = useState(false); // 수정 상태 확인

  const handleEditClick = () => {
    setIsEditing(true); // 수정 모드로 전환
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
            {/* isEditing 상태에 따라 StoreView 또는 StoreUpdate 렌더링 */}
            {isEditing ? (
              <StoreUpdate
                store={store}
                setStore={setStore}
                loginstoreNo={loginstoreNo}
                seat={seat}
                setActiveIndex={setActiveIndex}
                setIsEditing={setIsEditing} // 수정 모드 취소 가능하게
              />
            ) : storeName ? (
              <StoreView
                store={store}
                setStore={setStore}
                loginstoreNo={loginstoreNo}
                seat={seat}
                handleEditClick={handleEditClick} // 수정 버튼 클릭 핸들러
                setActiveIndex={setActiveIndex}
              />
            ) : (
              <StoreViewFrm
                store={store}
                setStore={setStore}
                loginstoreNo={loginstoreNo}
                seat={seat}
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
