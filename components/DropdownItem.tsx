import { FC } from "react";
import styles from "../styles/Forms.module.scss";

interface DropdownItemProps {
  item: Object;
  onOptionSelect: (value: string) => void;
}

const DropdownItem: FC<DropdownItemProps> = ({ item, onOptionSelect }) => {
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
