import HeaderMonth from "./HeaderMonth";
import MonthDays from "./MonthDays";

const MonthCalendar = ({
  currentDate,
  today,
  setToday,
  selectDate,
  setSelectDate,
  publicEvents,
  privateEvents,
}) => {
  return (
    <div className="flex gap-10 sm:divide-x justify-center items-center sm:flex-row flex-col">
      <div className="flex-1">
        <HeaderMonth
          currentDate={currentDate}
          today={today}
          setToday={setToday}
          setSelectDate={setSelectDate}
        />        
        <MonthDays
          today={today}
          setToday={setToday}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          publicEvents={publicEvents}
          privateEvents={privateEvents}
        />
      </div>
    </div>
  );
};

export default MonthCalendar;
