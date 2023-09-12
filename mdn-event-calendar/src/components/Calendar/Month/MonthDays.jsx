import { generateDate, daysFullName, cn } from "../../../utils/calendarUtils";
import dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { useData } from "../../../contexts/DataContext";

const MonthDays = ({ today, selectDate, setSelectDate }) => {
  const { publicEventsCurrentUserParticipate, privateEvents } = useData();

  const allEventsMonth = (date) => {
    const allEvents = [...publicEventsCurrentUserParticipate, ...privateEvents]
      ?.filter(
        (event) =>
          (dayjs(event?.startDate).isSame(event?.endDate, "day") &&
            dayjs(event?.startDate).isSame(date, "day")) ||
          dayjs(date).isBetween(
            dayjs(event?.startDate).add(-1, "day"),
            dayjs(event?.endDate).add(1, "day"),
            "day"
          )
      )
      ?.sort((a, b) => dayjs(a?.startDate).hour() - dayjs(b?.startDate).hour());
    return allEvents;
  };

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
            const allEvents = allEventsMonth(date);
            return (
              <div
                key={index}
                className="p-2 text-center h-28 grid-col place-content- text-sm border-t cursor-pointer overflow-auto"
                onClick={() => {
                  setSelectDate(date);
                }}
              >
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-red-600 text-white" : "",
                    selectDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? "bg-black text-white"
                      : "",
                    "h-7 w-7 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none mb-2"
                  )}
                >
                  {date.date()}
                </h1>
                {allEvents?.map((event) => {
                  if (currentMonth)
                    return (
                      <div
                        key={event?.id}
                        className={`flex flex-col border rounded-lg overflow-hidden items-center justify-start ml-3`}
                        style={{ backgroundColor: event?.color }}
                      >
                        <div className="flex gap-2">
                          <time className="text-xs text-white font-medium ">
                            {dayjs(event?.startDate).format("h:mm A")}
                          </time>
                          <h1 className="text-xs text-white font-medium ">
                            {event?.title.slice(0, 7)}...
                          </h1>
                        </div>
                      </div>
                    );
                })}
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default MonthDays;
