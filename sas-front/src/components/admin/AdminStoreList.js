import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PageNavi from "../utils/PagiNavi";
import { useNavigate } from "react-router-dom";

const AdminStoreList = (props) => {
  const setAdminDetailTitle = props.setAdminDetailTitle;
  setAdminDetailTitle("제휴 목록");
  const [storeList, setStoreList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [changeData, setChangeData] = useState(0);
  const [pi, setPi] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/admin/storeList/${reqPage}/${1}`)
      .then((res) => {
        setStoreList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, changeData]);

  return (
    <div className="admin-store-list-wrap">
      <div className="admin-store-list-menu">
        <div className="admin-store-menu admin-store-menu-check">
          <span>매장현황</span>
        </div>
      </div>
      <div className="admin-store-list-main">
        <table className="admin-store-posting-wrap">
          <thead>
            <tr className="admin-store-posting-title">
              <th style={{ width: "10%" }}>번호</th>
              <th style={{ width: "20%" }}>제휴등록일</th>
              <th style={{ width: "15%" }}>사업주</th>
              <th style={{ width: "15%" }}>사업자번호</th>
              <th style={{ width: "25%" }}>제휴이메일</th>
              <th style={{ width: "15%" }}>전화번호</th>
            </tr>
          </thead>
          {storeList.map((store, i) => {
            return <StoreItem key={"admin-store-" + i} store={store} />;
          })}
        </table>
      </div>
      <div className="admin-store-paging-wrap">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </div>
  );
};

const StoreItem = (props) => {
  const store = props.store;
  const navigate = useNavigate();
  return (
    <tr onClick={navigate(`/admin/store/storeDetail/${store.storeNo}`)}>
      <td style={{ width: "10%" }}>{store.storeNo}</td>
      <td style={{ width: "20%" }}>{store.storeEnrollDate}</td>
      <td style={{ width: "15%" }}>{store.soName}</td>
      <td style={{ width: "15%" }}>{store.businessNumber}</td>
      <td style={{ width: "25%" }}>{store.soEmail}</td>
      <td style={{ width: "15%" }}>{store.soPhone}</td>
    </tr>
  );
};

export default AdminStoreList;
