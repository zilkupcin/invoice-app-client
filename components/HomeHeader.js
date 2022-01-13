import styles from '../styles/Home.module.scss';
import Filter from './Filter';
import NewInvoiceBtn from './NewInvoiceBtn';

const HomeHeader = () => {
    return (
    <div className={styles.homeHeader}>
        <div className={styles.headerLeft}>
            <h1>Invoices</h1>
            <span>7 Invoices</span>
        </div>
        <div className={styles.headerRight}>
            <Filter></Filter>
            <NewInvoiceBtn></NewInvoiceBtn>
        </div>
    </div>)
}

export default HomeHeader;