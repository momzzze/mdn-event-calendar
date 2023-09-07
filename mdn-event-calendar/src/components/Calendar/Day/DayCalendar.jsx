import HeaderDay from "./HeaderDay";
import Hours from "./Hours";
import Events from "./Events";

const DayCalendar = ({
  currentDate,
  today,
  setToday,
  selectDate,
  setSelectDate,
  allEvents,
}) => {
  const allEventsLength = allEvents.length;

  return (
    <>
      <div className="flex gap-10 sm:divide-x justify-center items-center sm:flex-row flex-col">
        <div className="w-96 flex-1">
          <HeaderDay
            currentDate={currentDate}
            today={today}
            setToday={setToday}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
          />
        </div>
      </div>
      <div className="w-116 h-96 grid grid-cols-10 overflow-y-auto">
        <div className="col-start-1 grid grid-rows-48 border-2">
          <Hours />
        </div>
        <div
           className={`col-start-2 col-span-9 grid grid-cols-${allEventsLength} border-2`}
        >
          <Events allEvents={allEvents} selectDate={selectDate} />
        </div>
      </div>
    </>
  );
};

export default DayCalendar;
