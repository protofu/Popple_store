import { Link } from "react-router-dom";
import styles from "./styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>logo</h1>
      <nav className={styles.nav}>
        <li>
          <Link to="/">MainPage</Link>
        </li>
        <li>
          <Link to="/login">LoginPage</Link>
        </li>
      </nav>
    </header>
  );
};
