import type { NextPage } from "next";
import styles from "../../styles/InvoiceDetails.module.scss";
import { useRouter } from "next/router";
import GoBack from "../../components/GoBack";
import InvoiceDetails from "../../components/InvoiceDetails";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Overlay from "../../components/Overlay";
import InvoiceForm from "../../components/InvoiceForm";
import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../components/LoaderProvider";
import { ACTION_LOAD_INVOICE, API_URL } from "../../data/constants";
import Loader from "../../components/Loader";

const Invoice: NextPage = () => {
  const router = useRouter();
  const { invoiceId } = router.query;

  const { isLoading, addActionId, removeActionId } = useContext(LoaderContext);
  const [invoice, setInvoice] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  const getInvoice = async () => {
    addActionId(ACTION_LOAD_INVOICE);

    try {
      const response = await fetch(`${API_URL}/api/invoices/${invoiceId}`, {
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("invoice_app_token"),
        }),
      });

      const data = await response.json();
      setInvoice(data);

      removeActionId(ACTION_LOAD_INVOICE);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteClick = async () => {
    addActionId("test");

    try {
      const response = await fetch(
        `${API_URL}/api/invoices/delete/${invoiceId}`,
        {
          method: "POST",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("invoice_app_token"),
          }),
        }
      );

      removeActionId("test");

      if (response.status === 200) {
        router.back();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleMarkAsPaidClick = async () => {
    const data = { status: "paid" };

    try {
      const response = await fetch(
        `${API_URL}/api/invoices/edit/${invoiceId}`,
        {
          method: "POST",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("invoice_app_token"),
          }),
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        setInvoice({ ...invoice, status: "paid" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSaveChangesClick = async (invoiceData) => {
    try {
      const response = await fetch(
        `${API_URL}/api/invoices/edit/${invoiceId}`,
        {
          method: "POST",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("invoice_app_token"),
          }),
          body: JSON.stringify(invoiceData),
        }
      );

      if (response.status === 200) {
        setInvoice({ ...invoiceData });
        setIsEditMode(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!invoiceId) return;

    getInvoice();
  }, [invoiceId]);

  const Footer = () => {
    return (
      <div className={styles.footer}>
        <Button type="tertiary" title="Edit" onClick={handleEditClick} />
        <Button type="secondary" title="Delete" />
        <Button type="primary" title="Mark as Paid" />
      </div>
    );
  };

  if (isLoading(ACTION_LOAD_INVOICE) || !invoice)
    return (
      <div className={styles.pageContainer}>
        <Loader />
      </div>
    );

  return (
    <div className={styles.pageContainer}>
      <GoBack />
      {isEditMode && (
        <InvoiceForm
          onCancelClick={handleEditClick}
          onSaveChanges={handleSaveChangesClick}
          data={invoice}
        />
      )}
      <InvoiceDetails
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onMarkAsPaidClick={handleMarkAsPaidClick}
        invoice={invoice}
      />
      {/* <Overlay><Modal /></Overlay> */}
      {!isEditMode && <Footer />}
    </div>
  );
};

export default Invoice;
