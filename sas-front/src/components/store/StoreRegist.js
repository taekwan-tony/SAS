import { useState } from "react";
import "./storeRegist.css";
import Swal from "sweetalert2";

const StoreRegist = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [store, setStore] = useState({
    soName: "aaaaaaaaaaaaaaaaaaaa",
    businessNumber: "",
    soPhone: "aa",
    soEmail: "aa",
  });

  const changeStore = (e) => {
    const name = e.target.name;
    setStore({ ...store, [name]: e.target.value });
  };

  const storeRegistBusinessNumber = () => {
    // 사업자등록번호 입력 값에서 숫자 외의 문자를 제거하는 부분
    const businessNumberElement = document.getElementById("businessNumber");
    businessNumberElement.value = businessNumberElement.value.replace(
      /[^0-9]/g,
      ""
    );

    const reg_num = businessNumberElement.value;

    if (!reg_num) {
      Swal.fire({
        title: "사업자등록번호를 입력해주세요.",
        icon: "warning",
      });
      //alert("사업자등록번호를 입력해주세요.");
      return false;
    }

    // 전송할 데이터
    const data = {
      b_no: [reg_num],
    };

    // Fetch API를 사용하여 POST 요청 보내기
    fetch(
      "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=izDvzK%2FsSEz9bDSkKZ2ITpUtPOjeYOTTFEsMUh%2BOKm%2B1SNrCWoYHCLtDCJ1F184rdJo3an8rhug39mJE4F59Xw%3D%3D",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json()) // JSON 응답을 파싱
      .then((result) => {
        console.log(result);
        if (result.match_cnt === 1) {
          // 성공 처리
          console.log("success");
          Swal.fire({
            title: "사업자등록번호 조회 성공",
            icon: "success",
          });
        } else {
          // 실패 처리
          console.log("fail");
          Swal.fire({
            title: "사업자등록번호 조회 실패",
            icon: "warning",
            text: "국세청에 등록되지 않은 사업자등록번호입니다.",
          });
          //alert(result.data[0]["tax_type"]);
        }
      })
      .catch((error) => {
        // 에러 처리
        console.error("error", error);
      });
  };

  return (
    <div>
      <div className="storeRegist-wrap">
        <table className="storeRegist-table">
          <tbody>
            <tr className="storeRegist-tr">
              <th className="storeRegist-th">
                <label htmlFor="businessNumber" className="storeRegist-label">
                  사업자번호
                </label>
              </th>
              <td>
                <div className="storeRegist-div">
                  <input
                    className="storeRegist-inputBox"
                    type="text"
                    id="businessNumber"
                    name="businessNumber"
                    value={store.businessNumber}
                    onChange={changeStore}
                  ></input>
                  <button
                    className="storeRegist-btn"
                    onClick={storeRegistBusinessNumber}
                  >
                    조회
                  </button>
                </div>
              </td>
            </tr>
            <tr className="storeRegist-tr">
              <th className="storeRegist-th">
                <label htmlFor="soName" className="storeRegist-label">
                  이름
                </label>
              </th>
              <td>
                <div className="storeRegist-div">
                  <input
                    className="storeRegist-inputBox"
                    type="text"
                    id="soName"
                    name="soName"
                    value={store.soName}
                    onChange={changeStore}
                  ></input>
                </div>
              </td>
            </tr>
            <tr className="storeRegist-tr">
              <th className="storeRegist-th">
                <label htmlFor="soPhone" className="storeRegist-label">
                  전화번호
                </label>
              </th>
              <td>
                <div className="storeRegist-div">
                  <input
                    className="storeRegist-inputBox"
                    type="text"
                    id="sophone"
                    name="soPhone"
                    value={store.soPhone}
                    onChange={changeStore}
                  ></input>
                </div>
              </td>
            </tr>
            <tr className="storeRegist-tr">
              <th className="storeRegist-th">
                <label htmlFor="soEmail" className="storeRegist-label">
                  이메일
                </label>
              </th>
              <td>
                <div className="storeRegist-div">
                  <input
                    className="storeRegist-inputBox"
                    type="text"
                    id="soEmail"
                    name="soEmail"
                    value={store.soEmail}
                    onChange={changeStore}
                  ></input>
                  <button className="storeRegist-btn">인증</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreRegist;
