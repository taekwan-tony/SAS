import "./default.css"; //기본 색, 폰트 변수
import { Route, Routes } from "react-router-dom";
import LoginMain from "./components/user/LoginMain";
import Main from "./components/main/Main";
import Join from "./components/user/Join";
import Error404 from "./components/main/Error404";
import Error500 from "./components/main/Error500";
import Loading from "./components/store/Loading";
import UserMain from "./components/user/UserMain";
import AdminMain from "./components/admin/AdminMain";
import MenuView from "./components/menu/MenuView";
import StoreRegist from "./components/store/StoreRegist";
import StoreMain from "./components/store/StoreMain";
import ManageReserved from "./components/store/ManageReserved";
import ManageReview from "./components/store/ManageReview";
import StorePartnership from "./components/store/StorePartnership";
import StoreCheckMain from "./components/store/StoreCheckMain";
import Ownerstatistics from "./components/ownerstatistics/OwnerStatistics";
import StoreLogin from "./components/store/StoreLogin";
import ReservationMain from "./components/reservation/ReservationMain";
import ScrollToTop from "./components/utils/ScrollToTop";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* 확인용-수진;예약 창 생기면 옮기겠슴다 */}

        {/* 답변: ㅇㅋ */}
        <Route path="/storeLogin" element={<StoreLogin />} />
        <Route path="/storemain" element={<StoreMain />} />
        <Route path="/usermain/*" element={<UserMain />} />
        <Route
          path="/storemain/ownerstatistics"
          element={<Ownerstatistics />}
        />
        <Route path="/storemain/managereview" element={<ManageReview />} />
        <Route path="/storemain/managereserved" element={<ManageReserved />} />
        <Route path="/admin/*" element={<AdminMain />} />
        <Route path="/storecheck/*" element={<StoreCheckMain />} />
        <Route path="/Error404" element={<Error404 />} />
        <Route path="/Error500" element={<Error500 />} />
        <Route path="/Loading" element={<Loading />} />
      </Routes>
    </div>
  );
}

export default App;
