import React, { useEffect } from "react";
import "./storemain.css";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  loginStoreIdState,
  loginStoreNameState,
  loginStoreNoState,
  storeNameState,
  storeTypeState,
} from "../utils/RecoilData";
import axios from "axios";

function StoreMain() {
  // 로그인 지속
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginStoreNo, setLoginStoreNo] = useRecoilState(loginStoreNoState);
  const [loginSoEMail, setLoginSoEmail] = useRecoilState(loginStoreIdState);
  const [storeType, setStoreType] = useRecoilState(storeTypeState);
  const [storeName, setStoreName] = useRecoilState(loginStoreNameState);

  useEffect(() => {
    storeRefreshLogin();
    window.setInterval(storeRefreshLogin, 60 * 60 * 1000);
  }, []);

  const storeRefreshLogin = () => {
    const storeRefreshToken = window.localStorage.getItem("storeRefreshToken");
    if (storeRefreshToken != null) {
      console.log("main 로그인 정보 : ", storeName);
      axios.defaults.headers.common["Authorization"] = storeRefreshToken;
      axios
        .post(`${backServer}/store/storeRefresh`)
        .then((res) => {
          setLoginSoEmail(res.data.soEmail);
          setStoreType(res.data.storeType);
          setLoginStoreNo(res.data.storeNo);
          setStoreName(res.data.storeName);

          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem(
            "storeRefreshToken",
            res.data.refreshToken
          );
        })
        .catch((err) => {
          setLoginSoEmail("");
          setStoreType(2);
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("storeRefreshToken");
        });
    }
  };

  return (
    <main className="site-wrapper">
      <div className="pt-table desktop-768">
        <div
          className="pt-tablecell page-home relative"
          style={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2020/06/30/15/03/table-5356682_1280.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="overlay"></div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
                <div className="page-title home text-center"></div>

                <div className="hexagon-menu clear">
                  {/* 반복적으로 사용되는 hexagon-item */}
                  <HexagonItem
                    icon="fas fa-store"
                    title="매장페이지"
                    className="color"
                    to="/storecheck/StoreDetail"
                  />
                  <HexagonItem
                    icon="fas fa-id-card"
                    title="매장관리"
                    className="color"
                    to="/storecheck/StoreViewMain"
                  />
                  <HexagonItem
                    icon="fas fa-utensils"
                    title="메뉴관리"
                    className="color"
                    to="/storecheck/StoreMenuMain"
                  />
                  <HexagonItem
                    icon="fas fa-money-check-alt"
                    title="제휴결제"
                    className="color"
                    to="/storecheck/storePayList"
                  />
                  <HexagonItem
                    icon="far fa-comment-dots"
                    title="리뷰관리"
                    className="color"
                    to="/storecheck/managereview"
                  />
                  <HexagonItem
                    icon="fas fa-chart-line"
                    title="통계관리"
                    className="color"
                    to="/storecheck/ownerstatistics"
                  />
                  <HexagonItem
                    icon="far fa-calendar-alt"
                    title="예약관리"
                    className="color"
                    to="/storecheck/managereserved"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// HexagonItem 컴포넌트를 만들어 반복되는 구조를 재사용 가능하게 함
function HexagonItem({ icon, title, to }) {
  return (
    <div className="hexagon-item">
      <div className="hex-item">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="hex-item">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Link to={to} className="hex-content">
        <span className="hex-content-inner">
          <span className="icon">
            <i className={icon}></i>
          </span>
          <span className="title">{title}</span>
        </span>
        <svg
          viewBox="0 0 173.20508075688772 200"
          height="200"
          width="174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
            fill="#1e2530"
          ></path>
        </svg>
      </Link>
    </div>
  );
}

export default StoreMain;
