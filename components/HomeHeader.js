import styles from "../styles/Home.module.scss";
import Filter from "./Filter";
import NewInvoiceBtn from "./NewInvoiceBtn";
import filters from "../data/filters";

const HomeHeader = ({
  numOfInvoices,
  selectedFilter,
  onNewInvoiceClick,
  onFilterClick,
}) => {
  return (
    <div className={styles.homeHeader}>
      <div className={styles.headerLeft}>
        <h1>Invoices</h1>
        <span>{numOfInvoices} Invoices</span>
      </div>
      <div className={styles.headerRight}>
        <Filter
          onFilterClick={onFilterClick}
          filters={filters}
          selectedFilter={selectedFilter}
        ></Filter>
        <NewInvoiceBtn onClick={onNewInvoiceClick}></NewInvoiceBtn>
      </div>
    </div>
  );
};

export default HomeHeader;
