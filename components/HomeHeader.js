import styles from "../styles/Home.module.scss";
import Filter from "./Filter";
import NewInvoiceBtn from "./NewInvoiceBtn";
import filters from "../data/filters";

const HomeHeader = () => {
  return (
    <div className={styles.homeHeader}>
      <div className={styles.headerLeft}>
        <h1>Invoices</h1>
        <span>7 Invoices</span>
      </div>
      <div className={styles.headerRight}>
        {/* <Filter filters={filters}></Filter> */}
        <NewInvoiceBtn></NewInvoiceBtn>
      </div>
    </div>
  );
};

export default HomeHeader;
