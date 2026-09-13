import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import CityDashboard from "./pages/CityDashboard";
import CityInfrastructure from "./pages/CityInfrastructure";
import AreaDetail from "./pages/AreaDetail";
import Compare from "./pages/Compare";
import About from "./pages/About";
import Methodology from "./pages/Methodology";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/city/:city" element={<CityDashboard />} />
        <Route path="/city/:city/infrastructure" element={<CityInfrastructure />} />
        <Route path="/area/:id" element={<AreaDetail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
