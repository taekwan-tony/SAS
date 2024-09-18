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

const isUserLoginState = selector({
  key: "isUserLoginState",
  get: (state) => {
    const loginUserId = state.get(loginUserIdState);
    const userType = state.get(userTypeState);
    return loginUserId !== "" && userType !== 0;
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

const isStoreLoginState = selector({
  key: "isStoreLoginState",
  get: (state) => {
    const loginStoreId = state.get(loginStoreIdState);
    const storeType = state.get(storeTypeState);
    return loginStoreId !== "" && storeType !== 0;
  },
});

export {
  loginStoreIdState,
  loginUserIdState,
  userTypeState,
  storeTypeState,
  isStoreLoginState,
  isUserLoginState,
};
