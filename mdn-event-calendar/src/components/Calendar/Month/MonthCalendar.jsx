import dayjs from "dayjs";
import { useState } from "react";
import { generateDate, months, daysFullName, cn } from "../../../utils/calendarUtils";
import {
  GrFormDown,
  GrFormUp,
} from "react-icons/gr";

const MonthCalendar = () => {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  return (
    <div className="flex gap-10 sm:divide-x justify-center py-3 items-center sm:flex-row flex-col">
      <div className="w-96 h-96 flex-1">
        <div className="flex justify-between items-center px-1">
          <div className="flex gap-2 items-center">
            <GrFormDown
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <GrFormUp
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
            <h1 className="select-none font-semibold">
              {months[today.month()]}, {today.year()}
            </h1>
          </div>
          <button
            className=" cursor-pointer hover:scale-105 transition-all border-gray-200 border-2 rounded-md px-3 py-1 my-1"
            onClick={() => {
              setToday(currentDate);
            }}
          >
            Today
          </button>
        </div>
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
                  className="p-2 text-center h-24 grid place-content- text-sm border-t"
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
      </div>
      <div className="h-96 w-96 sm:px-5">
        <h1 className=" font-semibold">
          Schedule for {selectDate.toDate().toDateString()}
        </h1>
        <p className="text-gray-400">No meetings for today.</p>
      </div>
    </div>
  );
};

export default MonthCalendar;
