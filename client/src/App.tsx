import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Policy from "./pages/Policy";
import RiskPool from "./pages/RiskPool";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/risk-pool" element={<RiskPool />} />
    </Routes>
  );
}

export default App;
