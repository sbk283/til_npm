import { useRecoilState } from "recoil";
import { counterAtom } from "../atoms/counterAtom";
import { LoginAtom } from "../atoms/LoginAtom";

function CounterAtom() {
  const [count, setCount] = useRecoilState(counterAtom);
  const [Login, setLogin] = useRecoilState(LoginAtom);
  return (
    <div>
      <h1>recoil 예제</h1>
      <div>
        <p>전역 count 값 : {count}</p>
        <button onClick={() => setCount(count + 1)}>증가</button>
        <button onClick={() => setCount(count - 1)}>감소</button>
      </div>
      <div>
        <p>전역 로그인 값 : {Login ? "로그인됨" : "로그인안됨"}</p>
        <button onClick={() => setLogin(true)}>로그인</button>
        <button onClick={() => setLogin(false)}>로그아웃</button>
      </div>
    </div>
  );
}

export default CounterAtom;
