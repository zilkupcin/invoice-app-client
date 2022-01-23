import { useRouter } from "next/router";
import styles from "../styles/Navigation.module.scss";

const GoBack = ({ onBackClick }) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <div onClick={handleGoBack} className={styles.goBack}>
      <img src="/go-back.svg" />
      Go back
    </div>
  );
};

export default GoBack;
