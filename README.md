# 카카오 로그인

- CRA 로 리액트 프로젝트를 생성한 경우
  - 환경설정 즉, `.env` 사용법이 다르다.
- Vite 로 리액트 프로젝트를 생성한 경우
  - 환경설정 즉, `.env` 사용법이 다르다.

## 1. 카카오 개발자 등록하기

- [카카오 개발자 사이트](https://developers.kakao.com/)에 접속하여 회원가입 후 로그인합니다.
- https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

## 2. 새로운 애플리케이션 등록하기.

- 상단의 메뉴바에서 `앱` 을 클릭한다.
  <img width="960" height="688" alt="Image" src="https://github.com/user-attachments/assets/03776281-6a11-4051-bfc3-e46ec0a72ec8" />
- `이미지 등록` 은 필수이다.
  <img width="960" height="688" alt="Image" src="https://github.com/user-attachments/assets/a528ca4e-cae7-4f72-bfa0-2d6abafb5eb2" />
  <img width="960" height="688" alt="Image" src="https://github.com/user-attachments/assets/930afe95-5151-4f2b-bcfd-a8e6bfd7a37a" />
  <img width="667" height="567" alt="Image" src="https://github.com/user-attachments/assets/5dd6d493-6742-4582-81f2-8b08f9dbcccc" />
  <img width="321" height="166" alt="Image" src="https://github.com/user-attachments/assets/23a3e248-dc9a-4d87-8705-d09009463be3" />
  <img width="862" height="345" alt="Image" src="https://github.com/user-attachments/assets/a6074ad9-99c5-401b-8eb2-d51d0754560c" />

## 3. REST API 및 JavaScript 키 관리하기

- `REST API` 키와 `JavaScript` 키를 복사한다.
  - 절대 외부 노출하면 안됨.
- /폴더에 `.env` 파일 생성. 항상 최상단!!
- ### 3.1. 접두어는 `REACT_APP_` 으로 시작해야 한다.
  - 예: `REACT_APP_KAKAO_REST_API_KEY=여기에_복사한_REST_API_키를_붙여넣는다`
  - 예: Next.js 프로젝트 에서는 `NEXT_APP_` 으로 약속됨.
  - 예: Vite 프로젝트 에서는 `VITE_` 으로 약속됨.

```env
REACT_APP_KAKAO_REST_API_KEY=본인 복사한 REST API 키
REACT_APP_KAKAO_JS_KEY=본인 복사한 JavaScript 키
```

### 3.2. `.env` 파일은 절대 git 에 올리지 말 것.

- `.gitignore` 파일에 `.env` 추가.
- `.env` 파일은 절대 git 에 올리지 말 것.

## 4. 카카오 로그인 플랫폼 설정하기

<img width="1090" height="769" alt="Image" src="https://github.com/user-attachments/assets/75735336-0d84-4eca-ab43-f1c9c0dfb4e1" />

### 4.1. 리다이렉트 URL 설정

<img width="587" height="420" alt="Image" src="https://github.com/user-attachments/assets/cb8bde79-bc87-4f44-90b4-360bf54f1c2d" />

- http://localhost:3000/ : CRA 버전
- http://localhost:3000/member/kakao : 로그인하러 이동할 링크
- http://localhost:5173/ : Vite 버전
- https://www.도메인.com : 개인 도메인

- 카카오 로그인 사용설정 On 해주기.

## 5. 동의 항목 설정

<img width="1509" height="410" alt="Image" src="https://github.com/user-attachments/assets/6085ea7b-6ebd-4bc6-9539-44643e430766" />

<img width="1019" height="251" alt="Image" src="https://github.com/user-attachments/assets/63f9332a-8b56-4ff9-a1d3-e94825899749" />

## 6. 카카오 로그인 구현

- /src/kakao 폴더생성
- /src/kakao/kakaoapi.js 파일 생성

### 6.1 1 단계

```js
// git 에 key 값 공개 금지
const rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
// 카카오 로그인 성공시 이동할 useImperativeHandle(
const redirect_uri = "http://localhost:3000/member/kakao";
// 카카오 로그인시 API 호출 경로 : token
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 이후 사용자 정보 API 경로
const kakao_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

### 6.2 2 단계 : Access Token 활용

- 정보 호출

```js
// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.3. 전체코드(` 추후 axios로 변경`)

```js
// git 에 key 값 공개 금지
const rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
// 카카오 로그인 성공시 이동할 useImperativeHandle(
const redirect_uri = "http://localhost:3000/member/kakao";
// 카카오 로그인시 API 호출 경로 : token
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 이후 사용자 정보 API 경로
const kakao_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kakao_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.4. 코드 반영

- /src/pages/LoginPage.jsx 생성

```jsx
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../kakao/kakaoapi";

function LoginPage() {
  // 카카오 로그인 URL 만들기
  const kakaoLoginUrl = getKakaoLoginLink();
  console.log(kakaoLoginUrl);
  return (
    <div>
      <h1>LoginPage</h1>
      <Link to={kakaoLoginUrl}>카카오 로그인</Link>
    </div>
  );
}

export default LoginPage;
```

- /src/pages/member 폴더 생성
- /src/pages/member/After.jsx 생성

```jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kakao/kakaoapi";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useState(null);

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

  // 인가 키를 받아서 액세스 토큰을 요청한다.
  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    // console.log("accessKey : ", accessKey);
    // 사용자 정보 호출
    const info = await getMemberWithAccessToken(accessKey);
    console.log(info);
    setUserInfo(info);
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);
  return (
    <div>
      <h1>Kakao 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo?.kakao_account.profile.nickname}</div>
      <div>이메일 : {userInfo?.kakao_account.email}</div>
      <div>
        <img
          src={userInfo?.kakao_account.profile.thumbnail_image_url}
          alt="사용자 이미지"
        />
      </div>
    </div>
  );
};

export default After;
```

### 6.4.1 Router 세팅

- /src/App.js

```js
import { BrowserRouter as Route, Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import After from "./pages/member/After";

function App() {
  return (
    <Router>
      <LoginPage />
      <Routes>
        <Route path="member/kakao" element={<After />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## 7. Recoil 활용해 보기

- /src/atoms/kakaoLoginAtom.js 생성

```js
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
```

## 8. 로그아웃 처리

```jsx
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
```

## 9. 로그인 없이 페이지 접근시 처리

- 강제로 navigate("/") 로 홈으로 이동시키기

```jsx
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
```
