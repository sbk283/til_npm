import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginLink } from "../kakao/kakaoapi";
import { useRecoilState } from "recoil";
import { kakaoLoginAtom } from "../atoms/kakaoLoginAtom";

function LoginPage() {
  const navigate = useNavigate();
  // Recoil State 로 전역상태 활용하기
  const [userInfo, setUserInfo] = useRecoilState(kakaoLoginAtom);

  // 카카오 로그인 URL 만들기
  const kakaoLoginUrl = getKakaoLoginLink();

  const handleLogout = () => {
    // 로그아웃 로직 구현
    setUserInfo({
      id: "",
      nickname: "",
      thumbnail_image_url: "",
      email: "",
    });
    // navigate("/");
    if (window.Kakao) {
      window.Kakao.Auth.logout();
    }
    window.location.href = "/";
  };
  return (
    <div>
      <h1>LoginPage</h1>
      {userInfo.id ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <Link to={kakaoLoginUrl}>카카오 로그인</Link>
      )}
    </div>
  );
}

export default LoginPage;
