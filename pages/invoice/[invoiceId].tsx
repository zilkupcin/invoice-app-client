import type { NextPage } from "next";
import styles from "../../styles/InvoiceDetails.module.scss";
import { useRouter } from "next/router";
import GoBack from "../../components/GoBack";
import InvoiceInfo from "../../components/InvoiceDetails";
import Modal from "../../components/Modal";

const Invoice: NextPage = () => {
  const router = useRouter();
  const { invoiceId } = router.query;

  return (
    <div className={styles.pageContainer}>
      <GoBack />
      <InvoiceInfo />
      {/* <Modal /> */}
    </div>
  );
};

export default Invoice;
