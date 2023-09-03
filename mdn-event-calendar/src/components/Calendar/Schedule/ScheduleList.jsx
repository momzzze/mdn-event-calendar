import ScheduleListItem from "./ScheduleListItem";
import { useData } from "../../../contexts/DataContext";

const ScheduleList = ({ selectDate, selectDatePublicEvents, selectDatePrivateEvents }) => {
  const { publicEventsCurrentUserParticipate, privateEvents } = useData();

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
      {publicEventsCurrentUserParticipate?.length > 0 ? 
      (<ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {selectDatePublicEvents.map((event) => (
          <ScheduleListItem key={event.id} event={event} selectDate={selectDate} />
        ))}
      </ol>) : (<p className="text-gray-400">No meetings for today.</p>)}
    </div>
  );
};

export default ScheduleList;