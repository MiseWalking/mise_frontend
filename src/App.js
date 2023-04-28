import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main, Mise } from "./pages";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/route" element={<Mise />} />
      </Routes>
    </Router>
  );
};

export default App;
