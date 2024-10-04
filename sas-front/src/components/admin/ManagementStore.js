import { useEffect, useState } from "react";
import KakaoCluster from "../utils/KakaoCluster";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import AdminStoreDetail from "./AdminStoreDetail";

const ManagementStore = (props) => {
  const setAdminDetailTitle = props.setAdminDetailTitle;
  const [mapData, setMapData] = useState([]);
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
      <KakaoCluster positions={mapData} />

      <Routes>
        <Route path="storeDetail/:storeNo" element={<AdminStoreDetail />} />
      </Routes>
    </div>
  );
};

export default ManagementStore;
