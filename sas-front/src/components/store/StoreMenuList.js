import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const StoreMenuList = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const menu = props.menu;
  const index = props.index;
  const storeMenu = props.storeMenu;
  const setStoreMenu = props.setStoreMenu;
  const storeMenuList = props.storeMenuList;
  const setStoreMenuList = props.setStoreMenuList;
  const hideInfoCard = props.hideInfoCard;
  const type = props.type;
  const loginStoreNo = props.loginStoreNo;
  const setCheck = props.setCheck;
  const changeStoreThumbnail = props.changeStoreThumbnail;

  console.log("리스트 매장 정보 : ", menu);

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

  //메뉴 수정
  const modifyMenu = (field, value) => {
    const updatedMenu = { ...menu, [field]: value };
    const updatedStoreMenuList = [...storeMenuList];
    updatedStoreMenuList[index] = updatedMenu; // 메뉴 리스트에서 해당 메뉴를 업데이트
    setStoreMenuList(updatedStoreMenuList); // 업데이트된 메뉴 리스트를 상태로 저장
  };

  return (
    <div className="storeMenuView-info-card">
      <div className="storeMenuView-close-div">
        {/* X 버튼 클릭 시 메뉴 삭제 */}
        <img
          className="storeMenuView-close"
          src="/image/close.icon.png"
          onClick={deleteMenu}
          alt="close"
        ></img>
      </div>
      <table className="storeMenuView-table">
        <tbody className="storeMenuView-tbody">
          <tr>
            <td className="storeMenuView-td storeMenuView-img-td" rowSpan={4}>
              <div className="storeMenuView-imgdiv-zone">
                <div className="storeMenuView-imgDiv">
                  {type == 1 ? (
                    <img
                      className="storeMenuView-img"
                      src={
                        menu.menuPhoto.startsWith("data:image")
                          ? menu.menuPhoto // base64 이미지
                          : `${backServer}/store/storeMenu/${menu.menuPhoto}`
                      } // 서버 이미지
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
                <input
                  className="storeMenuView-inputBox"
                  type="file"
                  id="menuPhoto"
                  name="menuPhoto"
                  onChange={changeStoreThumbnail(1, index)}
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
                value={menu.menuName}
                onChange={(e) => modifyMenu("menuName", e.target.value)}
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
                value={menu.menuInfo}
                onChange={(e) => modifyMenu("menuInfo", e.target.value)}
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
                value={menu.menuPrice}
                onChange={(e) => modifyMenu("menuPrice", e.target.value)}
              ></input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StoreMenuList;
