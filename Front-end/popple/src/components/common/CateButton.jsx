import PropTypes from "prop-types";
import styles from "./styles/CateButton.module.css";

export default function CateButton({ text }) {
  return (
    <div className={styles.btnContainer}>
      {text}
    </div>
  );
};

// PropTypes 설정
CateButton.propTypes = {
  text: PropTypes.string.isRequired,
};