import EventListItem from "./EventListItem";

const EventsList = ({ selectDate }) => {
  return (
    <div className="h-96 w-96 sm:px-5">
      <h1 className=" font-semibold">
        Schedule for
        <br />
        {selectDate.format("dddd, MMMM DD, YYYY")}
      </h1>
      {/* {events.length ? (<div className="event-list">
        {events.map((event) => (
          <EventListItem key={event.id} event={event} />
        ))}
      </div>) : (<p className="text-gray-400">No meetings for today.</p>)} */}
    </div>
  );
};

export default EventsList;