import styles from "../styles/Filter.module.scss";

const FilterItem = ({ filter, selected }) => {
  return (
    <li>
      <div className={styles.checkbox}>
        {selected && <img src="./check.svg" />}
      </div>
      {filter}
    </li>
  );
};

export default FilterItem;
