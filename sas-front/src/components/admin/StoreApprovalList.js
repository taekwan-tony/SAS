import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNavi from "../utils/PagiNavi";
import axios from "axios";

const StoreApprovalList = (props) => {
  const setAdminDetailTitle = props.setAdminDetailTitle;
  const navigate = useNavigate();

  setAdminDetailTitle("제휴승인 목록");
  const [storeList, setStoreList] = useState([]);
  const [storeType, setStoreType] = useState(0);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/admin/storeList/${reqPage}/${storeType}`)
      .then((res) => {
        setStoreList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [storeType, reqPage]);
  const changeStoreType = (obj) => {
    setStoreType(obj.target.id);
    setReqPage(1);
  };
  return (
    <div className="admin-store-list-wrap">
      <div className="admin-store-list-menu">
        <div
          className={
            storeType == 0
              ? "admin-store-menu admin-store-menu-check"
              : "admin-store-menu"
          }
          onClick={changeStoreType}
          id="0"
        >
          <span id="0">승인전</span>
        </div>
        <div
          className={
            storeType == 1
              ? "admin-store-menu admin-store-menu-check"
              : "admin-store-menu"
          }
          onClick={changeStoreType}
          id="1"
        >
          <span id="1">승인</span>
        </div>
        <div
          className={
            storeType == 2
              ? "admin-store-menu admin-store-menu-check"
              : "admin-store-menu"
          }
          onClick={changeStoreType}
          id="2"
        >
          <span id="2">반려</span>
        </div>
        <div
          className={
            storeType == 3
              ? "admin-store-menu admin-store-menu-check"
              : "admin-store-menu"
          }
          onClick={changeStoreType}
          id="3"
        >
          <span id="3">계약종료</span>
        </div>
      </div>
      <div className="admin-store-list-main">
        <table className="admin-store-posting-wrap">
          <thead>
            <tr className="admin-store-posting-title">
              <th style={{ width: "10%" }}>번호</th>
              <th style={{ width: "20%" }}>요청일</th>
              <th style={{ width: "15%" }}>사업주</th>
              <th style={{ width: "15%" }}>사업자번호</th>
              <th style={{ width: "25%" }}>제휴이메일</th>
              <th style={{ width: "15%" }}>전화번호</th>
            </tr>
          </thead>
          {storeList.map((store, i) => {
            return (
              <StoreItem
                key={"admin-store-" + i}
                store={store}
                storeType={storeType}
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
  const storeType = props.storeType;
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        if (storeType == 0) {
          navigate(`/admin/store/approvalDetail/${store.storeNo}/${storeType}`);
        }
      }}
    >
      <td style={{ width: "10%" }}>{store.storeNo}</td>
      <td style={{ width: "20%" }}>{store.storeEnrollDate}</td>
      <td style={{ width: "15%" }}>{store.soName}</td>
      <td style={{ width: "15%" }}>{store.businessNumber}</td>
      <td style={{ width: "25%" }}>{store.soEmail}</td>
      <td style={{ width: "15%" }}>{store.storePhone}</td>
    </tr>
  );
};

export default StoreApprovalList;
