import { useCallback, useEffect, useRef, useState } from "react";
import "./storeUpdate.css";
import Swal from "sweetalert2";
import axios from "axios";
import PostCodeApi from "../utils/PostCodeApi";
import "./modal.css";
import { Link, useNavigate } from "react-router-dom";
import SelectMUI from "../utils/SelectMUI";
import StoreMoodCheckBoxMUI from "../utils/StoreMoodCheckBoxMUI";
import StoreAmenitiesCheckBoxMUI from "../utils/StoreAmenitiesCheckBoxMUI";
import { useRecoilState, useRecoilValue } from "recoil";
import { isStoreLoginState } from "../utils/RecoilData";
import {
  loginStoreIdState,
  loginStoreNoState,
  storeTypeState,
} from "../utils/RecoilData";

const StoreUpdate = (props) => {
  const setActiveIndex = props.setActiveIndex;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLoginStore = useRecoilValue(isStoreLoginState);
  const [check, setCheck] = useState(false);
  const { loginstoreNo, isEditing, setIsEditing } = props;
  const [store, setStore] = useState({});
  const [storeSeatCapacity, setStoreSeatCapacity] = useState(""); // 좌석 수용 인원 상태
  const [storeSeatAmount, setStoreSeatAmount] = useState(""); // 총 좌석 수 상태
  const [seat, setSeat] = useState({
    seatCapacity: "",
    seatAmount: "",
  });

  // API로부터 데이터 가져오기 (예시)
  useEffect(() => {
    setActiveIndex(1);
    if (store.seatList && store.seatList.length > 0) {
      // store.seatList가 존재하고 배열이 비어 있지 않으면 첫 번째 좌석의 수용 인원 설정
      setStoreSeatCapacity(store.seatList[0].seatCapacity);
      setStoreSeatAmount(store.seatList[0].seatAmount);
      // console.log("총 좌석 수 : ", storeSeatAmount);
      // console.log("수용 인원 : ", storeSeatCapacity);
    }
  }, [store]);

  // storeSeatCapacity와 storeSeatAmount가 변경되었을 때 seat 상태를 업데이트
  useEffect(() => {
    if (storeSeatCapacity && storeSeatAmount) {
      setSeat({
        seatCapacity: storeSeatCapacity,
        seatAmount: storeSeatAmount,
      });
    }
  }, [storeSeatCapacity, storeSeatAmount]);

  //console.log("매장 좌석 수 : ", seat);

  //매장 정보 출력
  useEffect(() => {
    if (isLoginStore) {
      axios
        .get(`${backServer}/store/storeUpdate/${loginstoreNo}`)
        .then((res) => {
          //console.log("매장 정보 출력 : ", res.data);
          setStore(res.data);
          setCheck(res.data.length);

          if (res.data.storeSiFilepathList) {
            setStoreSiFilepathList(res.data.storeSiFilepathList);
          }
        })
        .catch((err) => {
          //console.log("매장 정보 출력 오류 : ", err);
        });
    }
  }, [loginstoreNo, check, isLoginStore]);

  const [storeMood, setStoreMood] = useState([]);
  const [storeAmenities, setStoreAmenities] = useState([]);

  const changeStore = (e) => {
    const name = e.target.name;
    setStore({ ...store, [name]: e.target.value });
    setSeat({ ...seat, [name]: e.target.value });
  };

  //첨부파일
  const [storeFile, setStoreFile] = useState([]); //사진 저장
  const [storeImage, setStoreImage] = useState([]); //미리보기용
  const [storeSiFilepathList, setStoreSiFilepathList] = useState([]); //저장되어 있던 사진 출력용
  // 기존 첨부파일을 삭제하면 삭제한 파일 번호를 저장할 배열
  const [delStoreFileNo, setDelStoreFileNo] = useState([]);

  //메뉴 썸네일 이미지 첨부파일 변경 시 동작 함수
  const changeStoreThumbnail = (e) => {
    const files = Array.from(e.currentTarget.files);
    let urlList = [];

    if (files.length !== 0) {
      setStoreFile((prevFiles) => [...prevFiles, ...files]);

      // 미리보기
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          urlList.push(reader.result);
          if (urlList.length === files.length) {
            setStoreImage((prevImages) => [...prevImages, ...urlList]);
          }
        };
      });
    }
  };

  // 기존 이미지 삭제
  const removeExistingImage = (indexToRemove, imageId) => {
    setStoreSiFilepathList(
      (prevList) => prevList.filter((_, index) => index !== indexToRemove) // UI에서 삭제
    );
    setDelStoreFileNo((prevIds) => [...prevIds, imageId]); // 삭제할 이미지 ID 저장
  };

  // 새로 추가된 이미지 삭제 함수
  const removeNewImage = (indexToRemove) => {
    setStoreImage((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setStoreFile((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleHandler = () => {
    setIsModalOpen((prevOpenState) => !prevOpenState);
  };

  // 주소
  const [detailAddress, setDetailedAddress] = useState("");

  // const inputChangeHandler = (event) => {
  //   setDetailedAddress(event.target.value);
  // };

  // 매장 유형 변경 핸들러
  const handleChange = (event) => {
    const { value } = event.target;
    setStore((prevStore) => ({
      ...prevStore, // 기존 store 값 유지
      storeClass: value, // 선택된 값을 storeClass에 저장
    }));
  };

  //매장 수정
  const storeModify = () => {
    // 매장 이름 검증 (변경된 경우에만)
    if (store.storeName !== originalStoreName) {
      console.log("변경된 매장 이름:", store.storeName); // 현재 매장 이름
      console.log(
        "정규 표현식 테스트 결과:",
        storeNameRegex.test(store.storeName)
      ); // 정규 표현식 결과

      if (!storeNameRegex.test(store.storeName)) {
        Swal.fire({
          title: "매장 이름 오류",
          text: "매장 이름은 한글 20자 이하, 영문 및 숫자는 40자 이하로 설정해주세요.",
          icon: "warning",
          confirmButtonColor: "#5e9960",
        });
        return; // 검증에 실패하면 수정 요청을 보내지 않음
      }
    }

    // 매장 전화번호 검증 (변경된 경우에만)
    if (
      store.storePhone !== originalStorePhone && // 기존 전화번호와 비교
      !storePhoneRegex.test(store.storePhone)
    ) {
      Swal.fire({
        title: "전화번호 오류",
        text: "전화번호는 xxx-xxxx-xxxx 형식으로 입력해주세요 (x는 숫자).",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return; // 검증 실패 시 수정 요청을 보내지 않음
    }

    // 매장 소개가 4000 BYTE 이하인지 확인
    if (!isValidStoreIntroduce(store.storeIntroduce)) {
      Swal.fire({
        title: "소개 오류",
        text: "매장 소개는 4000 BYTE 이하로 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return; // 조건을 만족하지 않으면 수정 요청을 보내지 않음
    }

    // 상세 주소 검증 (변경된 경우에만)
    if (
      store.storeDetailAddr !== originalStoreDetailAddr &&
      !storeDetailAddrRegex.test(store.storeDetailAddr)
    ) {
      Swal.fire({
        title: "상세 주소 오류",
        text: "상세 주소는 1자 이상, 50자 이하로 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return; // 검증 실패 시 수정 요청을 보내지 않음
    }

    // // 영업 시간 검증 (변경된 경우에만)
    // if (
    //   store.storeTime !== originalStoreTime &&
    //   !storeTimeRegex.test(store.storeTime)
    // ) {
    //   Swal.fire({
    //     title: "영업 시간 오류",
    //     text: "영업 시간은 'HH:MM - HH:MM' 형식으로 입력해주세요.",
    //     icon: "warning",
    //     confirmButtonColor: "#5e9960",
    //   });
    //   return; // 검증 실패 시 수정 요청을 보내지 않음
    // }

    // 예약 가능 시작 시간 검증 (변경된 경우에만)
    if (
      store.storeReStart !== originalStoreReStart &&
      !storeReStartRegex.test(store.storeReStart)
    ) {
      Swal.fire({
        title: "예약 가능 시작 시간 오류",
        text: "예약 가능 시작 시간은 'HH:MM' 형식으로 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return; // 검증 실패 시 수정 요청을 보내지 않음
    }

    // 예약 가능 마감 시간 검증 (변경된 경우에만)
    if (
      store.storeReEnd !== originalStoreReEnd &&
      !storeReEndRegex.test(store.storeReEnd)
    ) {
      Swal.fire({
        title: "예약 가능 마감 시간 오류",
        text: "예약 가능 마감 시간은 'HH:MM' 형식으로 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return; // 검증 실패 시 수정 요청을 보내지 않음
    }

    // 브레이크 타임 시작 시간 검증 (변경된 경우에만)
    if (
      store.breakTimeStart !== originalBreakTimeStart &&
      !breakTimeStartRegex.test(store.breakTimeStart)
    ) {
      Swal.fire({
        title: "브레이크 타임 시작 시간 오류",
        text: "브레이크 타임 시작 시간은 'HH:MM' 형식으로 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return; // 검증 실패 시 수정 요청을 보내지 않음
    }

    // 브레이크 타임 마감 시간 검증 (변경된 경우에만)
    if (
      store.breakTimeEnd !== originalBreakTimeEnd &&
      !breakTimeEndRegex.test(store.breakTimeEnd)
    ) {
      Swal.fire({
        title: "브레이크 타임 마감 시간 오류",
        text: "브레이크 타임 마감 시간은 'HH:MM' 형식으로 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return; // 검증 실패 시 수정 요청을 보내지 않음
    }

    // 예약금 검증 (변경된 경우에만)
    if (
      store.deposit !== originalDeposit &&
      !depositRegex.test(store.deposit)
    ) {
      Swal.fire({
        title: "예약금 오류",
        text: "예약금은 숫자만 입력 가능하며, 100,000 이하로 설정해주세요.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return; // 검증 실패 시 수정 요청을 보내지 않음
    }

    // 좌석 수용 인원 검증 (변경된 경우에만)
    if (
      seat.seatCapacity !== originalSeatCapacity &&
      !seatCapacityRegex.test(seat.seatCapacity)
    ) {
      Swal.fire({
        title: "좌석 수용 인원 오류",
        text: "좌석 수용 인원은 1 이상 99 이하의 숫자만 입력 가능합니다.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return; // 검증 실패 시 수정 요청을 보내지 않음
    }

    // 총 좌석 수 검증 (변경된 경우에만)
    if (
      seat.seatAmount !== originalSeatAmount &&
      !seatAmountRegex.test(seat.seatAmount)
    ) {
      Swal.fire({
        title: "총 좌석 수 오류",
        text: "총 좌석 수는 1 이상 99 이하의 숫자만 입력 가능합니다.",
        icon: "warning",
        confirmButtonColor: "#5e9960",
      });
      return; // 검증 실패 시 수정 요청을 보내지 않음
    }

    const form = new FormData();

    // 새로 추가된 파일들
    if (storeFile.length > 0) {
      storeFile.forEach((file) => {
        form.append("storeFile", file);
      });
    }

    // 삭제할 파일 번호
    if (delStoreFileNo.length > 0) {
      delStoreFileNo.forEach((fileNo) => {
        form.append("delStoreFileNo", fileNo);
      });
    }

    // 매장 분위기
    for (let i = 0; i < storeMood.length; i++) {
      form.append("storeMood", storeMood[i]);
    }

    // 매장 편의시설
    for (let i = 0; i < storeAmenities.length; i++) {
      form.append("storeAmenities", storeAmenities[i]);
    }

    const promises = [
      // 매장 정보 수정
      axios.patch(`${backServer}/store/storeModify/${loginstoreNo}`, store),

      // 매장 좌석 수정
      axios.patch(`${backServer}/store/updateSeat/${loginstoreNo}`, seat),

      // 매장 사진 수정
      axios.patch(`${backServer}/store/updateStoreImg/${loginstoreNo}`, form, {
        headers: {
          contentType: "multipart/form-data",
        },
      }),

      // 매장 분위기 삭제 및 등록
      axios
        .delete(`${backServer}/store/deleteStoreMood/${loginstoreNo}`)
        .then(() =>
          axios.post(
            `${backServer}/store/updateStoreMood/${loginstoreNo}`,
            form,
            {
              headers: {
                contentType: "multipart/form-data",
                processData: false,
              },
            }
          )
        ),

      // 매장 편의시설 삭제 및 등록
      axios
        .delete(`${backServer}/store/deleteStoreAmenities/${loginstoreNo}`)
        .then(() =>
          axios.post(
            `${backServer}/store/updateStoreAmenities/${loginstoreNo}`,
            form,
            {
              headers: {
                contentType: "multipart/form-data",
                processData: false,
              },
            }
          )
        ),
    ];

    // 모든 요청이 끝난 후 navigate 실행
    Promise.all(promises)
      .then(() => {
        Swal.fire({
          title: "매장 정보 수정 완료.",
          text: "매장 정보가 수정되었습니다.",
          icon: "success",
          confirmButtonColor: "#5e9960",
        }).then(() => {
          setIsEditing(!isEditing); // 매장 수정 후 storeViewMain으로 이동
        });
      })
      .catch((err) => {
        console.error("매장 수정 오류", err);
      });
  };

  // 매장 소개 최대 4000 BYTE 확인 함수
  const isValidStoreIntroduce = (text) => {
    // 4000 BYTE 이하인지 확인 (UTF-8 기준, 한글은 3 BYTE로 계산)
    let byteLength = 0;
    for (let i = 0; i < text.length; i++) {
      byteLength += text.charCodeAt(i) > 127 ? 3 : 1;
      if (byteLength > 4000) return false;
    }
    return true;
  };

  // 정규표현식
  const storeNameRegex = /^[가-힣]{1,20}$|^[a-zA-Z0-9\s]{1,40}$/;
  const storePhoneRegex = /^\d{3}-\d{4}-\d{4}$/;
  const storeDetailAddrRegex = /^.{1,50}$/;
  const storeTimeRegex =
    /^(0[0-9]|1[0-9]|2[0-2]):[0-5][0-9]\s*-\s*(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const storeReStartRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const storeReEndRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const breakTimeStartRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const breakTimeEndRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const depositRegex = /^(100000|[1-9][0-9]{0,4}|0)$/;
  const seatCapacityRegex = /^(99|[1-8]?[0-9])$/;
  const seatAmountRegex = /^(99|[1-8]?[0-9])$/;

  const [originalStoreName, setOriginalStoreName] = useState(store.storeName);
  const [originalStorePhone, setOriginalStorePhone] = useState(
    store.storePhone
  );
  const [originalStoreDetailAddr, setOriginalStoreDetailAddr] = useState(
    store.storeDetailAddr
  );
  const [originalStoreTime, setOriginalStoreTime] = useState(store.storeTime);
  const [originalStoreReStart, setOriginalStoreReStart] = useState(
    store.storeReStart
  );
  const [originalStoreReEnd, setOriginalStoreReEnd] = useState(
    store.storeReEnd
  );
  const [originalBreakTimeStart, setOriginalBreakTimeStart] = useState(
    store.breakTimeStart
  );
  const [originalBreakTimeEnd, setOriginalBreakTimeEnd] = useState(
    store.breakTimeEnd
  );
  const [originalDeposit, setOriginalDeposit] = useState(store.deposit);
  const [originalSeatCapacity, setOriginalSeatCapacity] = useState(
    store.seatCapacity
  );
  const [originalSeatAmount, setOriginalSeatAmount] = useState(
    store.seatAmount
  );

  return (
    <div className="storeUpdate-main">
      {/* section */}
      <div className="top-section">
        <div className="info-card">
          <table className="storeUpdate-table">
            <tbody className="storeUpdate-tbody">
              <tr className="storeUpdate-tr img-tr">
                <th className="storeUpdate-th img-th" colSpan={2}>
                  <div className="storeUpdate-imgDiv-zone">
                    {/* 이미지 미리보기 */}
                    {storeSiFilepathList.length > 0 &&
                      storeSiFilepathList.map((image, index) => (
                        <div key={index} className="storeUpdate-imgContainer">
                          <img
                            className="storeUpdate-img"
                            src={`${backServer}/store/${image.siFilepath}`}
                            alt={`Existing Preview ${index}`}
                          />
                          <button
                            className="remove-button"
                            onClick={() => {
                              removeExistingImage(index, image.siFileNo); // siFileNo 전달
                            }}
                          >
                            X
                          </button>
                        </div>
                      ))}

                    {/* 새로 추가된 이미지 미리보기 */}
                    {storeImage.length > 0 &&
                      storeImage.map((image, index) => (
                        <div key={index} className="storeUpdate-imgContainer">
                          <img
                            className="storeUpdate-img"
                            src={image}
                            alt={`New Preview ${index}`}
                          />
                          <button
                            className="remove-button"
                            onClick={() => removeNewImage(index)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="storeUpdate-div">
                    <label htmlFor="storeFile" className="storeUpdate-label">
                      파일 선택
                    </label>
                    <input
                      type="file"
                      id="storeFile"
                      onChange={changeStoreThumbnail}
                      multiple
                      accept="image/*"
                      style={{ display: "none" }} //input 숨김
                    ></input>
                  </div>
                </th>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeName" className="storeUpdate-label">
                    매장 상호명
                  </label>
                </th>
                <td>
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storeName"
                      name="storeName"
                      value={store.storeName}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storePhone" className="storeUpdate-label">
                    매장 전화번호
                  </label>
                </th>
                <td>
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storePhone"
                      name="storePhone"
                      value={store.storePhone}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeIntroduce" className="storeUpdate-label">
                    매장 소개
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <textarea
                      className="storeUpdate-textarea"
                      id="storeIntroduce"
                      name="storeIntroduce"
                      value={store.storeIntroduce}
                      onChange={changeStore}
                    ></textarea>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeAddr" className="storeUpdate-label">
                    매장 위치
                  </label>
                </th>
                <td>
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storeAddr"
                      name="storeAddr"
                      value={store.storeAddr}
                      readOnly
                    ></input>
                  </div>
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storeAddrDetail"
                      name="storeAddrDetail"
                      value={store.storeDetailAddr}
                      onChange={changeStore}
                      placeholder="상세 주소를 입력해주세요."
                    ></input>
                    <button
                      className="storeUpdate-btn"
                      type="button"
                      onClick={toggleHandler}
                    >
                      우편번호 찾기
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeTime" className="storeUpdate-label">
                    영업 시간
                  </label>
                </th>
                <td>
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storeTime"
                      name="storeTime"
                      value={store.storeTime}
                      onChange={changeStore}
                      placeholder="ex) 09:00 - 22:00"
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeReTime" className="storeUpdate-label">
                    예약 가능 시작 시간
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storeReStart"
                      name="storeReStart"
                      value={store.storeReStart}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeReTime" className="storeUpdate-label">
                    예약 가능 마감 시간
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="storeReEnd"
                      name="storeReEnd"
                      value={store.storeReEnd}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="breakTime" className="storeUpdate-label">
                    브레이크 타임 시작
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="breakTimeStart"
                      name="breakTimeStart"
                      value={store.breakTimeStart}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="breakTime" className="storeUpdate-label">
                    브레이크 타임 마감
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="breakTimeEnd"
                      name="breakTimeEnd"
                      value={store.breakTimeEnd}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="deposit" className="storeUpdate-label">
                    예약금
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="deposit"
                      name="deposit"
                      value={store.deposit}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="seatCapacity" className="storeUpdate-label">
                    좌석 수용 인원
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="seatCapacity"
                      name="seatCapacity"
                      value={seat.seatCapacity}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="seatAmount" className="storeUpdate-label">
                    총 좌석 수
                  </label>
                </th>
                <td className="storeUpdate-td">
                  <div className="storeUpdate-div">
                    <input
                      className="storeUpdate-inputBox"
                      type="text"
                      id="seatAmount"
                      name="seatAmount"
                      value={seat.seatAmount}
                      onChange={changeStore}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr className="storePartnership-tr">
                <th className="storePartnership-th">
                  <label
                    htmlFor="storeClass"
                    className="storePartnership-label"
                  >
                    매장 유형
                  </label>
                </th>
                <td>
                  <div className="storePartnership-div">
                    <SelectMUI
                      value={store.storeClass}
                      onChange={handleChange}
                    />
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeMood" className="storeUpdate-label">
                    매장 분위기
                  </label>
                </th>
                <td>
                  <div className="storeUpdate-div">
                    <StoreMoodCheckBoxMUI setStoreMood={setStoreMood} />
                  </div>
                </td>
              </tr>
              <tr className="storeUpdate-tr">
                <th className="storeUpdate-th">
                  <label htmlFor="storeAmenities" className="storeUpdate-label">
                    편의 시설
                  </label>
                </th>
                <td>
                  <div className="storeUpdate-div">
                    <StoreAmenitiesCheckBoxMUI
                      setStoreAmenities={setStoreAmenities}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* PostCodeApi 모달을 상태에 따라 열고 닫기 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <PostCodeApi setStore={setStore} setIsModalOpen={setIsModalOpen} />
            <button className="modal-close" onClick={toggleHandler}>
              닫기
            </button>
          </div>
        </div>
      )}
      <div className="storeUpdate-modifyBtn-zone">
        <button
          type="submit"
          className="storeUpdate-modify-btn"
          onClick={storeModify}
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default StoreUpdate;
