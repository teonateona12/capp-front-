import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ChartPie from "./pages/Pie";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pie" element={<ChartPie />} />
      </Routes>
    </>
  );
}

export default App;
