import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";

export default function Router() {
  return (
    <Routes>
      <Route path="" element={<MainPage />} />
    </Routes>
  );
}