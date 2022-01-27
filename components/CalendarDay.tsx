import { FC } from "react";
import styles from "../styles/Calendar.module.scss";

interface CalendarDayProps {
  day: number;
  onDaySelect: Function;
}

const CalendarDay: FC<CalendarDayProps> = ({ day, onDaySelect }) => {
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
