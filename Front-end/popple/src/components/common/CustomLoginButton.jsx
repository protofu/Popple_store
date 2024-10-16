import PropTypes from "prop-types";
import styles from "./styles/CustomLoginButton.module.css";

export default function CustomLoginButton({img, text}) {
  return (
    <div className={styles.btnBox}>
      <img src={img} alt="이미지" className={styles.imgBox}/>
      <div className={styles.loginText}>{text}</div>
    </div>
  );
};

// PropTypes 설정
CustomLoginButton.propTypes = {
  img: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};