import { ValidationErrorItem } from "joi";
import React, { FC, MouseEvent } from "react";
import { IInvoiceItem } from "../interfaces/interface";
import styles from "../styles/InvoiceForm.module.scss";
import Item from "./Item";

interface ItemListProps {
  items: Array<IInvoiceItem>;
  onDeleteItem: (item: IInvoiceItem) => void;
  onAddItem: (e: MouseEvent<HTMLButtonElement>) => void;
  onChangeItemInfo: (
    propertyName: string,
    value: string | number,
    item: IInvoiceItem
  ) => void;
  errors: Array<ValidationErrorItem>;
}

const ItemList: FC<ItemListProps> = ({
  items,
  onDeleteItem,
  onAddItem,
  onChangeItemInfo,
  errors,
}) => {
  return (
    <React.Fragment>
      <h4 className={styles.itemListHeading}>Item List</h4>
      <ul className={styles.itemList}>
        {items?.map((item, index) => {
          return (
            <Item
              item={item}
              onDeleteItem={onDeleteItem}
              onChangeItemInfo={onChangeItemInfo}
              groupIndex={index}
              errors={errors}
            />
          );
        })}
      </ul>
      <button className={styles.newItemBtn} onClick={onAddItem}>
        + Add New Item
      </button>
    </React.Fragment>
  );
};

export default ItemList;
