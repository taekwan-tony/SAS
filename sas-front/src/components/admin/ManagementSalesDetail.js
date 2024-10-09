import { Height } from "@mui/icons-material";
import { FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminExcelDown from "./AdminExcelDown";

const ManagementSalesDetail = (props) => {
  const setAdminDetailTitle = props.setAdminDetailTitle;
  setAdminDetailTitle("매출현황+상세정보현황");
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [keyword, setKeyword] = useState(null);
  const [orderBy, setOrderBy] = useState(1);
  const [reqPage, setReqPage] = useState(30);
  const [totalUser, setTotalUser] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [salesDetailList, setSalesDetailList] = useState([]); // 결과값 배열값
  const [detailList, setDetailList] = useState([]); // 화면 구현용 배열
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [check, setCheck] = useState(true);
  const changeStartDate = (e) => {
    setStartDateValue(e.target.value);
  };
  const changeEndDate = (e) => {
    setEndDateValue(e.target.value);
  };
  const changekeywordDate = (e) => {
    if (e.target.value === "") {
      setKeyword(null);
    } else {
      setKeyword(e.target.value);
    }
  };
  useEffect(() => {
    if (reqPage != salesDetailList.length) {
      window.addEventListener("scroll", handleScroll);
      const list = salesDetailList.filter((item, index) => {
        return index < reqPage;
      });
      setDetailList(list);
    }
  }, [reqPage]);
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (reqPage !== salesDetailList.length) {
      if (scrollTop + clientHeight >= scrollHeight) {
        if (reqPage !== salesDetailList.length) {
          let paging = reqPage + 10;
          if (paging >= salesDetailList.length) {
            paging = salesDetailList.length;
          }
          setReqPage(paging);
        }
      }
    }
  };

  const handleChange = (e) => {
    setOrderBy(e.target.value);
  };
  const searchSales = () => {
    console.log(1);
    if (startDateValue != "" && endDateValue != "") {
      console.log(2);
      axios
        .get(
          `${backServer}/admin/salesDetailList/${startDateValue}/${endDateValue}/${keyword}/${orderBy}`
        )
        .then((res) => {
          console.log(res);
          console.log(1);
          setSalesDetailList(res.data.list);
          const list = res.data.list.filter((item, index) => {
            return index < 30;
          });
          setReqPage(30);
          setDetailList(list);
          setTotalPrice(res.data.total.totalPrice);
          setTotalUser(res.data.total.totalUser);
          if (res.data.list.length === 0) {
            setCheck(false);
          } else {
            setCheck(true);
          }
          console.log(orderBy);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "등록일 작성요청",
        text: "조회할 날짜를 선택후 시도하세요",
        icon: "error",
      });
    }
  };
  return (
    <>
      <div className="admin-management-sales-detail-search-wrap">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchSales();
          }}
        >
          <div>
            <input
              type="date"
              id="admin-management-input-date"
              value={startDateValue}
              onChange={changeStartDate}
            />
            <span> ~ </span>
            <input
              type="date"
              id="admin-management-input-date"
              value={endDateValue}
              onChange={changeEndDate}
            />
          </div>
          <div>
            <input
              type="text"
              id="admin-management-input-text"
              value={keyword}
              onChange={changekeywordDate}
            />
            <button type="submit" className="btn-sub round">
              조회
            </button>
          </div>
          <div>
            <FormControl sx={{ m: 1, minWidth: "200px" }}>
              <Select value={orderBy} onChange={handleChange} displayEmpty>
                <MenuItem value={1}>제휴등록일순</MenuItem>
                <MenuItem value={2}>매장이름순</MenuItem>
                <MenuItem value={3}>주소순</MenuItem>
                <MenuItem value={4}>사업자순</MenuItem>
                <MenuItem value={8}>금액순</MenuItem>
                <MenuItem value={9}>이용자순</MenuItem>
              </Select>
            </FormControl>
          </div>
        </form>
      </div>
      <div className="admin-management-sales-detail-excel-download">
        <AdminExcelDown
          salesDetailList={salesDetailList}
          totalUser={totalUser}
          totalPrice={totalPrice}
        />
      </div>
      <div className="admin-management-sales-detail-content-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: "3%" }}>순서</th>
              <th style={{ width: "6%" }}>고유번호</th>
              <th style={{ width: "7%" }}>매장</th>
              <th style={{ width: "19%" }}>주소</th>
              <th style={{ width: "8%" }}>사업자명</th>
              <th style={{ width: "8%" }}>사업자번호</th>
              <th style={{ width: "19%" }}>금액</th>
              <th style={{ width: "15%" }}>이용자수</th>
              <th style={{ width: "8%" }}>이용료</th>
              <th style={{ width: "7%" }}>등록일</th>
            </tr>
          </thead>
          {check ? (
            <tbody>
              {detailList ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>총합</td>
                  <td>{totalPrice}</td>
                  <td>{totalUser}</td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                ""
              )}
              {detailList.map((detail, index) => {
                return (
                  <SalesDetailBox key={"sales-item-" + index} detail={detail} />
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={10} style={{ height: "250px" }}>
                  검색결과가 없습니다.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

const SalesDetailBox = (props) => {
  const detail = props.detail;
  return (
    <tr>
      <td>{detail.rnum}</td>
      <td>{detail.storeNo}</td>
      <td>{detail.storeName}</td>
      <td>{detail.storeAddr}</td>
      <td>{detail.soName}</td>
      <td>{detail.businessNumber}</td>
      <td>{detail.storeTotalPrice}</td>
      <td>{detail.storeTotalUsingCount}</td>
      <td>{detail.servicePrice}</td>
      <td>{detail.storeEnrollDate}</td>
    </tr>
  );
};

export default ManagementSalesDetail;
