import { Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Query from "./pages/Query";
import BackgroundGlow from "./components/BackgroundGlow";

function App() {
  return (
    <>
      {/* GLOBAL BACKGROUND */}
      <BackgroundGlow />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/query" element={<Query />} />
      </Routes>
    </>
  );
}

export default App;
