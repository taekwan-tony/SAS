import { atom, selector } from "recoil";

// 소비자 저장소
const loginUserIdState = atom({
  key: "loginUserIdState",
  default: "",
});

const userTypeState = atom({
  key: "userTypeState",
  default: 0,
});
const loginUserNicknameState = atom({
  key: "loginUserNicknameState",
  default: "",
});
const loginUserNoState = atom({
  key: "loginUserNoState",
  default: 0,
});

const isUserLoginState = selector({
  key: "isUserLoginState",
  get: (state) => {
    const loginUserId = state.get(loginUserIdState);
    const userType = state.get(userTypeState);
    const loginUserNo = state.get(loginUserNoState);
    const loginUserNickname = state.get(loginUserNicknameState);
    return (
      loginUserId !== "" &&
      userType !== 0 &&
      loginUserNo !== 0 &&
      loginUserNickname !== ""
    );
  },
});

// 매장/관리자 저장소

//점주 이메일
const loginStoreIdState = atom({
  key: "loginStoreIdState",
  default: "",
});

//매장 타입 (한식 ...)
const storeTypeState = atom({
  key: "storeTypeState",
  default: 0,
});

//매장 번호
const loginStoreNoState = atom({
  key: "loginStoreNoState",
  default: 0,
});

//매장 이름??
const storeNameState = atom({
  key: "storeNameState",
  default: 0,
});

//매장 이름
const loginStoreNameState = atom({
  key: "loginStoreNameState",
  default: "",
});

//매장 주소
const storeAddrState = atom({
  key: "storeAddr",
  default: "",
});

//매장 점주 전화번호
const soPhoneState = atom({
  key: "soPhone",
  default: "",
});

//매장 점주 이름
const soNameState = atom({
  key: "soName",
  default: "",
});

const isStoreLoginState = selector({
  key: "isStoreLoginState",
  get: (state) => {
    const loginStoreId = state.get(loginStoreIdState);
    const storeType = state.get(storeTypeState);
    const loginStoreNo = state.get(loginStoreNoState);
    const storeName = state.get(storeNameState);
    const storeAddr = state.get(storeAddrState);
    const soPhone = state.get(soPhoneState);
    const soName = state.get(soNameState);

    return (
      loginStoreId !== "" &&
      storeType !== 0 &&
      loginStoreNo !== 0 &&
      storeName !== "" &&
      storeAddr !== "" &&
      soPhone !== "" &&
      soName !== ""
    );
  },
});

export {
  loginStoreIdState,
  loginUserIdState,
  loginUserNicknameState,
  userTypeState,
  loginUserNoState,
  storeTypeState,
  isStoreLoginState,
  isUserLoginState,
  loginStoreNoState,
  storeNameState,
  loginStoreNameState,
  storeAddrState,
  soPhoneState,
  soNameState,
};
