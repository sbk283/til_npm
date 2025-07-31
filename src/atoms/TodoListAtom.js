import { atom } from "recoil";

export const todoListAtom = atom({
  key: "todoListAtom", // state 를 구분하는 역할
  default: [], // state 의 초기값
});
