import styles from "../styles/Calendar.module.scss";
import CalendarDay from "./CalendarDay";
import { useTransition, animated } from "react-spring";
import { dropdownTransition } from "../transitions/transitions";
import { FC, MouseEventHandler } from "react";

interface CalendarProps {
  date: Date;
  shortDate: string;
  onPreviousMonthClick: MouseEventHandler<HTMLImageElement>;
  onNextMonthClick: MouseEventHandler<HTMLImageElement>;
  onDaySelect: (day: number) => void;
  isVisible: boolean;
}

const Calendar: FC<CalendarProps> = ({
  date,
  shortDate,
  onPreviousMonthClick,
  onNextMonthClick,
  onDaySelect,
  isVisible,
}) => {
  const transitions = useTransition(isVisible, dropdownTransition);

  const getDays = () => {
    // Get how many days there are in a month
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    let dayList = [];

    // Create day components
    for (let i = 0; i < daysInMonth; i++) {
      dayList.push(
        <CalendarDay key={i} day={i + 1} onDaySelect={onDaySelect} />
      );
    }

    return dayList;
  };

  return transitions(
    (springStyles, dropdown) =>
      dropdown && (
        <animated.div style={springStyles} className={styles.container}>
          <div className={styles.calendarHeader}>
            <img src="/arrow-left.svg" onClick={onPreviousMonthClick} />
            <span className={styles.date}>{shortDate}</span>
            <img src="/arrow-right.svg" onClick={onNextMonthClick} />
          </div>
          <ul className={styles.dayList}>{getDays()}</ul>
        </animated.div>
      )
  );
};

export default Calendar;
