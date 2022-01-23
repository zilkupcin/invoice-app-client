import React, { useState } from "react";
import styles from "../styles/Forms.module.scss";
import cn from "classnames";
import DropdownItem from "./DropdownItem";

const FormDropdown = ({ onInputChange, propertyName, items, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (value) => {
    onInputChange(propertyName, value);
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <label>Payment Terms</label>
      <div
        className={cn(styles.dropdown, { [styles["dropdown--open"]]: isOpen })}
        onClick={handleDropdownClick}
      >
        <span className={styles.selectedOption}>{value}</span>
        <img src="/arrow.svg" />
        {isOpen && (
          <ul className={styles.options}>
            {items.map((item) => {
              return (
                <DropdownItem
                  key={item.id}
                  onOptionSelect={handleOptionSelect}
                  item={item}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FormDropdown;
