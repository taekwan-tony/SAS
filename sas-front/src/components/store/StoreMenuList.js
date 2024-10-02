import axios from "axios";
import { useState } from "react";

const StoreMenuList = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [isInfoDiv, setIsInfoDiv] = useState(true);
  const menu = props.menu;
  const index = props.index;
  const storeMenu = props.storeMenu;
  const setStoreMenu = props.setStoreMenu;
  const storeMenuList = props.storeMenuList;
  const hideInfoCard = props.hideInfoCard;
  const type = props.type;
  const loginStoreNo = props.loginStoreNo;

  console.log("리스트 매장 정보 : ", menu);

  const deleteMenu = () => {
    axios
      .delete(`${backServer}/menu/deleteStoreMenu/${menu.menuNo}`)
      .then((res) => {
        console.log(res);
        const deleteMenuDiv = storeMenuList.filter((_, i) => i !== index);
        setStoreMenu(deleteMenuDiv);
        setIsInfoDiv(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // info-card가 보이는 상태인지 확인
  if (!isInfoDiv) return null;

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
                      src={`${backServer}/store/storeMenu/${menu.menuPhoto}`}
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
              {/* <div className="storeMenuView-btn-zone">
                    <input
                      className="storeMenuView-inputBox"
                      type="file"
                      id="menuPhoto"
                      name="menuPhoto"
                      onChange={changeStoreThumbnail(index)}
                      accept="image/*"
                    ></input>
                  </div> */}
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
                //onChange={setMenuName(index)}
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
                // onChange={changeStoreMenu(index)}
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
                // onChange={changeStoreMenu(index)}
              ></input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StoreMenuList;
