import { Link, useNavigate, useParams } from "react-router-dom";
import "../menu/menuview.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { RecoilState, useRecoilState } from "recoil";
import { loginUserIdState } from "../utils/RecoilData";
//분위기 , 음식종류
const SearchList = (props) => {
  const search = props.search;

  const params = useParams();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginId, setLoginId] = useRecoilState(loginUserIdState);
  const [storeList, setStoreList] = useState([]);
  const [keyword, setKeyword] = useState(
    params.searchItem != null ? params.searchItem : ""
  );
  useEffect(() => {
    console.log(params.searchItem);
    setKeyword(params.searchItem ? params.searchItem : "");
  }, [params]);
  useEffect(() => {
    if (search != null) {
      axios
        .get(`${backServer}/store/storeList`)
        .then((res) => {
          console.log(res);
          setStoreList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("keyword", keyword);
      axios
        .get(`${backServer}/store/storeList/keyword/${keyword}`)
        .then((res) => {
          console.log(res);
          setStoreList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loginId, keyword]);
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
                  src={`${backServer}/store/${store.siFilepath}`}
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
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default SearchList;
