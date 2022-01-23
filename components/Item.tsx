import styles from "../styles/InvoiceForm.module.scss";
import InputField from "./InputField";

const Item = ({ item, onDeleteItem, onChangeItemInfo }) => {
  const calculateTotal = () => {
    return item.price * item.quantity;
  };

  const handleItemDelete = (e) => {
    e.preventDefault();
    onDeleteItem(item);
  };

  const handleChangeItemInfo = (propertyName, value) => {
    onChangeItemInfo(propertyName, value, item);
  };

  return (
    <li className={styles.item}>
      <InputField
        type="text"
        label="Item Name"
        value={item.name}
        propertyName="name"
        onInputChange={handleChangeItemInfo}
      />
      <div className={styles.itemFieldGroup}>
        <InputField
          type="number"
          label="Quantity"
          value={item.quantity}
          propertyName="quantity"
          onInputChange={handleChangeItemInfo}
        />
        <InputField
          type="number"
          label="Price"
          value={item.price}
          propertyName="price"
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
