import { generateDate, daysFullName, cn } from "../../../utils/calendarUtils";

const MonthDays = ({ today, setToday, selectDate, setSelectDate, publicEvents, privateEvents }) => {
  // console.log(publicEvents, privateEvents);
  return (
    <>
      <div className="grid grid-cols-7 border-t">
        {daysFullName.map((day, index) => {
          return (
            <h1
              key={index}
              className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none justify-self-center"
            >
              {day}
            </h1>
          );
        })}
      </div>
      <div className=" grid grid-cols-7 ">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            return (
              <div
                key={index}
                className="p-2 text-center h-28 grid place-content- text-sm border-t"
              >
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
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
          }
        )}
      </div>
    </>
  );
};

export default MonthDays;
