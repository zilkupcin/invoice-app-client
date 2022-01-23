import styles from "../styles/InvoiceDetails.module.scss";
import cn from "classnames";
import Button from "./Button";

const InvoiceDetails = ({
  invoice,
  onEditClick,
  onDeleteClick,
  onMarkAsPaidClick,
}) => {
  const calculatePaymentDate = () => {
    const days = parseInt(invoice.paymentTerms.replace("net_", ""));
    let newDate = new Date(invoice.date);
    newDate.setDate(newDate.getDate() + days);

    return newDate.toLocaleString("en-GB", {
      timeZone: "UTC",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateGrandTotal = () => {
    return invoice.items.reduce((total, item) => {
      return item.price + total;
    }, 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.statusContainer}>
          <span className={styles.statusLabel}>Status</span>
          <div
            className={cn(styles.status, {
              [styles[invoice?.status]]: invoice?.status,
            })}
          >
            {invoice.status[0].toUpperCase() + invoice.status.substring(1)}
          </div>
        </div>
        <div className={styles.actions}>
          <Button type="tertiary" title="Edit" onClick={onEditClick} />
          <Button type="secondary" title="Delete" onClick={onDeleteClick} />
          <Button
            type="primary"
            title="Mark as Paid"
            onClick={onMarkAsPaidClick}
          />
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailsTop}>
          <div className={styles.summary}>
            <h4 className={styles.id}>
              <span>#</span>XM9141
            </h4>
            <span className={styles.type}>{invoice.projectDescription}</span>
          </div>
          <div className={styles.address}>
            <span>{invoice.streetAddress}</span>
            <span>{invoice.city}</span>
            <span>{invoice.postCode}</span>
            <span>{invoice.country}</span>
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
              <span className={styles.groupValue}>
                {new Date(invoice.date).toLocaleString("en-GB", {
                  timeZone: "UTC",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div
              className={cn(styles.detailsGroup, {
                [styles["detailsGroup--bill-to"]]: true,
              })}
            >
              <span className={styles.groupLabel}>Bill To</span>
              <span className={styles.groupValue}>{invoice.clientName}</span>
            </div>
            <div
              className={cn(styles.detailsGroup, {
                [styles["detailsGroup--payment-due"]]: true,
              })}
            >
              <span className={styles.groupLabel}>Payment Due</span>
              <span className={styles.groupValue}>
                {calculatePaymentDate()}
              </span>
            </div>
            <div
              className={cn(styles.detailsGroup, {
                [styles["detailsGroup--sent-to"]]: true,
              })}
            >
              <span className={styles.groupLabel}>Sent to</span>
              <span className={styles.groupValue}>{invoice.clientEmail}</span>
            </div>
          </div>
          <div className={styles.itemSummary}>
            <div className={styles.summaryHeaders}>
              <span>Item Name</span>
              <span>QTY.</span>
              <span>Price</span>
              <span>Total</span>
            </div>
            <ul>
              {invoice.items.map((item) => {
                return (
                  <li className={styles.item}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <span className={styles.itemCount}>{item.quantity}</span>
                    <span className={styles.itemCost}>
                      £ {item.price.toFixed(2)}
                    </span>
                    <span className={styles.itemTotal}>
                      £ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                );
              })}
              {invoice.items.length === 0 && (
                <p className={styles.itemListEmpty}>
                  There are no items added in this invoice
                </p>
              )}
            </ul>
            <div className={styles.totalContainer}>
              <span className={styles.totalLabel}>Grand Total</span>
              <span className={styles.totalValue}>
                £ {calculateGrandTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
