import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { kakaoLoginAtom } from "../atoms/kakaoLoginAtom";
import { getGoogleLoginLink } from "../google/googleapi";
import { getKakaoLoginLink } from "../kakao/kakaoapi";

function LoginPage() {
  // Recoil State 로 전역상태 활용하기
  const [userInfo, setUserInfo] = useRecoilState(kakaoLoginAtom);

  // 카카오 로그인 URL 만들기
  const kakaoLoginUrl = getKakaoLoginLink();

  const handleKakaoLogout = () => {
    // 로그아웃 로직 구현
    setUserInfo({
      id: "",
      nickname: "",
      thumbnail_image_url: "",
      email: "",
    });
    if (window.Kakao) {
      window.Kakao.Auth.logout();
    }
    window.location.href = "/";
  };
  const googleLogin = () => {
    getGoogleLoginLink();
  };
  const handleGoogleLogout = () => {
    // 로그아웃 로직 구현
    setUserInfo({
      id: "",
      nickname: "",
      thumbnail_image_url: "",
      email: "",
    });
    if (window.Google) {
      window.Google.Auth.logout();
    }
    window.location.href = "/";
  };
  return (
    <div>
      <h1>LoginPage</h1>
      {userInfo.id ? (
        <button onClick={handleKakaoLogout}>카카오 로그아웃</button>
      ) : (
        <Link to={kakaoLoginUrl}>카카오 로그인</Link>
      )}
      <button onClick={googleLogin}>구글로그인</button>
      {userInfo.id ? (
        <button onClick={handleGoogleLogout}>구글 로그아웃</button>
      ) : (
        <Link to={googleLogin}>구글 로그인</Link>
      )}
    </div>
  );
}

export default LoginPage;
