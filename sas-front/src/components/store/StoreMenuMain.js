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

const StoreMenuMain = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
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

  // info-card 가 보이는지 여부를 관리하는 상태
  const [infoCardVisible, setInfoCardVisible] = useState(true);

  // 메뉴 정보 변경 시 storeMenu 배열의 특정 인덱스 메뉴 변경
  const changeStoreMenu = (index) => (e) => {
    console.log(e);
    console.log(index);
    const name = e.target.name;
    const value = e.target.value;
    setStoreMenu((prevStoreMenu) =>
      prevStoreMenu.map((menu, i) =>
        i === index ? { ...menu, [name]: value } : menu
      )
    );
  };

  useEffect(() => {
    axios
      .get(`${backServer}/menu/allMenuList/${loginStoreNo}`)
      .then((res) => {
        console.log(res.data.length);
        setStoreMenuList(res.data);
        setCheck(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [check, loginStoreNo]);

  //미리보기
  const changeStoreThumbnail = (type, index) => (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 1) {
          // 기존 메뉴의 미리보기 업데이트
          const updatedStoreMenuList = [...storeMenuList];
          updatedStoreMenuList[index] = {
            ...updatedStoreMenuList[index],
            menuPhoto: reader.result, // 새로운 이미지로 교체
          };
          setStoreMenuList(updatedStoreMenuList); // 상태 업데이트

          // 기존 메뉴 썸네일 업데이트
          setExistingMenuThumbnail((prevThumbnails) => {
            const updatedThumbnails = [...prevThumbnails];
            updatedThumbnails[index] = files[0];
            return updatedThumbnails;
          });
        } else if (type === 2) {
          // 새로운 메뉴의 미리보기 업데이트
          const updatedStoreMenu = [...storeMenu];
          updatedStoreMenu[index] = {
            ...updatedStoreMenu[index],
            menuPhoto: reader.result, // 새로운 이미지로 교체
          };
          setStoreMenu(updatedStoreMenu); // 상태 업데이트
          setStoreMenu(updatedStoreMenu);

          // 새로운 메뉴 썸네일 업데이트
          setNewMenuThumbnail((prevThumbnails) => {
            const updatedThumbnails = [...prevThumbnails];
            updatedThumbnails[index] = files[0];
            return updatedThumbnails;
          });

          setStoreMenuImage((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[index] = reader.result; // 미리보기 이미지 저장
            updatedImages[index] = reader.result;
            return updatedImages;
          });
        }
      };
      reader.readAsDataURL(files[0]); // 파일을 읽기 시작
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

        // 새로운 파일이 선택되지 않으면 기존 이미지 그대로 사용
        if (existingMenuThumbnail[index]) {
          form.append("menuThumbnail", existingMenuThumbnail[index]);
        } else {
          // 기존 이미지가 있으면 기존 이미지를 사용
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
    // 새로운 메뉴와 기존 메뉴를 각각 처리
    const newMenus = storeMenu.filter((menu) => !menu.menuNo); // menuNo가 없는 새로운 메뉴
    const existingMenus = storeMenuList.filter((menu) => menu.menuNo); // menuNo가 있는 기존 메뉴

    if (newMenus.length > 0) {
      addStoreMenu(newMenus); // 새로운 메뉴 추가
    }

    if (existingMenus.length > 0) {
      updateStoreMenu(existingMenus); // 기존 메뉴 수정
    }
  };

  // 메뉴 추가
  const addStoreMenu = (newMenus) => {
    storeMenu.forEach((menu, index) => {
      if (!menu.menuNo) {
        const form = new FormData();
        form.append(`menuName`, menu.menuName);
        form.append(`menuInfo`, menu.menuInfo);
        form.append(`menuPrice`, menu.menuPrice);
        form.append(`storeNo`, menu.storeNo);

        if (newMenuThumbnail[index]) {
          form.append(`menuThumbnail`, newMenuThumbnail[index]);
        }

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
            setCheck(storeMenuList.length + 1);
          })
          .catch((err) => {
            console.log("메뉴 추가 실패");
          });
      }
    });
    setStoreMenu([]);
    setNewMenuThumbnail([]);
    setStoreMenuImage([]);
  };

  // //메뉴 수정
  // const updateStoreMenu = (existingMenus) => {
  //   storeMenuList.forEach((menu, index) => {
  //     if (menu.menuNo) {
  //       const form = new FormData();
  //       form.append("menuName", menu.menuName);
  //       form.append("menuInfo", menu.menuInfo);
  //       form.append("menuPrice", menu.menuPrice);
  //       form.append("storeNo", menu.storeNo);
  // // //메뉴 수정
  // // const updateStoreMenu = (existingMenus) => {
  // //   storeMenuList.forEach((menu, index) => {
  // //     if (menu.menuNo) {
  // //       const form = new FormData();
  // //       form.append("menuName", menu.menuName);
  // //       form.append("menuInfo", menu.menuInfo);
  // //       form.append("menuPrice", menu.menuPrice);
  // //       form.append("storeNo", menu.storeNo);

  //       if (existingMenuThumbnail[index]) {
  //         form.append("menuThumbnail", existingMenuThumbnail[index]);
  //       }
  // //       if (existingMenuThumbnail[index]) {
  // //         form.append("menuThumbnail", existingMenuThumbnail[index]);
  // //       }

  //       axios
  //         .patch(`${backServer}/menu/updateStoreMenu/${menu.menuNo}`, form, {
  //           headers: { "Content-Type": "multipart/form-data" },
  //         })
  //         .then((res) => {
  //           Swal.fire({
  //             title: "메뉴가 수정되었습니다.",
  //             icon: "success",
  //             confirmButtonColor: "#518142",
  //           });
  //         })
  //         .catch((err) => {
  //           console.error("메뉴 수정 실패:", err);
  //         });
  //     }
  //   });
  // };
  //       axios
  //         .patch(`${backServer}/menu/updateStoreMenu/${menu.menuNo}`, form, {
  //           headers: { "Content-Type": "multipart/form-data" },
  //         })
  //         .then((res) => {
  //           Swal.fire({
  //             title: "메뉴가 수정되었습니다.",
  //             icon: "success",
  //             confirmButtonColor: "#518142",
  //           });
  //         })
  //         .catch((err) => {
  //           console.error("메뉴 수정 실패:", err);
  //         });
  //     }
  //   });
  // };

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
              setCheck={setCheck}
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
