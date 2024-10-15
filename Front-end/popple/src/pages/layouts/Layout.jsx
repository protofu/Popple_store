import { Outlet } from "react-router-dom";
import styles from "./styles/Layout.module.css";
import Header from "./header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div>
      <div>
      <Header />
      </div>
      <main className={styles.outletContainer}>
        <Outlet />
      </main>
      <div>
      <Footer />
      </div>
    </div>
  );
};
