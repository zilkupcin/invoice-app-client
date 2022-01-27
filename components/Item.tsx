import { ValidationErrorItem } from "joi";
import { FC, MouseEvent, MouseEventHandler } from "react";
import { IInvoiceItem } from "../interfaces/interface";
import styles from "../styles/InvoiceForm.module.scss";
import InputField from "./InputField";

interface ItemProps {
  item: IInvoiceItem;
  onDeleteItem: (item: IInvoiceItem) => void;
  onChangeItemInfo: (
    propertyName: string,
    value: string | number,
    item: IInvoiceItem
  ) => void;
  errors: Array<ValidationErrorItem>;
  groupIndex: number;
}

const Item: FC<ItemProps> = ({
  item,
  onDeleteItem,
  onChangeItemInfo,
  errors,
  groupIndex,
}) => {
  const calculateTotal = () => {
    return item.price * item.quantity;
  };

  const handleItemDelete: MouseEventHandler<HTMLButtonElement> = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    onDeleteItem(item);
  };

  const handleChangeItemInfo = (
    propertyName: string,
    value: string | number
  ) => {
    onChangeItemInfo(propertyName, value, item);
  };

  return (
    <li className={styles.item}>
      <InputField
        type="text"
        label="Item Name"
        value={item.name}
        propertyName="name"
        groupKey="items"
        groupIndex={groupIndex}
        errors={errors}
        onInputChange={handleChangeItemInfo}
      />
      <div className={styles.itemFieldGroup}>
        <InputField
          type="number"
          label="Quantity"
          value={item.quantity}
          propertyName="quantity"
          groupKey="items"
          groupIndex={groupIndex}
          errors={errors}
          onInputChange={handleChangeItemInfo}
        />
        <InputField
          type="number"
          label="Price"
          value={item.price}
          propertyName="price"
          groupKey="items"
          groupIndex={groupIndex}
          errors={errors}
          onInputChange={handleChangeItemInfo}
        />
        <div className={styles.itemTotal}>
          <label>Total</label>
          <span>{calculateTotal()}</span>
        </div>
        <button onClick={handleItemDelete}>
          <img src="/delete.svg"></img>
        </button>
      </div>
    </li>
  );
};

export default Item;
