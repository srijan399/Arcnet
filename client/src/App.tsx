import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Policy from "./pages/Policies/Policy";
import RiskPool from "./pages/RiskPool";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/risk-pool" element={<RiskPool />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
