import styles from "../styles/Calendar.module.scss";
import CalendarDay from "./CalendarDay";

const Calendar = ({
  date,
  shortDate,
  onPreviousMonthClick,
  onNextMonthClick,
  onDaySelect,
}) => {
  const getDays = () => {
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    let dayList = [];

    for (let i = 0; i < daysInMonth; i++) {
      dayList.push(<CalendarDay day={i + 1} onDaySelect={onDaySelect} />);
    }

    return dayList;
  };

  return (
    <div className={styles.container}>
      <div className={styles.calendarHeader}>
        <img src="/arrow-left.svg" onClick={onPreviousMonthClick} />
        <span className={styles.date}>{shortDate}</span>
        <img src="/arrow-right.svg" onClick={onNextMonthClick} />
      </div>
      <ul className={styles.dayList}>{getDays()}</ul>
    </div>
  );
};

export default Calendar;
