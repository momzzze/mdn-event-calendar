  import HeaderDay from "./HeaderDay";
  import HoursAndDays from "../Week/HoursAndDays";
  // import Day from "./Day";
  
  const DayCalendar = ({
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
            <HeaderDay
              currentDate={currentDate}
              today={today}
              setToday={setToday}
              setSelectDate={setSelectDate}
            />
          </div>
        </div>
        <HoursAndDays />
      </>
    );
  };
  
  export default DayCalendar;