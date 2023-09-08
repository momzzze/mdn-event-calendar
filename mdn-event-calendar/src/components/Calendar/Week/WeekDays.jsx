import {
  cn,
  generateDateWeek,
  daysFullName,
} from "../../../utils/calendarUtils";

const WeekDays = ({ today, selectDate, setSelectDate }) => {
  return (
    <div className="flex">
      <div className="w-20 border-2"></div>
      <div className="flex-1 grid grid-cols-7 border-2">
        {generateDateWeek(
          today.day(),
          today.week(),
          today.month(),
          today.year()
        ).map(({ date, today }, index) => {
          return (
            <div
              key={index}
              className="p-2 text-center h-10 grid place-content-center text-lg border-t border-r-4"
            >
              <h1
                className={cn(
                  today ? "bg-red-600 text-white" : "",
                  selectDate.toDate().toDateString() ===
                    date.toDate().toDateString()
                    ? "bg-black text-white"
                    : "",
                  "h-7 w-7 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                )}
                onClick={() => {
                  setSelectDate(date);
                }}
              >
                {date.date()}
              </h1>
            </div>
          );
        })}
        {daysFullName.map((day) => {
          return (
            <>
              <div
                key={day}
                className="p-2 text-center grid place-content-center text-lg border-r-4"
              >
                <h1
                  className="text-sm text-center h-4 w-14 grid place-content-center text-gray-500 select-none justify-self-center"
                >
                  {day}
                </h1>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default WeekDays;
