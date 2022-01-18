import styles from "../styles/Navigation.module.scss";

const GoBack = () => {
  return (
    <div className={styles.goBack}>
      <img src="/go-back.svg" />
      Go back
    </div>
  );
};

export default GoBack;
