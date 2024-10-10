import { useEffect, useState } from "react";
import "./storeMenuMain.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  loginStoreIdState,
  loginStoreNoState,
  storeTypeState,
} from "../utils/RecoilData";
import StoreMenuList from "./StoreMenuList";
import Swal from "sweetalert2";
import StoreMenuAdd from "./StoreMenuAdd";

const StoreMenuMain = (props) => {
  const setActiveIndex = props.setActiveIndex;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginStoreNo, setLoginStoreNo] = useRecoilState(loginStoreNoState);
  const [menuThumbnail, setMenuThumbnail] = useState([]); // 메뉴 사진
  const [existingMenuThumbnail, setExistingMenuThumbnail] = useState([]); // 기존 메뉴 사진
  const [newMenuThumbnail, setNewMenuThumbnail] = useState([]); // 새로운 메뉴 사진
  const [storeMenuList, setStoreMenuList] = useState([]);
  const [check, setCheck] = useState(0);
  const [storeMenu, setStoreMenu] = useState([]);
  const [addMenu, setAddMenu] = useState([
    { menuName: "", menuInfo: "", menuPrice: "" }, // 기본적으로 하나의 빈 메뉴를 추가
  ]);
  //미리보기
  const [storeMenuImage, setStoreMenuImage] = useState([]);

  // 메뉴 정보 변경 시 storeMenu 배열의 특정 인덱스 메뉴 변경
  const changeStoreMenu = (index) => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStoreMenu((prevStoreMenu) =>
      prevStoreMenu.map((menu, i) =>
        i === index ? { ...menu, [name]: value } : menu
      )
    );
  };

  useEffect(() => {
    setActiveIndex(2);
    axios
      .get(`${backServer}/menu/allMenuList/${loginStoreNo}`)
      .then((res) => {
        setStoreMenuList(res.data);
        setCheck(res.data.length);
      })
      .catch((err) => {});
  }, [check, loginStoreNo]);

  //미리보기
  // 미리보기 및 파일 저장
  const changeStoreThumbnail = (type, index) => (e) => {
    const files = e.target.files;
    console.log(
      `선택된 파일: ${files.length > 0 ? files[0].name : "파일 없음"}`
    ); // 선택된 파일 확인

    if (files.length > 0) {
      const file = files[0]; // 선택한 파일을 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(`파일이 성공적으로 읽혔습니다: ${reader.result}`); // 파일이 읽힌 후 결과 확인

        if (type === 2) {
          // 새로운 메뉴의 미리보기 업데이트
          const updatedStoreMenu = [...storeMenu];
          updatedStoreMenu[index] = {
            ...updatedStoreMenu[index],
            newMenuThumbnail: file, // File 객체로 저장
          };
          console.log("업데이트된 메뉴:", updatedStoreMenu); // 업데이트된 메뉴 확인
          setStoreMenu(updatedStoreMenu);

          // 썸네일 이미지 상태 업데이트 (미리보기용 Base64)
          setStoreMenuImage((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[index] = reader.result; // 미리보기 이미지 업데이트

            console.log("미리보기 이미지가 업데이트된 후:", updatedImages);
            return updatedImages;
          });
        }
      };
      reader.readAsDataURL(file); // 파일을 읽어 미리보기에 표시
    }
  };

  // 기존 메뉴 수정 시 기존 이미지 유지 로직 추가
  const updateStoreMenu = (existingMenus) => {
    storeMenuList.forEach((menu, index) => {
      if (menu.menuNo) {
        const form = new FormData();
        form.append("menuName", menu.menuName);
        form.append("menuInfo", menu.menuInfo);
        form.append("menuPrice", menu.menuPrice);
        form.append("storeNo", menu.storeNo);

        // 새로운 파일이 선택되지 않은 경우 기존 이미지를 그대로 유지
        if (existingMenuThumbnail[index]) {
          form.append("menuThumbnail", existingMenuThumbnail[index]);
        } else if (menu.menuPhoto) {
          // 기존 이미지가 존재할 경우 이를 그대로 서버로 전달
          form.append("existingMenuPhoto", menu.menuPhoto);
        }

        axios
          .patch(`${backServer}/menu/updateStoreMenu/${menu.menuNo}`, form, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            Swal.fire({
              title: "메뉴가 수정되었습니다.",
              icon: "success",
              confirmButtonColor: "#518142",
            });
          })
          .catch((err) => {
            console.error("메뉴 수정 실패:", err);
          });
      }
    });
  };

  // X 아이콘 클릭 시 특정 메뉴 삭제
  const hideInfoCard = (index) => {
    setStoreMenu((prevMenus) => prevMenus.filter((menu, i) => i !== index));
  };

  // 메뉴 추가 시 새로운 메뉴를 storeMenu 배열에 추가하는 함수
  const addStoreMenuDIV = () => {
    setStoreMenu((prevStoreMenu) => [
      ...prevStoreMenu,
      {
        menuName: "",
        menuInfo: "",
        menuPrice: "",
        storeNo: loginStoreNo,
        menuPhoto: "",
      },
    ]);

    setStoreMenuImage((prevImages) => [...prevImages, null]);
    setMenuThumbnail((prevThumbnails) => [...prevThumbnails, null]);
  };

  // 새로운 메뉴인지 수정할 메뉴인지 확인
  const handleMenuSave = () => {
    // 새로운 메뉴만 처리
    const newMenus = storeMenu.filter((menu) => !menu.menuNo); // menuNo가 없는 새로운 메뉴만 필터링

    if (newMenus.length > 0) {
      addStoreMenu(newMenus); // 새로운 메뉴 추가
    }

    // 기존 메뉴 수정 처리
    const existingMenus = storeMenu.filter((menu) => menu.menuNo); // 기존 메뉴는 menuNo가 있는 경우
    if (existingMenus.length > 0) {
      updateStoreMenu(existingMenus); // 기존 메뉴 수정
    }

    if (newMenus.length === 0 && existingMenus.length === 0) {
    }
  };

  // 메뉴 추가
  const addStoreMenu = (newMenus) => {
    newMenus.forEach((menu, index) => {
      const form = new FormData();
      form.append(`menuName`, menu.menuName);
      form.append(`menuInfo`, menu.menuInfo);
      form.append(`menuPrice`, menu.menuPrice);
      form.append(`storeNo`, menu.storeNo);

      if (menu.newMenuThumbnail) {
        form.append(`menuThumbnail`, menu.newMenuThumbnail);
      }

      // 실제 전송 로직
      axios
        .post(`${backServer}/menu/insertStoreMenu/${loginStoreNo}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          Swal.fire({
            title: "완료되었습니다.",
            icon: "success",
            confirmButtonColor: "#518142",
          });
          setCheck(storeMenuList.length + 1); // 상태 업데이트
        })
        .catch((err) => {});
    });

    // 상태 초기화
    setStoreMenu([]);
    setNewMenuThumbnail([]);
    setStoreMenuImage([]);
  };

  return (
    <>
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>메뉴 관리</h1>
          <Link to="/storecheck/storeNoticeList">
            <button className="button-bell">
              <div className="user-box-bell">
                <div className="user-page-box">
                  <div className="bellWrapper">
                    <i className="fas fa-bell my-bell"></i>
                  </div>

                  <div className="circle first"></div>
                  <div className="circle second"></div>
                  <div className="circle third"></div>
                </div>
              </div>
            </button>
          </Link>
        </header>
      </div>
      <div className="dashboard">
        <div className="owner-background">
          <img src="/image/200.jpg" alt="back" />
        </div>

        <div className="storeMenuView-top-section">
          {/* infoCardVisible이 true일 때만 info-card 렌더링 */}
          {storeMenuList
            ? storeMenuList.map((menu, index) => {
                return (
                  <StoreMenuList
                    key={"menu-" + index}
                    menu={menu}
                    index={index}
                    setStoreMenu={setStoreMenu}
                    storeMenuList={storeMenuList}
                    setStoreMenuList={setStoreMenuList}
                    setCheck={setCheck}
                    type={1}
                    changeStoreThumbnail={changeStoreThumbnail}
                  />
                );
              })
            : ""}
          {storeMenu.map((menu, index) => (
            <StoreMenuAdd
              menu={menu}
              index={index}
              storeMenu={storeMenu}
              setStoreMenu={setStoreMenu}
              storeMenuImage={storeMenuImage}
              setStoreMenuImage={setStoreMenuImage}
              setMenuThumbnail={setMenuThumbnail}
              hideInfoCard={hideInfoCard}
              changeStoreMenu={changeStoreMenu}
              changeStoreThumbnail={changeStoreThumbnail}
              type={2}
            />
          ))}
        </div>
        <div className="storeMenuView-insert">
          <div className="storeMenuView-menu-btn-zone">
            <button className="storeMenu-menu-btn" onClick={handleMenuSave}>
              완료
            </button>
          </div>
          <div className="storeMenuView-insert-btn-zone">
            <button
              className="storeMenuView-insert-btn"
              onClick={addStoreMenuDIV}
            >
              <img
                src="/image/add.png"
                className="storeMenuView-add"
                alt="추가"
              ></img>
              메뉴 추가
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreMenuMain;
