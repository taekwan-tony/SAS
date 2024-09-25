import { useRecoilState } from "recoil";
import { loginStoreIdState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const StoreChangePw = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [storeLoginId, setstoreLoginId] = useRecoilState(loginStoreIdState);
  const [store, setStore] = useState({
    soEmail: storeLoginId,
    soPw: "",
  });

  useEffect(() => {
    setStore({ ...store, soEmail: storeLoginId });
  }, [storeLoginId]);
};

const [soPwRe, setSoPwRe] = useState("");
const [isAuth, setIsAuth] = useState(false);

const changeSoPw = (e) => {
  setStore({ ...store, soPw: e.target.value });
};

const soPwCheck = () => {
  axios
    .post(`${backServer}/store/soPw`, store)
    .then((res) => {
      if (res.data === 1) {
        setIsAuth(true);
        setStore({ ...store, soPw: "" });
      } else {
        Swal.fire({
          title: "비밀번호를 확인하세요.",
          icon: "question",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const storeChangePw = () => {
  if (store.soPw === soPwRe) {
    axios
      .patch(`${backServer}/store/soPw`, store)
      .then((res) => {
        console.log(res);
        if (res.data === 1) {
          Swal.fire({
            title: "비밀번호 수정 완료",
            icon: "success",
          }).then(() => {
            setIsAuth(false);
            setStore({ ...store, soPw: "" });
            setSoPwRe("");
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Swal.fire({
      title: "비밀번호가 일치하지 않습니다.",
      icon: "info",
    });
  }
};

return (
  <>
    <div className="storeChangePw"></div>
  </>
);

export default StoreChangePw;
