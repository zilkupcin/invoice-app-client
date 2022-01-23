import Image from "next/image";
import styles from "../styles/Buttons.module.scss";

const NewInvoiceBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.newInvoiceBtn}>
      <img src="/plus.svg"></img>
      New
    </button>
  );
};

export default NewInvoiceBtn;
