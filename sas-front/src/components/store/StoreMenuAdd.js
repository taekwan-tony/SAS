import { useEffect, useState } from "react";
import "./storeMenuAdd.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  loginStoreIdState,
  loginStoreNoState,
  storeTypeState,
} from "../utils/RecoilData";
import StoreMenuFrm from "./StoreMenuFrm";
import StoreMenuList from "./StoreMenuList";

const StoreMenuView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginStoreNo, setLoginStoreNo] = useRecoilState(loginStoreNoState);
  const [menuThumbnail, setMenuThumbnail] = useState([]); // 메뉴 사진
  const [storeMenuList, setStoreMenuList] = useState([]);
  const [check, setCheck] = useState(0);
  console.log("매장 정보 : ", storeMenuList);
  useEffect(() => {
    console.log(1);
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
  }, [check]);
  const [storeMenu, setStoreMenu] = useState([]);
  console.log("매장 번호  : ", loginStoreNo);
  console.log("메뉴 사진  : ", storeMenu.menuPhoto);
  const changeStoreThumbnail = (index) => (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setStoreMenuImage((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[index] = reader.result;
          return updatedImages;
        });
      };
      setMenuThumbnail((prevThumbnails) => {
        const updatedThumbnails = [...prevThumbnails];
        updatedThumbnails[index] = files[0]; // 각 인덱스에 맞는 파일 저장
        return updatedThumbnails;
      });
    }
  };
  const [addMenu, setAddMenu] = useState([
    { menuName: "", menuInfo: "", menuPrice: "" }, // 기본적으로 하나의 빈 메뉴를 추가
  ]);

  // X 아이콘 클릭 시 특정 메뉴 삭제
  const hideInfoCard = (index) => {
    setStoreMenu((prevMenus) => prevMenus.filter((menu, i) => i !== index));
  };

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
  //미리보기
  const [storeMenuImage, setStoreMenuImage] = useState([]);

  // info-card 가 보이는지 여부를 관리하는 상태
  const [infoCardVisible, setInfoCardVisible] = useState(true);

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

  // 메뉴 추가
  const addStoreMenu = () => {
    storeMenu.forEach((menu, index) => {
      console.log(menu);
      const form = new FormData();
      form.append(`menuName`, menu.menuName);
      form.append(`menuInfo`, menu.menuInfo);
      form.append(`menuPrice`, menu.menuPrice);
      form.append(`storeNo`, menu.storeNo);

      if (menuThumbnail[index]) {
        form.append(`menuThumbnail`, menuThumbnail[index]);
      }
      axios
        .post(`${backServer}/menu/insertStoreMenu/${loginStoreNo}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("메뉴 추가 완료");
          console.log(res);
        })
        .catch((err) => {
          console.log("메뉴 추가 실패");
          console.log(err.response.data);
        });
    });
    setCheck(storeMenuList.length + 1);
    setStoreMenu([]);
    setMenuThumbnail([]);
    setStoreMenuImage([]);
    console.log(storeMenu);

    // for (const [key, value] of form.entries()) {
    //   console.log(key, value);
    // }
  };

  return (
    <>
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>메뉴 등록</h1>
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
                    setCheck={setCheck}
                    type={1}
                  />
                );
              })
            : ""}
          {storeMenu.map((menu, index) => (
            <StoreMenuFrm
              menu={menu}
              index={index}
              //storeMenu={storeMenu}
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
            <button className="storeMenu-menu-btn" onClick={addStoreMenu}>
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

export default StoreMenuView;
