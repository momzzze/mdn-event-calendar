import { generateDateWeek } from "../../../utils/calendarUtils";
import dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { useData } from "../../../contexts/DataContext";
import Events from "../Day/Events";

const WeekEvents = ({ today, setSelectDate }) => {
  const { publicEventsCurrentUserParticipate, privateEvents } = useData();

  const allEventsWeekDay = (date) => {
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
      {generateDateWeek(
        today.day(),
        today.week(),
        today.month(),
        today.year()
      ).map(({ date }, index) => {
        const allEvents = allEventsWeekDay(date);
        const allEventsLength = allEvents?.length.toString();
        return (
          <div
            key={index}
            className={`grid grid-cols-${allEventsLength} border-2`}
            onClick={() => {
              setSelectDate(date);
            }}
          >
            <Events allEvents={allEvents} selectDate={date} />
          </div>
        );
      })}
    </>
  );
};

export default WeekEvents;
