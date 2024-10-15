import MapView from "../components/MapView";
import styles from "./styles/MapViewPage.module.css";
export default function MapViewPage() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        
      </div>
      <div className={styles.rightContainer}>
        <MapView />
        <div>
          {/* 리스트가 뜨면 모달로 알려야함 */}
          {/* 대충 주변 팝업/전시가 리스트로 보여질 자리 */}
        </div>
      </div>
    </div>
  );
};
