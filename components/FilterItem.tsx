import styles from "../styles/Filter.module.scss";
import cn from "classnames";

const FilterItem = ({ filter, onFilterClick, selected }) => {
  const handleFilterSelect = () => {
    onFilterClick(filter);
  };

  return (
    <li onClick={handleFilterSelect}>
      <div
        className={cn(styles.checkbox, {
          [styles["checkbox--selected"]]: selected,
        })}
      >
        {selected && <img src="./check.svg" />}
      </div>
      {filter}
    </li>
  );
};

export default FilterItem;
