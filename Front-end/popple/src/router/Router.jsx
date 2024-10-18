import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Layout from "../pages/layouts/Layout";
import LoginPage from "../pages/LoginPage";
import styles from './Router.module.css';
import MapViewPage from "../pages/MapViewPage";
import SignUpPage from "../pages/SignUpPage";
import AuthLayout from "../pages/layouts/AuthLayout";
import OAuthLoginPage from "../pages/OAuthLoginPage";
import ExhibitionRegistPage from "../pages/ExhibitionRegistPage";


export default function Router() {
  return (
    <div className={styles.routerContainer}>
      <Routes>
        {/* 레이아웃을 적용한 페이지들 */}
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/regist" element={<ExhibitionRegistPage />} />
        </Route>

        {/* 레이아웃을 적용하지 않은 페이지들 */}
        <Route path="/map-view" element={<MapViewPage />} />
        <Route path="/oauth/:provider" element={<OAuthLoginPage />} />

        {/* Auth 폼을 적용할 페이지들 */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
    </div>
  );
}