import React, { useEffect, useState } from "react";
import styles from "../styles/InvoiceForm.module.scss";
import CalendarDropdown from "./CalendarDropdown";
import FormDropdown from "./FormDropdown";
import GoBack from "./GoBack";
import InputField from "./InputField";
import ItemList from "./ItemList";
import { availablePaymentTerms } from "../data/fieldOptions";
import Button from "./Button";

const InvoiceForm = ({ data, onCancelClick, onSaveChanges }) => {
  const [invoiceData, setInvoiceData] = useState(
    data || { paymentTerms: availablePaymentTerms[0].value, date: new Date() }
  );

  const handleInputChange = (propertyName, value) => {
    console.log(propertyName, value);
    setInvoiceData({ ...invoiceData, [propertyName]: value });
  };

  const handleChangeItemInfo = (propertyName, value, item) => {
    const newItems = [...invoiceData.items];
    const itemIndex = invoiceData.items.indexOf(item);

    newItems[itemIndex][propertyName] = value;

    setInvoiceData({ ...invoiceData, items: [...newItems] });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItems = invoiceData.items ? [...invoiceData.items] : [];
    newItems.push({ name: "", quantity: 1, price: 123 });
    setInvoiceData({ ...invoiceData, items: [...newItems] });
  };

  const handleDeleteItem = (item) => {
    const newItems = [...invoiceData.items];
    newItems.splice(newItems.indexOf(item), 1);
    setInvoiceData({ ...invoiceData, items: [...newItems] });
  };

  const handleSaveChangesClick = () => {
    onSaveChanges(invoiceData, false);
  };

  const handleSaveAsDraft = () => {
    onSaveChanges(invoiceData, true);
  };

  useEffect(() => {
    if (!data) {
      setInvoiceData({
        streetAddress: "test street",
        city: "London",
        postCode: "E1 111",
        country: "United Kingdom",
        clientName: "My Client",
        clientEmail: "client@example.com",
        clientStreetAddress: "Client Street",
        clientCity: "Manchester",
        clientPostCode: "MN1 2MM",
        clientCountry: "United Kingdom",
        date: new Date(),
        paymentTerms: "net_14",
        projectDescription: "Default Project",
        status: "draft",
        items: [
          {
            name: "Banner Design",
            quantity: 1,
            price: 500.5,
          },
        ],
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <GoBack onBackClick={onCancelClick} />
      <h2 className={styles.title}>
        {!data ? "New Invoice" : "Edit "}
        {data && (
          <span>
            #<span>D8W6D11</span>
          </span>
        )}
      </h2>
      <form className={styles.form}>
        <label className={styles.groupLabel}>Bill From</label>
        <InputField
          propertyName="streetAddress"
          onInputChange={handleInputChange}
          type="text"
          label="Street Address"
          value={invoiceData.streetAddress}
        />
        <div className={styles.fieldGroupLarge}>
          <InputField
            type="text"
            propertyName="city"
            onInputChange={handleInputChange}
            label="City"
            value={invoiceData.city}
          />
          <InputField
            type="text"
            propertyName="postCode"
            onInputChange={handleInputChange}
            label="Post Code"
            value={invoiceData.postCode}
          />
          <InputField
            type="text"
            propertyName="country"
            onInputChange={handleInputChange}
            label="Country"
            value={invoiceData.country}
          />
        </div>
        <label className={styles.groupLabel}>Bill To</label>
        <InputField
          type="text"
          label="Client's Name"
          propertyName="clientName"
          value={invoiceData.clientName}
          onInputChange={handleInputChange}
        />
        <InputField
          type="text"
          label="Client's Email"
          propertyName="clientEmail"
          value={invoiceData.clientEmail}
          onInputChange={handleInputChange}
        />
        <InputField
          type="text"
          label="Client's Street Address"
          value={invoiceData.clientStreetAddress}
          propertyName="clientStreetAddress"
          onInputChange={handleInputChange}
        />
        <div className={styles.fieldGroupLarge}>
          <InputField
            type="text"
            label="City"
            value={invoiceData.clientCity}
            propertyName="clientCity"
            onInputChange={handleInputChange}
          />
          <InputField
            type="text"
            label="Post Code"
            value={invoiceData.clientPostCode}
            propertyName="clientPostCode"
            onInputChange={handleInputChange}
          />
          <InputField
            type="text"
            label="Country"
            value={invoiceData.clientCountry}
            propertyName="clientCountry"
            onInputChange={handleInputChange}
          />
        </div>
        <div className={styles.fieldGroupSmall}>
          <CalendarDropdown
            onInputChange={handleInputChange}
            propertyName="date"
            relativeSelf={false}
            value={new Date(invoiceData.date)}
          />
          <FormDropdown
            onInputChange={handleInputChange}
            propertyName="paymentTerms"
            items={availablePaymentTerms}
            value={
              availablePaymentTerms.find(
                (paymentTerm) => paymentTerm.value === invoiceData.paymentTerms
              )?.label
            }
          />
        </div>
        <InputField
          type="text"
          label="Project Description"
          value={invoiceData.projectDescription}
          propertyName="projectDescription"
          onInputChange={handleInputChange}
        />
        <ItemList
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
          onChangeItemInfo={handleChangeItemInfo}
          items={invoiceData.items}
        />
      </form>
      <div className={styles.formFooter}>
        <Button type="tertiary" title="Cancel" onClick={onCancelClick} />
        {!data && (
          <Button
            type="tertiary"
            title="Save as Draft"
            onClick={handleSaveAsDraft}
          />
        )}
        <Button
          type="primary"
          title={!data ? "Save Invoice" : "Save Changes"}
          onClick={handleSaveChangesClick}
        />
      </div>
    </div>
  );
};

export default InvoiceForm;
