import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { kakaoLoginAtom } from "../../atoms/kakaoLoginAtom";
import { getAccessToken, getMemberWithAccessToken } from "../../kakao/kakaoapi";

const After = () => {
  const [userInfo, setUserInfo] = useRecoilState(kakaoLoginAtom);
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    const info = await getMemberWithAccessToken(accessKey);
    setUserInfo({
      id: info.id,
      nickname: info.kakao_account.profile.nickname,
      thumbnail_image_url: info.kakao_account.profile.thumbnail_image_url,
      email: info.kakao_account.email,
    });
  };

  useEffect(() => {
    if (authCode) {
      getAccessTokenCall();
    }
  }, [authCode]);

  // 로그인 안 되어 있으면 홈으로 리다이렉트
  if (!userInfo.id) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Kakao 로그인 후</h1>
      <h2>인가코드: {authCode}</h2>
      <div>닉네임: {userInfo?.nickname}</div>
      <div>이메일: {userInfo?.email}</div>
      <div>
        <img src={userInfo?.thumbnail_image_url} alt="사용자 이미지" />
      </div>
    </div>
  );
};

export default After;
