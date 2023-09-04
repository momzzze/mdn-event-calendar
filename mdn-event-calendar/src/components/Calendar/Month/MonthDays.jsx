import { generateDate, daysFullName, cn } from "../../../utils/calendarUtils";
import dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { useData } from "../../../contexts/DataContext";

const MonthDays = ({ today, selectDate, setSelectDate }) => {
  const { publicEventsCurrentUserParticipate, privateEvents } = useData();

  const publicEventsCurrentMonth = publicEventsCurrentUserParticipate?.reduce(
    (result, event) => {
      if (
        dayjs(event.startDate).month() === today.month() ||
        dayjs(event.endDate).month() === today.month()
      ) {
        result.push(event);
      }
      generateDate(today.month(), today.year()).forEach((date) => {
        if (
          dayjs(date).isBetween(
            dayjs(event.startDate).add(-1, "day"),
            dayjs(event.endDate).add(1, "day"),
            "day"
          )
        )
          result.push(event);
        return result;
      });
      return result;
    },
    []
  );
  const privateEventsCurrentMonth = privateEvents?.reduce((result, event) => {
    if (
      dayjs(event.startDate).month() === today.month() ||
      dayjs(event.endDate).month() === today.month()
    ) {
      result.push(event);
    }
    generateDate(today.month(), today.year()).forEach((date) => {
      if (
        dayjs(date).isBetween(
          dayjs(event.startDate).add(-1, "day"),
          dayjs(event.endDate).add(1, "day"),
          "day"
        )
      )
        result.push(event);
      return result;
    });
    return result;
  }, []);

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
                <div className="flex flex-col items-start justify-start ml-5">
                  {privateEventsCurrentMonth?.some(
                    (event) =>
                      (dayjs(event?.startDate).date() ===
                        dayjs(event?.endDate).date() &&
                        dayjs(event?.endDate).date() === date.date()) ||
                      dayjs(date).isBetween(
                        dayjs(event.startDate).add(-1, "day"),
                        dayjs(event.endDate).add(1, "day"),
                        "day"
                      )
                  ) &&
                    privateEventsCurrentMonth
                      ?.filter(
                        (event) =>
                          (dayjs(event?.startDate).date() ===
                            dayjs(event?.endDate).date() &&
                            dayjs(event?.endDate).date() === date.date()) ||
                          dayjs(date).isBetween(
                            dayjs(event.startDate).add(-1, "day"),
                            dayjs(event.endDate).add(1, "day"),
                            "day"
                          )
                      )
                      .map((event) => {
                        return (
                          <div key={event?.id} className="flex gap-3">
                            <time className="text-xs text-gray-400">
                              {dayjs(event?.startDate).format("h:mm A")}
                            </time>
                            <h1 className="text-xs text-gray-400">
                              {event?.title}
                            </h1>
                          </div>
                        );
                      })}
                </div>
                <div className="flex flex-col items-start justify-start ml-5">
                  {publicEventsCurrentMonth?.some(
                    (event) =>
                      (dayjs(event?.startDate).date() ===
                        dayjs(event?.endDate).date() &&
                        dayjs(event?.endDate).date() === date.date()) ||
                      dayjs(date).isBetween(
                        dayjs(event.startDate).add(-1, "day"),
                        dayjs(event.endDate).add(1, "day"),
                        "day"
                      )
                  ) &&
                    publicEventsCurrentMonth
                      ?.filter(
                        (event) =>
                          (dayjs(event?.startDate).date() ===
                            dayjs(event?.endDate).date() &&
                            dayjs(event?.endDate).date() === date.date()) ||
                          dayjs(date).isBetween(
                            dayjs(event.startDate).add(-1, "day"),
                            dayjs(event.endDate).add(1, "day"),
                            "day"
                          )
                      )
                      .map((event) => {
                        return (
                          <div key={event.id} className="flex gap-3">
                            <time className="text-xs text-gray-400">
                              {dayjs(event?.startDate).format("h:mm A")}
                            </time>
                            <h1 className="text-xs text-gray-400">
                              {event?.title}
                            </h1>
                          </div>
                        );
                      })}
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default MonthDays;
