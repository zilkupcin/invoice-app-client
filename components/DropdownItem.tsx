import styles from "../styles/Forms.module.scss";

const DropdownItem = ({ item, onOptionSelect }) => {
  const handleOptionSelect = () => {
    onOptionSelect(item.value);
  };

  return (
    <li onClick={handleOptionSelect} className={styles.option}>
      {item.label}
    </li>
  );
};

export default DropdownItem;
