import styles from "../styles/Buttons.module.scss";
import cn from "classnames";

const Button = ({ type, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(styles.button, { [styles[`button--${type}`]]: true })}
    >
      {title}
    </button>
  );
};

export default Button;
