import styles from "../styles/Buttons.module.scss";
import cn from "classnames";
import Loader from "./Loader";
import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  type: String;
  title: String;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({ type, title, onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      className={cn(styles.button, { [styles[`button--${type}`]]: true })}
      disabled={isLoading}
    >
      {isLoading ? <Loader /> : title}
    </button>
  );
};

export default Button;
