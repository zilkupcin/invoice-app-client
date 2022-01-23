import styles from "../styles/Calendar.module.scss";

const CalendarDay = ({ day, onDaySelect }) => {
  const handleDaySelect = () => {
    onDaySelect(day);
  };

  return (
    <li onClick={handleDaySelect} className={styles.day}>
      {day}
    </li>
  );
};

export default CalendarDay;
