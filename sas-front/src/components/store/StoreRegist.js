import { useState } from "react";
import "./storeRegist.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoreRegist = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [bnMsg, setBnMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [store, setStore] = useState({
    soName: "",
    businessNumber: "",
    soPhone: "",
    soEmail: "",
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
        confirmButtonColor: "#5e9960",
      });
      return false;
    }

    // 전송할 데이터
    const data = {
      b_no: [reg_num],
    };

    // Fetch API를 사용하여 POST 요청 보내기
    fetch(
      "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=izDvzK%2 FsSEz9bDSkKZ2ITpUtPOjeYOTTFEsMUh%2BOKm%2B1SNrCWoYHCLtDCJ1F184rdJo3an8rhug39mJE4F59Xw%3D%3D",
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
        if (result.match_cnt === 1) {
          // 성공 처리
          Swal.fire({
            title: "사업자등록번호 조회 성공",
            icon: "success",
            confirmButtonColor: "#5e9960",
          }).then(setBnMsg("조회에 성공하였습니다."));
        } else {
          // 실패 처리
          Swal.fire({
            title: "사업자등록번호 조회 실패",
            icon: "warning",
            text: "국세청에 등록되지 않은 사업자등록번호입니다.",
            confirmButtonColor: "#5e9960",
          });
          setBnMsg("");
        }
      })
      .catch((error) => {
        // 에러 처리
        setBnMsg("");
      });
  };

  const storeRegistEmailCheck = () => {
    const soEmailElement = document.getElementById("soEmail");

    const emailCheck = soEmailElement.value;
    if (!emailCheck) {
      Swal.fire({
        title: "이메일을 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return false;
    }
    axios
      .get(`${backServer}/store/soEmail/${store.soEmail}/checkEmail`)
      .then((res) => {
        if (res.data) {
          setEmailMsg("사용 가능한 이메일입니다.");
        } else {
          setEmailMsg("이미 가입한 이메일입니다.");
        }
      })
      .catch((err) => {});
  };

  const storePartnership = () => {
    axios
      .post(`${backServer}/store`, store)
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "제휴 신청 완료",
            icon: "success",
            text: "관리자 승인까지 약 1~3일 소요됩니다.",
            confirmButtonColor: "#5e9960",
          }).then(() => {
            navigate("/storeMain");
          });
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="storeRegist-main">
      <div className="storeRegist-wrap">
        <table className="storeRegist-table">
          <tbody className="storeRegist-tbody">
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
                    placeholder="-을 제외한 번호만 입력해주세요."
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
                <p
                  className="storeRegist-msg"
                  style={{
                    backgroundImage: bnMsg
                      ? `url(${process.env.PUBLIC_URL}/image/icon_check.svg)`
                      : "none", // 이미지가 없을 때는 none
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                    marginLeft: "10px",
                    paddingLeft: bnMsg ? "15px" : "0px", // 메시지가 있을 때만 padding
                  }}
                >
                  {bnMsg}
                </p>
              </td>
            </tr>
            <tr className="storeRegist-tr">
              <th className="storeRegist-th">
                <label htmlFor="soName" className="storeRegist-label">
                  점주 이름
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
                    placeholder="010-0000-0000 형태로 입력해주세요."
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
                  <button
                    className="storeRegist-btn"
                    onClick={storeRegistEmailCheck}
                  >
                    중복 체크
                  </button>
                </div>
                <p
                  className="storeRegist-msg"
                  style={{
                    backgroundImage: emailMsg
                      ? `url(${process.env.PUBLIC_URL}/image/icon_check.svg)`
                      : "none", // 이미지가 없을 때는 none
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                    marginLeft: "10px",
                    paddingLeft: emailMsg ? "10px" : "0px", // 메시지가 있을 때만 padding
                  }}
                >
                  {emailMsg}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="storeRegist-btn-zone">
        <button
          type="submit"
          className="storeRegist-partnership-btn"
          onClick={storePartnership}
        >
          제휴 신청
        </button>
      </div>
    </div>
  );
};

export default StoreRegist;
