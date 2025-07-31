import { atom } from "recoil";

export const LoginAtom = atom({
  key: "LoginAtom", // state 를 구분하는 역할
  default: {
    isLogin: false, // 로그인 상태
    user: null, // 사용자 정보
  }, // state 의 초기값
});
