import { generateDateWeek } from "../../../utils/calendarUtils";
import dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { useData } from "../../../contexts/DataContext";
import ScheduleHomeItem from "./ScheduleHomeItem";

const ScheduleHome = ({ today }) => {
  const { publicEventsCurrentUserParticipate, privateEvents } = useData();

  if (!publicEventsCurrentUserParticipate || !privateEvents) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 border-opacity-50"></div>
      </div>
    );
  }
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
  const weekEvents = generateDateWeek(
    today.day(),
    today.week(),
    today.month(),
    today.year()
  ).reduce((acc, { date }) => {
    const allEvents = allEventsWeekDay(date);
    if (allEvents?.length) {
      allEvents.forEach((event) => {
        if (!acc.includes(event)) acc.push(event);
      });
    }
    return acc;
  }, []);

  return (
    <div className="h-full w-full sm:px-5 border-2 rounded-lg bg-slate-100">
      {weekEvents ? (
        <div className={``}>
          {weekEvents?.length ? (
            <ol className="my-4 space-y-1 text-sm leading-6 text-gray-500">
              {weekEvents.map((event) => (
                <ScheduleHomeItem key={event.id} event={event} />
              ))}
            </ol>
          ) : (
            <span></span>
          )}
        </div>
      ) : (
        <p className="mt-4 text-gray-400">No meetings this week.</p>
      )}
    </div>
  );
};

export default ScheduleHome;
