import React, { useState } from "react";
import FilterItem from "./FilterItem";
import styles from "../styles/Filter.module.scss";

const Filter = ({ filters, onFilterClick, selectedFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.filters} onClick={handleDropdownClick}>
      <div className={styles.filterHeader}>
        Filter
        <img src="./arrow.svg" />
      </div>
      {isOpen && (
        <ul className={styles.filterList}>
          {filters.map((filter) => {
            return (
              <FilterItem
                onFilterClick={onFilterClick}
                filter={filter}
                selected={filter === selectedFilter}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Filter;
