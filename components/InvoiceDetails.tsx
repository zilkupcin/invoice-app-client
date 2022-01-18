import styles from "../styles/InvoiceDetails.module.scss";
import cn from "classnames";
import Button from "./Button";

const InvoiceInfo = () => {
  const status = "paid";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.statusContainer}>
          <span className={styles.statusLabel}>Status</span>
          <div className={cn(styles.status, { [styles[status]]: status })}>
            Paid
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailsTop}>
          <div className={styles.summary}>
            <h4 className={styles.id}>
              <span>#</span>XM9141
            </h4>
            <span className={styles.type}>Graphic Design</span>
          </div>
          <div className={styles.address}>
            19 Union Terrace London E1 3EZ United Kingdom
          </div>
        </div>
        <div className={styles.detailsMiddle}>
          <div className={styles.detailGroups}>
            <div
              className={cn(styles.detailsGroup, {
                [styles["detailsGroup--invoice-date"]]: true,
              })}
            >
              <span className={styles.groupLabel}>Invoice Date</span>
              <span className={styles.groupValue}>21 Aug 2021</span>
            </div>
            <div
              className={cn(styles.detailsGroup, {
                [styles["detailsGroup--bill-to"]]: true,
              })}
            >
              <span className={styles.groupLabel}>Bill To</span>
              <span className={styles.groupValue}>Alex Grim</span>
            </div>
            <div
              className={cn(styles.detailsGroup, {
                [styles["detailsGroup--payment-due"]]: true,
              })}
            >
              <span className={styles.groupLabel}>Payment Due</span>
              <span className={styles.groupValue}>20 Sep 2021</span>
            </div>
            <div
              className={cn(styles.detailsGroup, {
                [styles["detailsGroup--sent-to"]]: true,
              })}
            >
              <span className={styles.groupLabel}>Sent to</span>
              <span className={styles.groupValue}>alexgrim@mail.com</span>
            </div>
          </div>
          <div className={styles.itemSummary}>
            <div className={styles.item}>
              <h4 className={styles.itemName}>Banner Design</h4>
              <span className={styles.itemCount}>2</span>
              <span className={styles.itemCost}>£ 200.00</span>
              <span className={styles.itemTotal}>£ 400.00</span>
            </div>
            <div className={styles.item}>
              <h4 className={styles.itemName}>Banner Design</h4>
              <span className={styles.itemCount}>2</span>
              <span className={styles.itemCost}>£ 200.00</span>
              <span className={styles.itemTotal}>£ 400.00</span>
            </div>
            <div className={styles.totalContainer}>
              <span className={styles.totalLabel}>Grand Total</span>
              <span className={styles.totalValue}>£ 800.00</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <Button type="tertiary" title="Edit" />
        <Button type="secondary" title="Delete" />
        <Button type="primary" title="Mark as Paid" />
      </div>
    </div>
  );
};

export default InvoiceInfo;
