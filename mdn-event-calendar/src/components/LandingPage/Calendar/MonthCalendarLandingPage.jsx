import dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { useState } from "react";
import { generateDate, months, days, cn } from "../../../utils/calendarUtils";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useData } from "../../../contexts/DataContext";
import { Link as RouterLink } from "react-router-dom";

const MonthCalendarLandingPage = ({
  openSignInModal,
  setIsSignInModalOpen,
}) => {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const { publicEvents } = useData();
  const [isHovered, setIsHovered] = useState(false);

  const selectDatePublicEvents = publicEvents?.filter(
    (event) =>
      (dayjs(event.startDate).isSame(event.endDate, "day") &&
        dayjs(event.startDate).isSame(selectDate, "day")) ||
      dayjs(selectDate).isBetween(
        dayjs(event.startDate).add(-1, "day"),
        dayjs(event.endDate).add(1, "day"),
        "day"
      )
  );
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

  return (
    <div className="flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto h-full items-center sm:flex-row flex-col">
      <div className="w-96 h-96">
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
      <div className="h-96 w-96 sm:px-5 border-2 rounded-lg bg-slate-100 overflow-y-aouto">
        <h1 className=" font-semibold">
          Schedule for
          <br />
          <time dateTime={selectDate.format("YYYY-MM-DD")}>
            {selectDate.format("dddd, MMMM DD, YYYY")}
          </time>
        </h1>
        {selectDatePublicEvents?.length > 0 ? (
          <RouterLink onClick={() => openSignInModal(setIsSignInModalOpen)}>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectDatePublicEvents.map((event, index) => (
                <li
                  key={index}
                  className={`flex items-center px-4 py-2 space-x-4 group border-2 bg-white rounded-xl
			  ${isHovered ? "scale-105 cursor-pointer" : ""}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        event?.imageUrl
                          ? event?.imageUrl
                          : "https://png.pngtree.com/png-clipart/20190916/original/pngtree-flat-calendar-png-image_4590004.jpg"
                      }
                      alt="event image"
                      className="object-cover flex-none w-12 h-12 rounded-full"
                    />
                    <p className="mt-0.5">{event?.publicity}</p>
                  </div>
                  <div className="flex-auto">
                    <p className="text-lg font-bold">{event.title}</p>
                    <p className="mt-0.5">
                      <span className="mt-0.5 mr-3 font-bold">Start</span>
                      <time dateTime={event?.startDate}>
                        {dayjs(event?.startDate).format("MMM D, HH:mm")}
                      </time>
                    </p>
                    <p className="mt-0.5">
                      <span className="mt-0.5 mr-4 font-bold">End</span>
                      <time dateTime={event.endDate}>
                        {dayjs(event?.endDate).format("MMM D, HH:mm")}
                      </time>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </RouterLink>
        ) : (
          <p className="text-gray-400 my-5 hover:none">
            No meetings for today.
          </p>
        )}
      </div>
    </div>
  );
};

export default MonthCalendarLandingPage;
