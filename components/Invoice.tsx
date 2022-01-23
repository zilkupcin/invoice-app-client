import styles from "../styles/Invoices.module.scss";
import cn from "classnames";
import { useRouter } from "next/router";

const Invoice = ({ invoice }) => {
  const router = useRouter();

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

  const handleViewInvoice = () => {
    router.push(`/invoice/${invoice._id}`);
  };

  const calculateGrandTotal = () => {
    return invoice.items
      .reduce((total, item) => {
        return item.price * item.quantity + total;
      }, 0)
      .toFixed(2);
  };
  return (
    <li onClick={handleViewInvoice} className={styles.invoice}>
      <h4 className={styles.invoiceId}>
        <span>#</span>RT3080
      </h4>
      <span className={styles.name}>{invoice.clientName}</span>
      <div className={styles.priceContainer}>
        <span className={styles.date}>Due {calculatePaymentDate()}</span>
        <span className={styles.price}>£ {calculateGrandTotal()}</span>
      </div>
      <div
        className={cn(styles.status, {
          [styles[invoice.status]]: invoice.status,
        })}
      >
        {invoice.status[0].toUpperCase() + invoice.status.substring(1)}
      </div>
      <img className={styles.arrow} src="/arrow-right.svg" />
    </li>
  );
};

export default Invoice;
