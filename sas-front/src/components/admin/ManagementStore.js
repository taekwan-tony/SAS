import { useEffect, useState } from "react";
import KakaoCluster from "../utils/KakaoCluster";
import axios from "axios";

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
    <div>
      <KakaoCluster positions={mapData} />
    </div>
  );
};

export default ManagementStore;
