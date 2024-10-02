import { useEffect, useState } from "react";
import "./storeMenuView.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginStoreIdState, storeTypeState } from "../utils/RecoilData";

const StoreMenuView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginSoEMail, setLoginSoEmail] = useRecoilState(loginStoreIdState);
  const [storeType, setStoreType] = useRecoilState(storeTypeState);
  const [storeNumber, setStoreNumber] = useState(null); // 상태로 관리

  useEffect(() => {
    storeRefreshLogin();
    const interval = window.setInterval(storeRefreshLogin, 60 * 60 * 1000); // 한 시간

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  const storeRefreshLogin = () => {
    const storeRefreshToken = window.localStorage.getItem("storeRefreshToken");
    if (storeRefreshToken != null) {
      axios.defaults.headers.common["Authorization"] = storeRefreshToken;
      axios
        .post(`${backServer}/store/storeRefresh`)
        .then((res) => {
          setLoginSoEmail(res.data.soEmail);
          setStoreType(res.data.storeType);
          console.log("storeNo :", res.data.storeNo); // storeNo 값 출력
          setStoreNumber(res.data.storeNo); // storeNumber 상태 업데이트
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem(
            "storeRefreshToken",
            res.data.refreshToken
          );
        })
        .catch((err) => {
          console.log(err);
          setLoginSoEmail("");
          setStoreType(2);
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("storeRefreshToken");
        });
    }
  };
  const [storeMenu, setStoreMenu] = useState({
    menuName: "",
    menuInfo: "",
    menuPrice: "",
    storeNo: null,
  });

  useEffect(() => {
    if (storeNumber !== null) {
      setStoreMenu((prevStoreMenu) => ({
        ...prevStoreMenu,
        storeNo: storeNumber, // storeNumber가 바뀔 때 storeNo 업데이트
      }));
    }
  }, [storeNumber]);

  const [menuThumbnail, setMenuThumbnail] = useState(null); // 메뉴 사진

  console.log("매장 번호  : ", storeMenu.storeNo);
  console.log("메뉴 사진  : ", storeMenu.menuPhoto);

  const [addMenu, setAddMenu] = useState([
    { menuName: "", menuInfo: "", menuPrice: "" }, // 기본적으로 하나의 빈 메뉴를 추가
  ]);

  const changeStoreMenu = (e) => {
    const name = e.target.name;
    setStoreMenu({ ...storeMenu, [name]: e.target.value });
  };

  //미리보기
  const [storeMenuImage, setStoreMenuImage] = useState(null);

  //메뉴 썸네일 이미지 첨부파일 변경 시 동작 함수
  const changeStoreThumbnail = (e) => {
    const files = e.currentTarget.files;
    const { value } = e.target;
    setStoreMenu((prevStoreMenu) => ({
      ...prevStoreMenu,
      menuPhoto: value,
    }));

    if (files.length !== 0 && files[0] !== 0) {
      setMenuThumbnail(files[0]);

      // 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setStoreMenuImage(reader.result);
      };
    } else {
      setMenuThumbnail(null);
      setStoreMenuImage(null);
    }
  };

  // info-card 가 보이는지 여부를 관리하는 상태
  const [infoCardVisible, setInfoCardVisible] = useState(true);

  // X 아이콘 클릭 시 info-card를 숨기는 함수
  const hideInfoCard = (index) => {
    setAddMenu((prevMenus) => prevMenus.filter((menu, i) => i !== index));
    setInfoCardVisible(false);
  };

  // 메뉴 추가 시 새로운 메뉴를 storeMenus 배열에 추가하는 함수
  const addStoreMenuDIV = () => {
    setAddMenu([...addMenu, storeMenu]);
    setStoreMenu({
      menuName: "",
      menuInfo: "",
      menuPrice: "",
    }); // 입력칸 초기화
  };

  //메뉴 추가
  const addStoreMenu = () => {
    const form = new FormData();
    form.append("menuName", storeMenu.menuName);
    form.append("menuInfo", storeMenu.menuInfo);
    form.append("menuPrice", storeMenu.menuPrice);
    form.append("menuThumbnail", menuThumbnail); // 파일은 menuThumbnail로 추가

    axios
      .post(`${backServer}/menu/insertStoreMenu/${storeMenu.storeNo}`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        console.log("메뉴 추가 완료");
        console.log(res);
      })
      .catch((err) => {
        console.log("메뉴 추가 실패");
        console.log(err);
      });
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
          {addMenu.map((menu, index) => (
            <div className="storeMenuView-info-card">
              <div className="storeMenuView-close-div">
                {/* X 버튼 클릭 시 hideInfoCard 호출 */}
                <img
                  className="storeMenuView-close"
                  src="/image/close.icon.png"
                  onClick={() => hideInfoCard(index)} // 클릭 이벤트 핸들러 추가
                  alt="close"
                ></img>
              </div>
              <table className="storeMenuView-table">
                <tbody className="storeMenuView-tbody">
                  <tr>
                    <td
                      className="storeMenuView-td storeMenuView-img-td"
                      rowSpan={4}
                    >
                      <div className="storeMenuView-imgdiv-zone">
                        <div className="storeMenuView-imgDiv">
                          {storeMenuImage ? (
                            <img
                              className="storeMenuView-img"
                              src={storeMenuImage}
                            />
                          ) : (
                            <img
                              className="storeMenuView-img"
                              src="/image/s&s로고.png"
                              alt="Default"
                            />
                          )}
                        </div>
                      </div>
                      <div className="storeMenuView-btn-zone">
                        <input
                          className="storeMenuView-inputBox"
                          type="file"
                          id="menuPhoto"
                          name="menuPhoto"
                          value={storeMenu.menuPhoto}
                          onChange={changeStoreThumbnail}
                          accept="image/*"
                        ></input>
                      </div>
                      <div className="storeMenuView-div"></div>
                    </td>
                  </tr>
                  <tr className="storeMenuView-tr">
                    <td className="storeMenuView-td">
                      <label className="storeMenuView-label">메뉴명</label>
                      <input
                        className="storeMenuView-inputBox"
                        type="text"
                        id="menuName"
                        name="menuName"
                        value={storeMenu.menuName}
                        onChange={changeStoreMenu}
                      ></input>
                    </td>
                  </tr>
                  <tr className="storeMenuView-tr">
                    <td className="storeMenuView-td">
                      <label className="storeMenuView-label">세부 설명</label>
                      <input
                        className="storeMenuView-inputBox"
                        type="text"
                        id="menuInfo"
                        name="menuInfo"
                        value={storeMenu.menuInfo}
                        onChange={changeStoreMenu}
                      ></input>
                    </td>
                  </tr>
                  <tr className="storeMenuView-tr">
                    <td className="storeMenuView-td">
                      <label className="storeMenuView-label">가격</label>
                      <input
                        className="storeMenuView-inputBox"
                        type="text"
                        id="menuPrice"
                        name="menuPrice"
                        value={storeMenu.menuPrice}
                        onChange={changeStoreMenu}
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
              <img src="/image/add.png" className="storeMenuView-add"></img>
              메뉴 추가
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreMenuView;
