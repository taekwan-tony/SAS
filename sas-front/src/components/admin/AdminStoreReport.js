import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PageNavi from "../utils/PagiNavi";
import { useNavigate } from "react-router-dom";

const AdminStoreReport = (props) => {
  const setAdminDetailTitle = props.setAdminDetailTitle;
  setAdminDetailTitle("매장 신고리스트");
  const [storeList, setStoreList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [changeData, setChangeData] = useState(0);
  const [pi, setPi] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/admin/storeReportLIst/${reqPage}`)
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
          <span>신고리스트</span>
        </div>
      </div>
      <div className="admin-store-list-main">
        <table className="admin-store-posting-wrap">
          <thead>
            <tr className="admin-store-posting-title">
              <th style={{ width: "10%" }}>번호</th>
              <th style={{ width: "10%" }}>사업주</th>
              <th style={{ width: "20%" }}>매장</th>
              <th style={{ width: "15%" }}>전화번호</th>
              <th style={{ width: "25%" }}>주소</th>
              <th style={{ width: "10%" }}>신고횟수</th>
              <th style={{ width: "10%" }}>제재</th>
            </tr>
          </thead>
          {storeList.map((store, i) => {
            return (
              <StoreItem
                key={"admin-store-" + i}
                store={store}
                setChangeData={setChangeData}
              />
            );
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
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const setChangeData = props.setChangeData;
  const sotreReport = () => {
    axios
      .patch(`${backServer}/admin/storeReportComp/${store.storeNo}`)
      .then((res) => {
        Swal.fire({
          title: "매장제재요청완료",
          text: "요청온 신고 횟수에 따른 제재 요청 메일 전송되었습니다.",
          icon: "success",
        }).then(() => {
          setChangeData(store.storeNo);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <tr className="admin-store-report-select-wrap">
      <td style={{ width: "10%" }}>{store.storeNo}</td>
      <td style={{ width: "10%" }}>{store.soName}</td>
      <td style={{ width: "20%" }}>{store.storeName}</td>
      <td style={{ width: "15%" }}>{store.soPhone}</td>
      <td style={{ width: "25%" }}>{store.storeAddr}</td>
      <td style={{ width: "10%" }}>{store.reportTotalCount}</td>
      <td style={{ width: "10%" }}>
        <div className="admin-store-button-zone">
          <button className="btn-main round" value={1} onClick={sotreReport}>
            점주제재
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminStoreReport;
