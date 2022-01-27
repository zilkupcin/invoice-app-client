import Image from "next/image";
import { FC } from "react";
import styles from "../styles/Buttons.module.scss";

interface NewInvoiceBtnProps {
  onClick: () => void;
}

const NewInvoiceBtn: FC<NewInvoiceBtnProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.newInvoiceBtn}>
      <img src="/plus.svg"></img>
      New
    </button>
  );
};

export default NewInvoiceBtn;
