import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  FC,
  MutableRefObject,
  MouseEventHandler,
  MouseEvent,
} from "react";
import styles from "../styles/InvoiceForm.module.scss";
import CalendarDropdown from "./CalendarDropdown";
import FormDropdown from "./FormDropdown";
import GoBack from "./GoBack";
import InputField from "./InputField";
import ItemList from "./ItemList";
import { availablePaymentTerms } from "../data/fieldOptions";
import Button from "./Button";
import {
  ACTION_NEW_INVOICE,
  ACTION_SAVE_AS_DRAFT,
  ACTION_SAVE_CHANGES,
} from "../data/constants";
import { LoaderContext } from "./LoaderProvider";
import { animated, config, useTransition } from "react-spring";
import { invoiceFormTransition } from "../transitions/transitions";
import { IInvoice, IInvoiceItem } from "../interfaces/interface";
import { ValidationErrorItem } from "joi";

interface InvoiceFormProps {
  data?: IInvoice;
  onCancelClick: () => void;
  onSaveChanges: (invoiceData: IInvoice, saveAsDraft: boolean) => void;
  errors: Array<ValidationErrorItem>;
  onErrorsReset: () => void;
  isVisible: boolean;
}

const InvoiceForm: FC<InvoiceFormProps> = ({
  data,
  onCancelClick,
  onSaveChanges,
  errors,
  onErrorsReset,
  isVisible,
}) => {
  const { isLoading } = useContext(LoaderContext);
  const [invoiceData, setInvoiceData] = useState<IInvoice>(
    data || {
      paymentTerms: availablePaymentTerms[0].value,
      date: new Date(),
      items: [],
    }
  );
  const formContainer: MutableRefObject<HTMLDivElement> = useRef();

  const transitions = useTransition(isVisible, invoiceFormTransition);

  const handleInputChange = (
    propertyName: string,
    value: string | number | Date
  ) => {
    // Clear all the errors so user doesn't see them anymore
    if (errors) onErrorsReset();
    setInvoiceData({ ...invoiceData, [propertyName]: value });
  };

  const handleChangeItemInfo = (
    propertyName: string,
    value: string | number,
    item: IInvoiceItem
  ) => {
    if (errors) onErrorsReset();

    const dataCopy = { ...invoiceData, items: [...invoiceData.items] };

    const itemIndex: number | undefined = invoiceData.items?.indexOf(item);

    dataCopy.items[itemIndex] = {
      ...dataCopy.items[itemIndex],
      [propertyName]: value,
    };

    setInvoiceData({ ...dataCopy });
  };

  const handleAddItem: MouseEventHandler<HTMLButtonElement> = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const newItems = invoiceData.items ? [...invoiceData.items] : [];

    // Push a new invoice item with some defaults
    newItems.push({ name: "", quantity: 1, price: 5 });
    setInvoiceData({ ...invoiceData, items: [...newItems] });
  };

  const handleDeleteItem = (item: IInvoiceItem) => {
    const newItems = [...invoiceData.items];
    newItems.splice(newItems.indexOf(item), 1);
    setInvoiceData({ ...invoiceData, items: [...newItems] });
  };

  const handleCancelClick = () => {
    onCancelClick();
  };

  const handleSaveChangesClick = () => {
    onSaveChanges(invoiceData, false);
  };

  const handleSaveAsDraft = () => {
    onSaveChanges(invoiceData, true);
  };

  useEffect(() => {
    // If there are any errors, scroll to the bottom of the form
    if (errors.length > 0) {
      formContainer.current.scrollTo(0, 1000);
    }
  }, [errors]);

  return transitions(
    (springStyles, item) =>
      item && (
        <animated.div
          ref={formContainer}
          style={springStyles}
          className={styles.container}
        >
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
              errors={errors}
              value={invoiceData?.streetAddress}
            />
            <div className={styles.fieldGroupLarge}>
              <InputField
                type="text"
                propertyName="city"
                onInputChange={handleInputChange}
                label="City"
                errors={errors}
                value={invoiceData?.city}
              />
              <InputField
                type="text"
                propertyName="postCode"
                onInputChange={handleInputChange}
                label="Post Code"
                errors={errors}
                value={invoiceData?.postCode}
              />
              <InputField
                type="text"
                propertyName="country"
                onInputChange={handleInputChange}
                label="Country"
                errors={errors}
                value={invoiceData?.country}
              />
            </div>
            <label className={styles.groupLabel}>Bill To</label>
            <InputField
              type="text"
              label="Client's Name"
              propertyName="clientName"
              errors={errors}
              value={invoiceData?.clientName}
              onInputChange={handleInputChange}
            />
            <InputField
              type="text"
              label="Client's Email"
              errors={errors}
              propertyName="clientEmail"
              value={invoiceData?.clientEmail}
              onInputChange={handleInputChange}
            />
            <InputField
              type="text"
              label="Client's Street Address"
              errors={errors}
              value={invoiceData?.clientStreetAddress}
              propertyName="clientStreetAddress"
              onInputChange={handleInputChange}
            />
            <div className={styles.fieldGroupLarge}>
              <InputField
                type="text"
                label="City"
                errors={errors}
                value={invoiceData?.clientCity}
                propertyName="clientCity"
                onInputChange={handleInputChange}
              />
              <InputField
                type="text"
                label="Post Code"
                errors={errors}
                value={invoiceData?.clientPostCode}
                propertyName="clientPostCode"
                onInputChange={handleInputChange}
              />
              <InputField
                type="text"
                label="Country"
                errors={errors}
                value={invoiceData?.clientCountry}
                propertyName="clientCountry"
                onInputChange={handleInputChange}
              />
            </div>
            <div className={styles.fieldGroupSmall}>
              <CalendarDropdown
                onInputChange={handleInputChange}
                propertyName="date"
                errors={errors}
                relativeSelf={false}
                value={new Date(invoiceData?.date)}
              />
              <FormDropdown
                onInputChange={handleInputChange}
                propertyName="paymentTerms"
                errors={errors}
                items={availablePaymentTerms}
                value={
                  availablePaymentTerms.find(
                    (paymentTerm) =>
                      paymentTerm.value === invoiceData?.paymentTerms
                  )?.label
                }
              />
            </div>
            <InputField
              type="text"
              label="Project Description"
              value={invoiceData?.projectDescription}
              propertyName="projectDescription"
              errors={errors}
              onInputChange={handleInputChange}
            />
            <ItemList
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
              onChangeItemInfo={handleChangeItemInfo}
              errors={errors}
              items={invoiceData?.items}
            />
          </form>
          {errors?.map((error, index) => (
            <span key={index} className={styles.validationError}>
              - {error.message}
            </span>
          ))}
          <animated.div style={springStyles} className={styles.formFooter}>
            <Button
              type="tertiary"
              title="Cancel"
              onClick={handleCancelClick}
            />
            {!data && (
              <Button
                type="tertiary"
                title="Save as Draft"
                onClick={handleSaveAsDraft}
                isLoading={isLoading(ACTION_SAVE_AS_DRAFT, true)}
              />
            )}
            <Button
              type="primary"
              title={!data ? "Save Invoice" : "Save Changes"}
              onClick={handleSaveChangesClick}
              isLoading={isLoading(
                !data ? ACTION_NEW_INVOICE : ACTION_SAVE_CHANGES,
                true
              )}
            />
          </animated.div>
        </animated.div>
      )
  );
};

export default InvoiceForm;
