import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import EdaPage from "../pages/EdaPage";
import RegressionPage from "../pages/RegressionPage";
import { useDatasetStore } from "../store/useDatasetStore";

export default function AppRouter() {
  const { eda, file } = useDatasetStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/eda" element={<EdaPage />} />

        <Route
          path="/regression"
          element={
            eda && file ? (
              <RegressionPage />
            ) : (
              <Navigate to="/eda" replace />
            )
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
