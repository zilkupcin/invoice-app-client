import { useRouter } from "next/router";
import { FC } from "react";
import styles from "../styles/Navigation.module.scss";

interface GoBackProps {
  onBackClick?: () => void;
}

const GoBack: FC<GoBackProps> = ({ onBackClick }) => {
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
