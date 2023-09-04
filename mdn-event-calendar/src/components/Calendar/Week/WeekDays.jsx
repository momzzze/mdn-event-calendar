import {
  cn,
  generateDateWeek,
  daysFullName,
  days,
} from "../../../utils/calendarUtils";
import Hours from "./HoursAndDays";

const WeedDays = ({ today, setToday, selectDate, setSelectDate }) => {
  return (
    <div className="flex">
      <div className="w-20 border-t"></div>
      <div className="flex-1 grid grid-cols-7 ">
        {generateDateWeek(
          today.day(),
          today.week(),
          today.month(),
          today.year()
        ).map(({ date, today }, index) => {
          return (
            <div
              key={index}
              className="p-2 text-center h-10 grid place-content-center text-lg border-t border-l"
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
        {daysFullName.map((day, index) => {
          return (
            <>
              <div
                key={index}
                className="p-2 text-center grid place-content-center text-lg border-l"
              >
                <h1
                  key={day}
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

export default WeedDays;
