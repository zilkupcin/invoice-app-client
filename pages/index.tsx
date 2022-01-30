import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import HomeHeader from "../components/HomeHeader";
import InvoiceList from "../components/InvoiceList";
import React, { useContext, useEffect, useState } from "react";
import InvoiceForm from "../components/InvoiceForm";
import {
  ACTION_LOAD_INVOICES,
  ACTION_NEW_INVOICE,
  ACTION_SAVE_AS_DRAFT,
  API_URL,
} from "../data/constants";
import { availableFilterOptions } from "../data/fieldOptions";
import { LoaderContext } from "../components/LoaderProvider";
import { invoiceValidation } from "../validation/validation";
import Overlay from "../components/Overlay";
import { getAllInvoices, addInvoice, demoLogin } from "../api/invoiceApi";
import { IInvoice } from "../interfaces/interface";
import { ValidationErrorItem } from "joi";
import { MessagesContext } from "../components/MessagesProvider";

const Home: NextPage = () => {
  const { addActionId, removeActionId } = useContext(LoaderContext);
  const [invoices, setInvoices] = useState<Array<IInvoice>>([]);
  const [filter, setFilter] = useState("");
  const [isNewInvoiceMode, setIsNewInvoiceMode] = useState(false);
  const [errors, setErrors] = useState<Array<ValidationErrorItem>>([]);

  const { addMessage } = useContext(MessagesContext);

  // Get all user's invoices
  const getInvoices = async () => {
    addActionId(ACTION_LOAD_INVOICES);

    try {
      const data = await getAllInvoices();
      setInvoices(data);
    } catch (e) {
      addMessage(e);
    }

    removeActionId(ACTION_LOAD_INVOICES);
  };

  const handleNewInvoiceClick = () => {
    setIsNewInvoiceMode(!isNewInvoiceMode);
  };

  const handleCancelClick = () => {
    setErrors([]);
    setIsNewInvoiceMode(!isNewInvoiceMode);
  };

  const handleFilterClick = (newFilter: string) => {
    if (newFilter === filter) {
      setFilter("");
    } else {
      setFilter(newFilter);
    }
  };

  const handleErrorsReset = () => {
    setErrors([]);
  };

  const handleSaveInvoice = async (
    invoiceData: IInvoice,
    saveAsDraft: boolean
  ) => {
    if (saveAsDraft) {
      invoiceData.status = "draft";
      addActionId(ACTION_SAVE_AS_DRAFT);
    } else {
      invoiceData.status = "pending";
      addActionId(ACTION_NEW_INVOICE);

      // Validate user input
      const validationData = invoiceValidation(invoiceData);
      if (validationData.error) {
        setErrors(validationData.error.details);
        removeActionId(ACTION_NEW_INVOICE);
        return;
      }
    }

    try {
      const response = await addInvoice(invoiceData);

      if (response.status === 200) {
        setIsNewInvoiceMode(false);
        getInvoices();
      }
    } catch (e) {
      addMessage(e);
    }

    if (saveAsDraft) {
      removeActionId(ACTION_SAVE_AS_DRAFT);
    } else {
      removeActionId(ACTION_NEW_INVOICE);
    }
  };

  // Log into a demo account
  const logIn = async () => {
    const response = await demoLogin();

    // Save the JWT token in local storage
    localStorage.setItem("invoice_app_token", response.token);
    getInvoices();
  };

  useEffect(() => {
    // Check if the user is logged in, load all of their invoices
    if (localStorage.getItem("invoice_app_token")) {
      getInvoices();
    } else {
      logIn();
    }
  }, []);

  return (
    <React.Fragment>
      <HomeHeader
        numOfInvoices={invoices.length}
        onNewInvoiceClick={handleNewInvoiceClick}
        onFilterClick={handleFilterClick}
        selectedFilter={filter}
      />
      <InvoiceList
        invoices={
          !filter
            ? invoices
            : invoices.filter(
                (invoice: IInvoice) => invoice.status === filter.toLowerCase()
              )
        }
      />
      <Overlay onClick={handleCancelClick} isVisible={isNewInvoiceMode}>
        <InvoiceForm
          errors={errors}
          onSaveChanges={handleSaveInvoice}
          onCancelClick={handleCancelClick}
          onErrorsReset={handleErrorsReset}
          isVisible={isNewInvoiceMode}
        />
      </Overlay>
    </React.Fragment>
  );
};

export default Home;
