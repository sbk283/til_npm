import axios from "axios";

const photoURL = "https://jsonplaceholder.typicode.com/photos";
// 사진 목록 전체 호출하기
const getPhotos = async () => {
  try {
    const res = await axios.get(photoURL);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// 사진 목록 한개만 호출하기
const getPhoto = async id => {
  try {
    const res = await axios.get(`${photoURL}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// 사진 1개 추가하기
const postPhoto = async data => {
  try {
    const res = await axios.post(photoURL, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// 사진 1개 삭제하기
const deletePhoto = async id => {
  try {
    const res = await axios.delete(`${photoURL}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// 사진 전체 업데이트
const putPhoto = async (id, data) => {
  try {
    const res = await axios.put(`${photoURL}/${id}`, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// 사진 부분 업데이트
const patchPhoto = async (id, data) => {
  try {
    const res = await axios.patch(`${photoURL}/${id}`, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export { getPhotos, getPhoto, postPhoto, deletePhoto, putPhoto, patchPhoto };
