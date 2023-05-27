import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main, Mise, MyPage } from "./pages";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/route" element={<Mise />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
