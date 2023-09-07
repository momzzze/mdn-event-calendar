import { hours } from "../../../utils/calendarUtils";
import { useData } from "../../../contexts/DataContext";
import dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const HoursAndEvents = ({ selectDate }) => {
  const { publicEventsCurrentUserParticipate, privateEvents } = useData();

  const selectDatePublicEvents = publicEventsCurrentUserParticipate?.filter(
    (event) =>
      (dayjs(event.startDate).isSame(event.endDate, "day") &&
        dayjs(event.startDate).isSame(selectDate, "day")) ||
      dayjs(selectDate).isBetween(
        dayjs(event.startDate).add(-1, "day"),
        dayjs(event.endDate).add(1, "day"),
        "day"
      )
  );
  const selectDatePrivateEvents = privateEvents?.filter(
    (event) =>
      (dayjs(event.startDate).isSame(event.endDate, "day") &&
        dayjs(event.startDate).isSame(selectDate, "day")) ||
      dayjs(selectDate).isBetween(
        dayjs(event.startDate).add(-1, "day"),
        dayjs(event.endDate).add(1, "day"),
        "day"
      )
  );
  const allEvents = [
    ...selectDatePublicEvents,
    ...selectDatePrivateEvents,
  ].sort((a, b) => dayjs(a.startDate).hour() - dayjs(b.startDate).hour());
  const allEventsLength = allEvents.length;

  return (
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
  );
};

export default HoursAndEvents;

const Hours = () => {
  return (
    <div className="">
      {hours.map((hour, index) => (
        <div
          key={index}
          className="bg-slate-50 h-[26px] flex items-center justify-center border-2 border-gray-200"
        >
          {hour}
        </div>
      ))}
    </div>
  );
};

const Events = ({ allEvents, selectDate }) => {
  return (
    <>
      {hours.map((hour, index) =>
        allEvents.length ? (
          allEvents.map((event, eventIndex) => {
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
                  className={`h-[26px] text-white text-xl font-semibold border-l-2 border-r-2`}
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
