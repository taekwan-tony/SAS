import { useState } from "react";
import "./storeMenuView.css";

const StoreMenuView = () => {
  const [storeMenu, setStoreMenu] = useState({
    menuName: "",
    menuInfo: "",
    menuPrice: "",
  });

  const changeStoreMenu = (e) => {
    const name = e.target.name;
    setStoreMenu({ ...storeMenu, [name]: e.target.value });
  };

  const [storeThumb, setStoreThumb] = useState("");
  //미리보기
  const [storeMenuImage, setStoreMenuImage] = useState(null);

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

        <div className="top-section">
          <div className="info-card">
            <table className="storeMenuView-table">
              <tbody className="storeMenuView-tbody">
                <tr className="storeMenuView-tr">
                  <td
                    className="storeMenuView-td storeMenuView-img-td"
                    rowSpan={3}
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
                      <button className="storeMenuView-storeMenuImg-btn">
                        메뉴 사진 등록
                      </button>
                    </div>
                  </td>
                  <td className="storeMenuView-td">
                    <label className="storeMenuView-th">메뉴명</label>
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
                    <label className="storeMenuView-th">세부 설명</label>
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
                    <label className="storeMenuView-th">가격</label>
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
        </div>
      </div>
    </>
  );
};

export default StoreMenuView;
