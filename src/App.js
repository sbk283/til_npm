import { useEffect } from "react";
import { getTodo } from "./apis/todoApi.js";
import { getPhoto } from "./apis/photoApi.js";

function App() {
  // js 자리
  // 할일 목록 비동기 통신 함수
  useEffect(() => {
    getTodo(1);
    getPhoto(1);
  }, []);
  // jsx 자리
  return <div>App</div>;
}

export default App;
