import { hours } from "../../../utils/calendarUtils";
import { useData } from "../../../contexts/DataContext";
import dayjs from "dayjs";

const HoursAndEvents = ({ today, selectDate }) => {
  //   const days = Array.from({ length: 7 });
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
  // console.log(selectDatePublicEvents);

  return (
    <div className="flex w-116 h-96 overflow-y-auto">
      <table className="table-fixed w-full">
        <thead>
          {hours.map((hour, index) => {
            return (
              <tr key={index} className="border-b">
                <th className="w-20 h-10">
                  <h2
                    className={`font-medium text-start ml-2 ${
                      index % 2 === 0 ? "text-black" : "text-slate-400"
                    }`}
                  >
                    {hour}
                  </h2>
                </th>
                {selectDatePublicEvents?.map((event, index) => {
                  console.log(
                    dayjs(event?.startDate).isSame(selectDate, "day") &&
                      dayjs(event?.endDate).isSame(selectDate, "day") &&
                      ((dayjs(event?.startDate).format('h:mm A') <= hour && dayjs(event?.startDate).format('A') === hour.slice(hour.indexOf(" ")+1)) || (hour < dayjs(event?.endDate).format('h:mm A') && dayjs(event?.endDate).format('A') === hour.slice(hour.indexOf(" ")+1)))
                  );
                  console.log(event?.title);
                  console.log(dayjs(event?.startDate).format('A'), dayjs(event?.endDate).format('h:mm A'), hour.slice(hour.indexOf(" ")+1));
                  if (
                    dayjs(event?.startDate).isSame(selectDate, "day") &&
                      dayjs(event?.endDate).isSame(selectDate, "day") &&
                      ((dayjs(event?.startDate).format('h:mm A') <= hour && dayjs(event?.startDate).format('A') === hour.slice(hour.indexOf(" ")+1)) || (hour < dayjs(event?.endDate).format('h:mm A') && dayjs(event?.endDate).format('A') === hour.slice(hour.indexOf(" ")+1)))

                  )
                    return (
                      <th key={index} className="bg-slate-100">
                        <h2 className="">
                          {/* {console.log(event?.title)} */}
                          {event?.title}
                        </h2>
                      </th>
                    );
                })}
              </tr>
            );
          })}
        </thead>
      </table>
    </div>
  );
};

export default HoursAndEvents;
