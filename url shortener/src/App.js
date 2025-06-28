import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ShortenerPage from "./pages/ShortenerPage";
import StatisticsPage from "./pages/StatisticsPage";
import RedirectPage from "./pages/RedirectPage"; 

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path=":code" element={<RedirectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}