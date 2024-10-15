import { useNavigate } from "react-router-dom";
import CateButton from "../components/common/CateButton";
import styles from './styles/MainPage.module.css';

export default function MainPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.mainContainer}>
      <CateButton text={"NEW"}></CateButton>

      <button onClick={() => handleNavigate("map-view")}> 맵 보기</button>
    </div>
  );
};
