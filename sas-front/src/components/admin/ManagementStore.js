import { useEffect, useState } from "react";
import KakaoCluster from "../utils/KakaoCluster";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import ManagementStoreDetail from "./ManagementStoreDetail";

const ManagementStore = (props) => {
  const setAdminDetailTitle = props.setAdminDetailTitle;
  setAdminDetailTitle("지역별 매장 현황");
  const [mapData, setMapData] = useState([]);
  const [storeNo, setStoreNo] = useState(0);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/store/kakaoMapStore`)
      .then((res) => {
        console.log(res);
        setMapData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="admin-management-kakao-map-wrap">
      <div className="admin-management-kakao-map-title">
        <span className="material-icons">filter_hdr</span>
        <span> 지역별 매장 현황</span>
      </div>
      <KakaoCluster positions={mapData} setStoreNo={setStoreNo} />
      {storeNo !== 0 ? <ManagementStoreDetail storeNo={storeNo} /> : ""}
    </div>
  );
};

export default ManagementStore;
