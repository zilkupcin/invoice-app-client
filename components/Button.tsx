import styles from "../styles/Buttons.module.scss";
import cn from "classnames";

const Button = ({ type, title }) => {
  return (
    <button
      className={cn(styles.button, { [styles[`button--${type}`]]: true })}
    >
      {title}
    </button>
  );
};

export default Button;
