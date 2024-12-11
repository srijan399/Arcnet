import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Policy from "./pages/Policy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/policy" element={<Policy />} />
    </Routes>
  );
}

export default App;
