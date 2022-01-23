import React from "react";
import styles from "../styles/InvoiceForm.module.scss";
import Item from "./Item";

const ItemList = ({ items, onDeleteItem, onAddItem, onChangeItemInfo }) => {
  return (
    <React.Fragment>
      <h4 className={styles.itemListHeading}>Item List</h4>
      <ul className={styles.itemList}>
        {items?.map((item) => {
          return (
            <Item
              item={item}
              onDeleteItem={onDeleteItem}
              onChangeItemInfo={onChangeItemInfo}
            />
          );
        })}
      </ul>
      <button className={styles.newItemBtn} onClick={onAddItem}>
        + Add New Item
      </button>
      <span className={styles.validationError}>- All fields must be added</span>
    </React.Fragment>
  );
};

export default ItemList;
