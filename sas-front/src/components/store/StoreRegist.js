import { useRef, useState } from "react";
import "./storeRegist.css";
import Swal from "sweetalert2";
import axios from "axios";

const StoreRegist = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [bnMsg, setBnMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [store, setStore] = useState({
    soName: "",
    businessNumber: "",
    soPhone: "",
    soEmail: "",
    storeName: "",
    storePhone: "",
    storeAddr: "",
    storeTime: "",
    storeClass: "",
  });

  const [storeThumb, setStoreThumb] = useState("");

  const storeImgRef = useRef(null);

  //미리보기
  const [storeImage, setStoreImage] = useState(null);

  //이미지 첨부파일 변경 시 동작 함수
  const changeStoreThumbnail = (e) => {
    const files = e.currentTarget.files;

    if (files.length !== 0 && files[0] !== 0) {
      //파일 객체 값 저장
      setStoreThumb(files[0]);

      //화면에서 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setStoreImage(reader.result);
      };
    } else {
      setStoreThumb(null);
      setStoreImage(null);
    }
  };

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
            confirmButtonColor: "#5e9960",
          }).then(setBnMsg("조회에 성공하였습니다."));
        } else {
          // 실패 처리
          console.log("fail");
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
        console.error("error", error);
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
        console.log(res);
        if (res.data) {
          setEmailMsg("사용 가능한 이메일입니다.");
        } else {
          setEmailMsg("이미 가입한 이메일입니다.");
        }
      })
      .catch((err) => {
        console.log(err);
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
                    placeholder="번호만 입력해주세요."
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
                    paddingLeft: bnMsg ? "10px" : "0px", // 메시지가 있을 때만 padding
                  }}
                >
                  {bnMsg}
                </p>
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

      <div className="storeRegist-main2">
        <div className="storeRegist-wrap">
          <table className="storeRegist-table">
            <tbody>
              <tr className="storeRegist-tr">
                <td>
                  <div className="storeRegist-div">
                    <div className="storeRegist-imgDiv">
                      {storeImage ? (
                        <img
                          className="storeRegist-img"
                          src={storeImage}
                          onClick={() => {
                            storeImgRef.current.click();
                          }}
                        />
                      ) : (
                        <img
                          className="storeRegist-img"
                          src="/image/s&s로고.png"
                          onClick={() => {
                            storeImgRef.current.click();
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <button className="storeRegist-storeImg-btn">
                    매장 사진 등록
                  </button>
                </td>
              </tr>
              <tr className="storeRegist-tr">
                <th className="storeRegist-th">
                  <label htmlFor="storeName">매장 상호명</label>
                </th>
                <td>
                  <div className="storeRegist-div">
                    <input
                      className="storeRegist-inputBox"
                      type="text"
                      id="storeName"
                      name="storeName"
                      value={store.storeName}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeRegist-tr">
                <th className="storeRegist-th">
                  <label htmlFor="storePhone">매장 전화번호</label>
                </th>
                <td>
                  <div className="storeRegist-div">
                    <input
                      className="storeRegist-inputBox"
                      type="text"
                      id="storePhone"
                      name="storePhone"
                      value={store.storePhone}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeRegist-tr">
                <th className="storeRegist-th">
                  <label htmlFor="storeAddr">매장 위치</label>
                </th>
                <td>
                  <div className="storeRegist-div">
                    <input
                      className="storeRegist-inputBox"
                      type="text"
                      id="storeAddr"
                      name="storeAddr"
                      value={store.storeAddr}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeRegist-tr">
                <th className="storeRegist-th">
                  <label htmlFor="storeTime">영업 시간</label>
                </th>
                <td>
                  <div className="storeRegist-div">
                    <input
                      className="storeRegist-inputBox"
                      type="text"
                      id="storeTime"
                      name="storeTime"
                      value={store.storeTime}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeRegist-tr">
                <th className="storeRegist-th">
                  <label htmlFor="storeClass">매장 유형</label>
                </th>
                <td>
                  <div className="storeRegist-div">
                    <input
                      className="storeRegist-inputBox"
                      type="text"
                      id="storeClass"
                      name="storeClass"
                      value={store.storeClass}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoreRegist;