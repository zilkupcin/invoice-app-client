import styles from "../styles/Overlay.module.scss";

const Overlay = ({ children }) => {
  return <div className={styles.overlay}>{children}</div>;
};
export default Overlay;
