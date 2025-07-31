import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import After from "./pages/member/After";

function App() {
  return (
    <Router>
      <LoginPage></LoginPage>
      <Routes>
        <Route path="/member/kakao" element={<After />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
