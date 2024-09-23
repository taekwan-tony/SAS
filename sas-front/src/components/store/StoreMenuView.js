import { useState } from "react";
import "./storeMenuView.css";

const StoreMenuView = () => {
  const [storeMenu, setStoreMenu] = useState({
    menuName: "",
    menuInfo: "",
    menuPrice: "",
  });

  const [addMenu, setAddMenu] = useState([
    { menuName: "", menuInfo: "", menuPrice: "" }, // 기본적으로 하나의 빈 메뉴를 추가
  ]);

  const changeStoreMenu = (e) => {
    const name = e.target.name;
    setStoreMenu({ ...storeMenu, [name]: e.target.value });
  };

  const [storeThumb, setStoreThumb] = useState("");
  //미리보기
  const [storeMenuImage, setStoreMenuImage] = useState(null);

  // info-card 가 보이는지 여부를 관리하는 상태
  const [infoCardVisible, setInfoCardVisible] = useState(true);

  // X 아이콘 클릭 시 info-card를 숨기는 함수
  const hideInfoCard = (index) => {
    setAddMenu((prevMenus) => prevMenus.filter((menu, i) => i !== index));
    setInfoCardVisible(false);
  };

  // 메뉴 추가 시 새로운 메뉴를 storeMenus 배열에 추가하는 함수
  const addStoreMenu = () => {
    setAddMenu([...addMenu, storeMenu]);
    setStoreMenu({ menuName: "", menuInfo: "", menuPrice: "" }); // 입력칸 초기화
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

        <div className="top-section">
          {/* infoCardVisible이 true일 때만 info-card 렌더링 */}
          {addMenu.map((menu, index) => (
            <div className="info-card">
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
                        <button className="storeMenuView-storeMenuImg-btn">
                          메뉴 사진 등록
                        </button>
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
          <div className="storeMenuView-insert-btn-zone">
            <button className="storeMenuView-insert-btn" onClick={addStoreMenu}>
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
