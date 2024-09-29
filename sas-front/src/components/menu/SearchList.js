import { Link, useNavigate } from "react-router-dom";
import "../menu/menuview.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { RecoilState, useRecoilState } from "recoil";
import { loginUserIdState } from "../utils/RecoilData";

const SearchList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginId, setLoginId] = useRecoilState(loginUserIdState);
  const [storeList, setStoreList] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/store/storeList`)
      .then((res) => {
        console.log(res);
        setStoreList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginId]);
  const navigate = useNavigate();
  return (
    <div className="searchList">
      <h1 style={{ marginTop: "50px" }}>검색결과</h1>
      <section className="section-search">
        {storeList.map((store, index) => {
          return (
            <div
              className="searchContent-wrap"
              onClick={() => {
                navigate(`/usermain/menuview/${store.storeNo}/menuview`);
              }}
            >
              <div className="searchView">
                <img
                  src="/image/s&s로고.png"
                  alt="가게 로고"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
              <div className="searchview-info">
                <p>{store.storeName}</p>
                <div className="searchPlace">
                  <span className="material-icons">place</span>
                  <p>{store.storeAddr}</p>
                </div>
                <p>{store.storeIntroduce}</p>
                <div className="searchTime">
                  <span className="material-icons">schedule</span>
                  <p>{store.storeTime}</p>
                </div>
                <button>예약하기</button> {/* 예약 버튼 추가 */}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default SearchList;
