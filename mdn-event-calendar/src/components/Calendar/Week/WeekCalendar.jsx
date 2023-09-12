import WeekDays from "./WeekDays";
import HeaderWeek from "./HeaderWeek";
import Hours from "../Day/Hours";
import WeekEvents from "./WeekEvents";

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
          <WeekDays
            today={today}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
          />
        </div>
      </div>
      <div className="w-116 h-[41rem] flex flex-row overflow-y-auto">
        <div className="w-[80px] grid grid-rows-48">
          <Hours />
        </div>
        <div className={`flex-1 grid grid-cols-7`}>
          <WeekEvents
            today={today}
            setSelectDate={setSelectDate}
          />
        </div>
      </div>
    </>
  );
};

export default WeekCalendar;
