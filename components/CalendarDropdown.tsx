import { useState } from "react";
import styles from "../styles/Forms.module.scss";
import cn from "classnames";
import Calendar from "./Calendar";

const CalendarDropdown = ({
  relativeSelf,
  onInputChange,
  propertyName,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value);

  const handleDropdownClick = (e) => {
    if (
      !e.target.classList.contains(styles.dropdownIcon) &&
      !e.target.classList.contains(styles.calendarDropdown) &&
      !e.target.classList.contains(styles.selectedOption)
    )
      return;

    console.log(styles.calendarDropdown);
    setIsOpen(!isOpen);
  };

  const handlePreviousMonthClick = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonthClick = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  const handleDaySelect = (day) => {
    let newDate = new Date(date);
    newDate.setDate(day);
    newDate = new Date(newDate);

    onInputChange(propertyName, newDate);
    setSelectedDate(newDate);
    setIsOpen(false);
  };

  const getShortDate = () => {
    const month = date.toLocaleString("en-us", {
      month: "short",
    });

    return `${month} ${date.getFullYear()}`;
  };

  const getShortSelectedDate = () => {
    const dateToFormat = value;
    const month = dateToFormat.toLocaleString("en-us", {
      month: "short",
    });

    return `${dateToFormat.getDate()} ${month} ${dateToFormat.getFullYear()}`;
  };

  return (
    <div className={styles.container}>
      <label>Issue Date</label>
      <div
        className={cn(styles.calendarDropdown, {
          [styles["calendarDropdown--open"]]: isOpen,
          [styles["calendarDropdown--not-relative"]]: !relativeSelf,
        })}
        onClick={handleDropdownClick}
      >
        <span className={styles.selectedOption}>{getShortSelectedDate()}</span>
        <img className={styles.dropdownIcon} src="/calendar.svg" />
        {isOpen && (
          <Calendar
            onPreviousMonthClick={handlePreviousMonthClick}
            onNextMonthClick={handleNextMonthClick}
            onDaySelect={handleDaySelect}
            date={date}
            shortDate={getShortDate()}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarDropdown;
