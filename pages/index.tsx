import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import HomeHeader from "../components/HomeHeader";
import InvoiceList from "../components/InvoiceList";
import React, { useContext, useEffect, useState } from "react";
import InvoiceForm from "../components/InvoiceForm";
import { ACTION_LOAD_INVOICES, API_URL } from "../data/constants";
import { LoaderContext } from "../components/LoaderProvider";

const Home: NextPage = () => {
  const { addActionId, removeActionId } = useContext(LoaderContext);
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState();
  const [isNewInvoiceMode, setIsNewInvoiceMode] = useState(false);

  const getInvoices = async () => {
    addActionId(ACTION_LOAD_INVOICES);

    try {
      const response = await fetch(`${API_URL}/api/invoices/`, {
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("invoice_app_token"),
        }),
      });
      const data = await response.json();
      setInvoices(data);

      removeActionId(ACTION_LOAD_INVOICES);
    } catch (e) {
      console.log(e);
    }
  };

  const handleNewInvoiceClick = () => {
    setIsNewInvoiceMode(!isNewInvoiceMode);
  };

  const handleCancelClick = () => {
    setIsNewInvoiceMode(!isNewInvoiceMode);
  };

  const handleFilterClick = (newFilter) => {
    if (newFilter === filter) {
      setFilter("");
    } else {
      setFilter(newFilter);
    }
  };

  const handleSaveInvoice = async (invoiceData, saveAsDraft) => {
    if (saveAsDraft) {
      invoiceData.status = "draft";
    } else {
      invoiceData.status = "pending";
    }

    try {
      const response = await fetch(`${API_URL}/api/invoices/add`, {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("invoice_app_token"),
        }),
        body: JSON.stringify(invoiceData),
      });

      if (response.status === 200) {
        // setInvoice({ ...invoiceData });
        setIsNewInvoiceMode(false);
        getInvoices();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getInvoices();
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
                (invoice) => invoice.status === filter.toLowerCase()
              )
        }
      />
      {isNewInvoiceMode && (
        <InvoiceForm
          onSaveChanges={handleSaveInvoice}
          onCancelClick={handleCancelClick}
        />
      )}
    </React.Fragment>
  );
};

export default Home;
