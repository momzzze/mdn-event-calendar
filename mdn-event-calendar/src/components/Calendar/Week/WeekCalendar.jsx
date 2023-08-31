import {
  hours,
  months,
  daysFullName,
  cn,
  generateDateWeek,
} from "../../../utils/calendarUtils";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import WeedDays from "./WeekDays";
import HeaderWeek from "./HeaderWeek";
import HoursAndDays from "./HoursAndDays";

const WeekCalendar = ({
  currentDate,
  today,
  setToday,
  selectDate,
  setSelectDate,
}) => {
  return (
    <>
      <div className="flex gap-10 sm:divide-x justify-center items-center sm:flex-row flex-col">
        <div className="w-96 flex-1">
          <HeaderWeek
            currentDate={currentDate}
            today={today}
            setToday={setToday}
            setSelectDate={setSelectDate}
          />
          <WeedDays
            today={today}
            setToday={setToday}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
          />
        </div>
      </div>
      <HoursAndDays />
    </>
  );
};

export default WeekCalendar;
