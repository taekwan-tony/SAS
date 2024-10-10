import axios from "axios";
import { useRef } from "react";
import Swal from "sweetalert2";

const StoreMenuList = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const menu = props.menu;
  const index = props.index;
  const storeMenuList = props.storeMenuList;
  const setStoreMenuList = props.setStoreMenuList;
  const setCheck = props.setCheck;
  const changeStoreThumbnail = props.changeStoreThumbnail;

  const menuNameRef = useRef(null);
  const menuInfoRef = useRef(null);
  const menuPriceRef = useRef(null);

  // 정규 표현식
  const menuNameRegex = /^([가-힣\s]{0,20}|[a-zA-Z\s]{0,60})$/;
  const menuInfoRegex = /^([가-힣\s]{0,40}|[a-zA-Z\s]{0,120})$/;
  const menuPriceRegex = /^[0-9]*$/;

  const modifyMenu = (field, value) => {
    if (field === "menuName") {
      if (!menuNameRegex.test(value)) {
        menuNameRef.current.textContent =
          "메뉴 이름은 한글 20자 이하, 영어 60자 이하로 입력해주세요.";
      } else {
        menuNameRef.current.textContent = ""; // 검증 통과 시 메시지 제거
      }
    }

    if (field === "menuInfo") {
      if (!menuInfoRegex.test(value)) {
        menuInfoRef.current.textContent =
          "메뉴 설명은 한글 40자 이하, 영어 120자 이하로 입력해주세요.";
      } else {
        menuInfoRef.current.textContent = ""; // 검증 통과 시 메시지 제거
      }
    }

    if (field === "menuPrice") {
      if (!menuPriceRegex.test(value)) {
        menuPriceRef.current.textContent = "숫자만 입력해주세요.";
      } else {
        menuPriceRef.current.textContent = ""; // 검증 통과 시 메시지 제거
      }
    }

    const updatedMenu = { ...menu, [field]: value };
    const updatedStoreMenuList = [...storeMenuList];
    updatedStoreMenuList[index] = updatedMenu;
    setStoreMenuList(updatedStoreMenuList); // 업데이트된 메뉴 리스트 상태로 저장
  };

  const deleteMenu = () => {
    Swal.fire({
      title: "메뉴를 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#518142",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${backServer}/menu/deleteStoreMenu/${menu.menuNo}`)
          .then((res) => {
            console.log(res);
            setCheck(storeMenuList.length + 1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="storeMenuView-info-card">
      <div className="storeMenuView-close-div">
        <img
          className="storeMenuView-close"
          src="/image/close.icon.png"
          onClick={deleteMenu}
          alt="close"
        />
      </div>
      <table className="storeMenuView-table">
        <tbody className="storeMenuView-tbody">
          <tr>
            <td className="storeMenuView-td storeMenuView-img-td" rowSpan={4}>
              <div className="storeMenuView-imgdiv-zone">
                <div className="storeMenuView-imgDiv">
                  {props.type === 1 ? (
                    <img
                      className="storeMenuView-img"
                      src={
                        menu.menuPhoto.startsWith("data:image")
                          ? menu.menuPhoto
                          : `${backServer}/store/storeMenu/${menu.menuPhoto}`
                      }
                      alt="메뉴 사진"
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
                <label htmlFor="menuPhoto" className="storeMenu-img-label">
                  파일 선택
                </label>
                <input
                  className="storeMenuView-inputBox"
                  type="file"
                  id="menuPhoto"
                  name="menuPhoto"
                  onChange={changeStoreThumbnail(1, index)}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
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
                value={menu.menuName}
                onChange={(e) => modifyMenu("menuName", e.target.value)}
              />
              <p className="menu-p" ref={menuNameRef}></p>
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
                value={menu.menuInfo}
                onChange={(e) => modifyMenu("menuInfo", e.target.value)}
              />
              <p className="menu-p" ref={menuInfoRef}></p>
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
                value={menu.menuPrice}
                onChange={(e) => modifyMenu("menuPrice", e.target.value)}
              />
              <p className="menu-p" ref={menuPriceRef}></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StoreMenuList;
