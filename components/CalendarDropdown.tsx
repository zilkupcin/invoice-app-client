import { FC, MouseEvent, MouseEventHandler, useState } from "react";
import styles from "../styles/Forms.module.scss";
import cn from "classnames";
import Calendar from "./Calendar";
import { ValidationErrorItem } from "joi";

interface CalendarDropdownProps {
  relativeSelf?: boolean;
  onInputChange: (propertyName: string, newDate: Date) => void;
  propertyName: string;
  value: Date;
  errors: Array<ValidationErrorItem>;
}

const CalendarDropdown: FC<CalendarDropdownProps> = ({
  relativeSelf = false,
  onInputChange,
  propertyName,
  value,
  errors,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleDropdownClick: MouseEventHandler<HTMLDivElement> = (
    e: MouseEvent
  ) => {
    const target = e.target as HTMLDivElement;
    if (
      !target.classList.contains(styles.dropdownIcon) &&
      !target.classList.contains(styles.calendarDropdown) &&
      !target.classList.contains(styles.selectedOption)
    )
      return;

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

  const handleDaySelect = (day: number) => {
    let newDate = new Date(date);
    newDate.setDate(day);
    newDate = new Date(newDate);

    onInputChange(propertyName, newDate);
    setIsOpen(false);
  };

  // Format a short date to display as an input value
  const getShortDate = () => {
    const month = date.toLocaleString("en-us", {
      month: "short",
    });

    return `${month} ${date.getFullYear()}`;
  };

  // Format a short date to display as a selected value
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
        <Calendar
          onPreviousMonthClick={handlePreviousMonthClick}
          onNextMonthClick={handleNextMonthClick}
          onDaySelect={handleDaySelect}
          date={date}
          shortDate={getShortDate()}
          isVisible={isOpen}
        />
      </div>
    </div>
  );
};

export default CalendarDropdown;
