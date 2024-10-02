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
const loginStoreIdState = atom({
  key: "loginStoreIdState",
  default: "",
});

const storeTypeState = atom({
  key: "storeTypeState",
  default: 0,
});

const loginStoreNoState = atom({
  key: "loginStoreNoState",
  default: 0,
});

const storeNameState = atom({
  key: "storeNameState",
  default: 0,
});
const loginStoreNameState = atom({
  key: "loginStoreNameState",
  default: "",
});

const isStoreLoginState = selector({
  key: "isStoreLoginState",
  get: (state) => {
    const loginStoreId = state.get(loginStoreIdState);
    const storeType = state.get(storeTypeState);
    const loginStoreNo = state.get(loginStoreNoState);
    const storeName = state.get(storeNameState);
    return (
      loginStoreId !== "" &&
      storeType !== 0 &&
      loginStoreNo !== 0 &&
      storeName !== ""
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
};
