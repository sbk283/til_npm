import { atom } from "recoil";

export const kakaoLoginAtom = atom({
  key: "kakaoLoginAtom",
  default: {
    id: "",
    nickname: "",
    thumbnail_image_url: "",
    email: "",
  },
});
