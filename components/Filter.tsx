import React from "react";
import FilterItem from "./FilterItem";
import styles from "../styles/Filter.module.scss";

const Filter = ({ filters }) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filterHeader}>
        Filter
        <img src="./arrow.svg" />
      </div>
      <ul className={styles.filterList}>
        {filters.map((filter) => {
          return <FilterItem filter={filter} />;
        })}
      </ul>
    </div>
  );
};

export default Filter;
