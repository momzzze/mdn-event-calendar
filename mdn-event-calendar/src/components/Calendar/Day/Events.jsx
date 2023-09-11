import { hours } from "../../../utils/calendarUtils";
import dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const Events = ({ allEvents, selectDate }) => {
  return (
    <>
      {hours.map((hour, index) =>
        allEvents?.length ? (
          allEvents?.map((event, eventIndex) => {
            const startDate = dayjs(event?.startDate);
            const endDate = dayjs(event?.endDate);
            const eventStartHour = dayjs(startDate).hour();
            const eventStartMinute = dayjs(startDate).minute();
            const eventEndHour = dayjs(endDate).hour();
            const eventEndMinute = dayjs(endDate).minute();
            const eventOneDay =
              startDate.isSame(selectDate, "day") &&
              endDate.isSame(selectDate, "day");
            const currDate = selectDate;
            const currHour = +hour.split(":")[0];
            const currMinute = +hour.split(":")[1];
            
            if (
              //----------------------
              (currDate.isAfter(startDate, "day") && currHour < eventEndHour) ||
              (currDate.isSame(startDate, "day") &&
                !eventOneDay &&
                (currHour > eventStartHour ||
                  (eventStartHour === currHour &&
                    eventStartMinute <= currMinute))) ||
              currDate.isBetween(startDate, endDate, "day") ||
              //-----------------
              (eventStartHour < currHour && eventEndHour > currHour) ||
              (eventStartHour === currHour &&
                eventStartMinute <= currMinute &&
                currDate.isSame(startDate, "day")) ||
              (eventEndHour === currHour && eventEndMinute > currMinute)
            ) {
              return eventStartHour === currHour &&
                eventStartMinute === currMinute ? (
                <div
                  key={eventIndex}
                  className={`h-[26px] text-white font-semibold border-l-2 border-r-2 ${allEvents?.length > 1 ? 'text-base' : 'text-lg'}`}
                  style={{ backgroundColor: event?.color }}
                >
                  {event?.title}
                </div>
              ) : (
                <div
                  key={eventIndex}
                  className="h-[26px] border-l-2 border-r-2"
                  style={{ backgroundColor: event?.color }}
                ></div>
              );
            } else {
              return (
                <div
                  key={eventIndex}
                  className="bg-slate-50 border border-solid border-grey-100 h-[26px] border-l-2 border-r-2"
                >
                  {""}
                </div>
              );
            }
          })
        ) : (
          <div
            key={index}
            className="bg-slate-50 border border-solid border-grey-100 h-[26px] border-l-2 border-r-2"
          >
            {""}
          </div>
        )
      )}
    </>
  );
};

export default Events;