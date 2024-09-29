import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KaKao from "../utils/Kakao";

const AdminStoreDetail = (props) => {
  const setAdminDetailTitle = props.setAdminDetailTitle;
  setAdminDetailTitle("제휴 상세페이지");
  const params = useParams();
  const storeNo = params.storeNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [store, setStore] = useState({});
  useEffect(() => {
    axios
      .get(`${backServer}/admin/storeDetail/${storeNo}`)
      .then((res) => {
        console.log(res);
        setStore(res.data.store);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="admin-store-detail-wrap">
      <div className="admin-store-detail-info">
        <div className="admin-store-detail-info-wrap">
          <div className="admin-store-detail-info-title">
            <h4>매장 정보</h4>
          </div>
          <div className="admin-store-detail-info-content">
            <div>
              <span>매장 이름 : </span>
              <span>{store.storeName}</span>
            </div>
            <div className="admin-store-detail-business">
              <div>
                <span>사업자 번호 : </span>
                <span>{store.businessNumber}</span>
              </div>
              <div>
                <span>사업자 이름 : </span>
                <span>{store.soName}</span>
              </div>
            </div>
            <div className="admin-store-detail-map-wrap">
              <div>
                <span>매장 주소 : </span>
                <span>{store.storeAddr}</span>
              </div>
              <div className="admin-store-detail-map-data">
                <KaKao addr={store.storeAddr} name={store.storeName} />
              </div>
            </div>
          </div>
        </div>
        <div className="admin-store-detail-data-wrap">
          <div>데이터</div>
        </div>
      </div>
    </div>
  );
};

export default AdminStoreDetail;
