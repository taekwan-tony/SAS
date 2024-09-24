import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNavi from "../utils/PagiNavi";
import axios from "axios";
import Swal from "sweetalert2";

const StoreApprovalList = (props) => {
  const setAdminDetailTitle = props.setAdminDetailTitle;
  const navigate = useNavigate();

  setAdminDetailTitle("제휴승인 목록");
  const [storeList, setStoreList] = useState([]);
  const [storeType, setStoreType] = useState(0);
  const [reqPage, setReqPage] = useState(1);
  const [changeData, setChangeData] = useState(0);
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
  }, [storeType, reqPage, changeData]);
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
              <th style={storeType == 0 ? { width: "5%" } : { width: "10%" }}>
                번호
              </th>
              <th style={storeType == 0 ? { width: "15%" } : { width: "20%" }}>
                요청일
              </th>
              <th style={storeType == 0 ? { width: "10%" } : { width: "15%" }}>
                사업주
              </th>
              <th style={storeType == 0 ? { width: "15%" } : { width: "15%" }}>
                사업자번호
              </th>
              <th style={storeType == 0 ? { width: "20%" } : { width: "25%" }}>
                제휴이메일
              </th>
              <th style={storeType == 0 ? { width: "15%" } : { width: "15%" }}>
                전화번호
              </th>
              {storeType == 0 ? <th style={{ width: "20%" }}>승인여부</th> : ""}
            </tr>
          </thead>
          {storeList.map((store, i) => {
            return (
              <StoreItem
                key={"admin-store-" + i}
                store={store}
                storeType={storeType}
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
  const storeType = props.storeType;
  const setChangeData = props.setChangeData;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const approvalStore = (e) => {
    const registType = e.target.value;
    const form = new FormData();
    form.append("storeNo", store.storeNo);
    form.append("soEmail", store.soEmail);
    form.append("registType", registType);
    axios
      .patch(`${backServer}/admin/approvalStore`, form)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "제휴 승인 완료",
          text: "제휴 승인을 완료했습니다.",
          icon: "success",
        }).then(() => {
          setChangeData(store.storeNo);
        });
      })
      .catch((err) => {});
  };
  return (
    <tr>
      <td style={storeType == 0 ? { width: "5%" } : { width: "10%" }}>
        {store.storeNo}
      </td>
      <td style={storeType == 0 ? { width: "15%" } : { width: "20%" }}>
        {store.storeRequestDate}
      </td>
      <td style={storeType == 0 ? { width: "10%" } : { width: "15%" }}>
        {store.soName}
      </td>
      <td style={storeType == 0 ? { width: "15%" } : { width: "15%" }}>
        {store.businessNumber}
      </td>
      <td style={storeType == 0 ? { width: "20%" } : { width: "25%" }}>
        {store.soEmail}
      </td>
      <td style={storeType == 0 ? { width: "15%" } : { width: "15%" }}>
        {store.soPhone}
      </td>
      {storeType == 0 ? (
        <td style={{ width: "20%" }}>
          <div className="admin-store-button-zone">
            <button
              className="btn-main round"
              value={1}
              onClick={approvalStore}
            >
              승인
            </button>
            <button className="btn-sub round" value={2} onClick={approvalStore}>
              반려
            </button>
          </div>
        </td>
      ) : (
        ""
      )}
    </tr>
  );
};

export default StoreApprovalList;
