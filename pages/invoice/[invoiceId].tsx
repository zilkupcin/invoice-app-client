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
import {
  ACTION_DELETE_INVOICE,
  ACTION_EDIT_INVOICE,
  ACTION_LOAD_INVOICE,
  ACTION_MARK_AS_PAID,
  ACTION_SAVE_CHANGES,
  API_URL,
} from "../../data/constants";
import Loader from "../../components/Loader";
import { invoiceValidation } from "../../validation/validation";
import {
  getInvoiceById,
  deleteInvoiceById,
  markAsPaidById,
  editInvoiceById,
} from "../../api/invoiceApi";
import { ValidationErrorItem } from "joi";
import { IInvoice } from "../../interfaces/interface";
import { MessagesContext } from "../../components/MessagesProvider";

const Invoice: NextPage = () => {
  const router = useRouter();
  const { invoiceId } = router.query;

  const { isLoading, addActionId, removeActionId } = useContext(LoaderContext);
  const { addMessage } = useContext(MessagesContext);
  const [invoice, setInvoice] = useState<IInvoice>({
    paymentTerms: "net_1",
    date: new Date(),
    items: [],
  });

  const [errors, setErrors] = useState<Array<ValidationErrorItem>>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Get the invoice by id
  const getInvoice = async () => {
    // Show a loader in the middle of the page
    addActionId(ACTION_LOAD_INVOICE);

    try {
      const data = await getInvoiceById(invoiceId);
      setInvoice(data);

      // Hide loader
      removeActionId(ACTION_LOAD_INVOICE);
    } catch (e) {
      addMessage(e);
    }
  };

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const handleDeleteInvoice = async () => {
    // Show a loader inside the delete button
    addActionId(ACTION_DELETE_INVOICE);
    try {
      const response = await deleteInvoiceById(invoiceId);

      if (response.status === 200) {
        addMessage("Invoice deleted");
        router.back();
      }
    } catch (e) {
      addMessage(e);
    }
    removeActionId(ACTION_DELETE_INVOICE);
  };

  const handleEditClick = () => {
    handleErrorsReset();
    setIsEditMode(!isEditMode);
  };

  const handleErrorsReset = () => {
    setErrors([]);
  };

  const handleMarkAsPaidClick = async () => {
    addActionId(ACTION_MARK_AS_PAID);
    try {
      await markAsPaidById(invoiceId);
      addMessage("Marked invoice as paid");
      setInvoice({ ...invoice, status: "paid" });
    } catch (e) {
      addMessage(e);
    }

    removeActionId(ACTION_MARK_AS_PAID);
  };

  const handleSaveChangesClick = async (invoiceData: IInvoice) => {
    addActionId(ACTION_SAVE_CHANGES);

    // Validate user input
    const validationData = invoiceValidation(invoiceData);
    if (validationData.error) {
      setErrors(validationData.error.details);
      removeActionId(ACTION_EDIT_INVOICE);
      return;
    }

    try {
      const response = await editInvoiceById(invoiceData, invoiceId);

      if (response.status === 200) {
        setInvoice({ ...invoiceData });
        setIsEditMode(false);
      }
    } catch (e) {
      setErrors(e);
    }

    removeActionId(ACTION_SAVE_CHANGES);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!invoiceId) return;

    getInvoice();
  }, [invoiceId]);

  const Footer = () => {
    return (
      <div className={styles.footer}>
        <Button type="tertiary" title="Edit" onClick={handleEditClick} />
        <Button
          type="secondary"
          title="Delete"
          isLoading={isLoading(ACTION_DELETE_INVOICE, true)}
          onClick={handleDeleteClick}
        />
        <Button
          type="primary"
          title="Mark as Paid"
          isLoading={isLoading(ACTION_MARK_AS_PAID, true)}
          onClick={handleMarkAsPaidClick}
        />
      </div>
    );
  };

  if (isLoading(ACTION_LOAD_INVOICE) || !invoice._id)
    return (
      <div className={styles.pageContainer}>
        <Loader />
      </div>
    );

  return (
    <div className={styles.pageContainer}>
      <GoBack />
      <Overlay onClick={handleEditClick} isVisible={isEditMode}>
        <InvoiceForm
          onCancelClick={handleEditClick}
          onSaveChanges={handleSaveChangesClick}
          onErrorsReset={handleErrorsReset}
          data={invoice}
          errors={errors}
          isVisible={isEditMode}
        />
      </Overlay>
      <InvoiceDetails
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onMarkAsPaidClick={handleMarkAsPaidClick}
        invoice={invoice}
      />
      {!isEditMode && <Footer />}
      <Overlay
        isFullScreen={true}
        onClick={handleModalCancel}
        isVisible={isModalVisible}
      >
        <Modal
          onCancelClick={handleModalCancel}
          onDeleteClick={handleDeleteInvoice}
        />
      </Overlay>
    </div>
  );
};

export default Invoice;
