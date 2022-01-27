import React, { FC, useState } from "react";
import styles from "../styles/Forms.module.scss";
import cn from "classnames";
import DropdownItem from "./DropdownItem";
import { useTransition, animated } from "react-spring";
import { dropdownTransition } from "../transitions/transitions";
import { ValidationErrorItem } from "joi";
import { IDropdownOption } from "../interfaces/interface";

interface FormDropdownProps {
  onInputChange: (propertyName: string, value: string) => void;
  propertyName: string;
  items: Array<IDropdownOption>;
  value: string | undefined;
  errors: Array<ValidationErrorItem>;
}

const FormDropdown: FC<FormDropdownProps> = ({
  onInputChange,
  propertyName,
  items,
  value,
  errors,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const transitions = useTransition(isOpen, dropdownTransition);

  const handleOptionSelect = (value: string) => {
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
        {transitions(
          (springStyles, dropdown) =>
            dropdown && (
              <animated.ul style={springStyles} className={styles.options}>
                {items.map((item) => {
                  return (
                    <DropdownItem
                      key={item.id}
                      onOptionSelect={handleOptionSelect}
                      item={item}
                    />
                  );
                })}
              </animated.ul>
            )
        )}
      </div>
    </div>
  );
};

export default FormDropdown;
