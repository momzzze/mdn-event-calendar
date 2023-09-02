import ScheduleListItem from "./ScheduleListItem";
import dayjs from "dayjs";
import * as isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const ScheduleList = ({ selectDate, publicEvents, privateEvents }) => {
  const selectDatePublicEvents = publicEvents?.reduce((result, event) => {
    if (dayjs(event.startDate).isSame(event.endDate, "day") && dayjs(event.startDate).isSame(selectDate, "day")) {
      result.push(event);
    } else if (dayjs(selectDate).isBetween(dayjs(event.startDate).add(-1, "day"), dayjs(event.endDate).add(1, "day"), "day")) {
      result.push(event);
    }
    return result;
  }, []);
  const selectDatePrivateEvents = privateEvents?.reduce((result, event) => {
    if (dayjs(event.startDate).isSame(event.endDate, "day") && dayjs(event.startDate).isSame(selectDate, "day")) {
      result.push(event);
    } else if (dayjs(selectDate).isBetween(dayjs(event.startDate).add(-1, "day"), dayjs(event.endDate).add(1, "day"), "day")) {
      result.push(event);
    }
    return result;
  }, []);
  
  
  return (
    <div className="h-inherit w-96 sm:px-5 border-2 rounded-lg bg-slate-100">
      <h1 className=" font-semibold">
        Schedule for
        <br />
        <time dateTime={selectDate.format("YYYY-MM-DD")}>
        {selectDate.format("dddd, MMMM DD, YYYY")}
        </time>
      </h1>
      {privateEvents?.length > 0 ? 
      (<ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {selectDatePrivateEvents.map((event) => (
          <ScheduleListItem key={event.id} event={event} selectDate={selectDate} />
        ))}
      </ol>) : (<p className="text-gray-400">No meetings for today.</p>)}
      {publicEvents?.length > 0 ? 
      (<ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {selectDatePublicEvents.map((event) => (
          <ScheduleListItem key={event.id} event={event} selectDate={selectDate} />
        ))}
      </ol>) : (<p className="text-gray-400">No meetings for today.</p>)}
    </div>
  );
};

export default ScheduleList;