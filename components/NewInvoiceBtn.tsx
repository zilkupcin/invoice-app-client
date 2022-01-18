import Image from "next/image";
import styles from "../styles/Buttons.module.scss";

const NewInvoiceBtn = () => {
  return (
    <div className={styles.newInvoiceBtn}>
      <img src="/plus.svg"></img>
      New
    </div>
  );
};

export default NewInvoiceBtn;
