import React, { FC, useState } from "react";
import FilterItem from "./FilterItem";
import cn from "classnames";
import styles from "../styles/Filter.module.scss";
import { useTransition, animated } from "react-spring";
import { filterDropdown } from "../transitions/transitions";

interface FilterProps {
  filters: Array<string>;
  onFilterClick: (newFilter: string) => void;
  selectedFilter: string;
}

const Filter: FC<FilterProps> = ({
  filters,
  onFilterClick,
  selectedFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const transitions = useTransition(isOpen, filterDropdown);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn(styles.filters, { [styles["filters--open"]]: isOpen })}
      onClick={handleDropdownClick}
    >
      <div className={styles.filterHeader}>
        Filter
        <img src="./arrow.svg" />
      </div>
      {transitions(
        (springStyles, dropdown) =>
          dropdown && (
            <animated.ul style={springStyles} className={styles.filterList}>
              {filters.map((filter) => {
                return (
                  <FilterItem
                    key={filter.id}
                    onFilterClick={onFilterClick}
                    filter={filter}
                    selected={filter === selectedFilter}
                  />
                );
              })}
            </animated.ul>
          )
      )}
    </div>
  );
};

export default Filter;
