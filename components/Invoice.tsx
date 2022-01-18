import styles from "../styles/Invoices.module.scss";
import cn from "classnames";

const Invoice = () => {
  const status = "paid";
  return (
    <li className={styles.invoice}>
      <h4 className={styles.invoiceId}>
        <span>#</span>RT3080
      </h4>
      <span className={styles.name}>Jensen Huang</span>
      <div className={styles.priceContainer}>
        <span className={styles.date}>Due 19 Aug 2021</span>
        <span className={styles.price}>£ 1,800.90</span>
      </div>
      <div className={cn(styles.status, { [styles[status]]: status })}>
        Pending
      </div>
    </li>
  );
};

export default Invoice;
