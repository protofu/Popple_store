import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Layout from "../pages/layouts/Layout";
import LoginPage from "../pages/LoginPage";
import styles from './Router.module.css';

export default function Router() {
  return (
    <div className={styles.routerContainer}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}