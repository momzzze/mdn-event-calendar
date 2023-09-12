import dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { useState } from "react";
import { generateDate, months, days, cn } from "../../../utils/calendarUtils";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useData } from "../../../contexts/DataContext";
import { useNavigate } from "react-router-dom";

const CalendarHome = () => {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const { publicEvents } = useData();
  const navigate = useNavigate();

  const publicEventsCurrentMonth = publicEvents?.reduce((result, event) => {
    if (
      dayjs(event.startDate).month() === today.month() ||
      dayjs(event.endDate).month() === today.month() ||
      dayjs(today).isBetween(
        dayjs(event.startDate),
        dayjs(event.endDate),
        "month"
      )
    )
      result.push(event);
    return result;
  }, []);

  const handleCalendarClick = () => {
    navigate(`/calendar`);
  };

  return (
    <div className="flex gap-10 mb-10 sm:divide-x justify-center sm:w-1/2 mx-auto h-full items-center sm:flex-row flex-col">
      <div
        className="w-full h-11/12 p-3 sm:px-5 border-2 rounded-lg bg-slate-100"
        onClick={handleCalendarClick}
      >
        <div className="flex justify-between items-center">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center ">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className=" cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
                setSelectDate(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 ">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
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
                  className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                >
                  <h1
                    className={cn(
                      currentMonth ? "" : "text-gray-400",
                      today ? "bg-red-600 text-white" : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-black text-white"
                        : "",
                      "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                    )}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                  <div className="w-1 h-1 mx-auto mt-1">
                    {currentMonth &&
                      publicEventsCurrentMonth?.some(
                        (event) =>
                          dayjs(event?.startDate).date() === date.date() ||
                          dayjs(event?.endDate).date() === date.date() ||
                          dayjs(date).isBetween(
                            dayjs(event?.startDate).add(-1, "day"),
                            dayjs(event?.endDate).add(1, "day"),
                            "day"
                          )
                      ) && (
                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                      )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarHome;
