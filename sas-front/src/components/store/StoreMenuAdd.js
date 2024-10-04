import { useState } from "react";

const StoreMenuAdd = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const menu = props.menu;
  const index = props.index;
  const storeMenu = props.storeMenu;
  const setStoreMenu = props.setStoreMenu;
  const storeMenuImage = props.storeMenuImage;
  const setStoreMenuImage = props.setStoreMenuImage;
  const setMenuThumbnail = props.setMenuThumbnail;
  const hideInfoCard = props.hideInfoCard;
  const changeStoreMenu = props.changeStoreMenu;
  const changeStoreThumbnail = props.changeStoreThumbnail;
  const type = props.type;

  return (
    <>
      <div className="storeMenuView-info-card">
        <div className="storeMenuView-close-div">
          {/* X 버튼 클릭 시 메뉴 삭제 */}
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
              <td className="storeMenuView-td storeMenuView-img-td" rowSpan={4}>
                <div className="storeMenuView-imgdiv-zone">
                  <div className="storeMenuView-imgDiv">
                    {storeMenuImage[index] ? (
                      <img
                        className="storeMenuView-img"
                        src={storeMenuImage[index]}
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
                    onChange={changeStoreThumbnail(2, index)}
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
                  onChange={changeStoreMenu(index)}
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
                  onChange={changeStoreMenu(index)}
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
                  onChange={changeStoreMenu(index)}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StoreMenuAdd;
